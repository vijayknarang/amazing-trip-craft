import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminSettingsProps {
  userRole: string;
}

export const AdminSettings = ({ userRole }: AdminSettingsProps) => {
  const [toastFrequency, setToastFrequency] = useState("2");
  const [toastEnabled, setToastEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userRole === 'admin') {
      fetchSettings();
    }
  }, [userRole]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');

      if (error) throw error;

      const settings = data?.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {} as Record<string, any>);

      if (settings) {
        setToastFrequency(settings.follow_up_toast_frequency_hours || "2");
        setToastEnabled(settings.toast_enabled || true);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: key,
          setting_value: value
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await Promise.all([
        updateSetting('follow_up_toast_frequency_hours', toastFrequency),
        updateSetting('toast_enabled', toastEnabled)
      ]);

      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Notification Settings</CardTitle>
          <CardDescription>
            Configure how often travel advisors receive follow-up reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="toast-enabled">Enable Follow-up Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send toast notifications to travel advisors for overdue follow-ups
              </p>
            </div>
            <Switch
              id="toast-enabled"
              checked={toastEnabled}
              onCheckedChange={setToastEnabled}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="toast-frequency">Notification Frequency (Hours)</Label>
            <Input
              id="toast-frequency"
              type="number"
              min="1"
              max="24"
              value={toastFrequency}
              onChange={(e) => setToastFrequency(e.target.value)}
              disabled={!toastEnabled}
            />
            <p className="text-sm text-muted-foreground">
              How often to remind travel advisors about overdue follow-ups (1-24 hours)
            </p>
          </div>
          
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};