import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

interface FacebookConfig {
  id: string;
  page_id: string;
  page_name: string;
  access_token: string;
  webhook_verify_token: string;
  is_active: boolean;
  last_sync: string | null;
}

interface FacebookConfigurationProps {
  userRole: string;
}

export const FacebookConfiguration = ({ userRole }: FacebookConfigurationProps) => {
  const [configs, setConfigs] = useState<FacebookConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  
  // Form state
  const [pageId, setPageId] = useState("");
  const [pageName, setPageName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [webhookToken, setWebhookToken] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    if (userRole === 'admin') {
      fetchConfigurations();
    }
  }, [userRole]);

  const fetchConfigurations = async () => {
    try {
      // Using admin_settings table for Facebook configuration
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .like('setting_key', 'facebook_%');

      if (error) throw error;
      
      // Transform admin_settings data to FacebookConfig format
      const facebookConfigs: FacebookConfig[] = [];
      if (data) {
        const groupedData = data.reduce((acc, setting) => {
          const match = setting.setting_key.match(/facebook_(\d+)_(.+)/);
          if (match) {
            const [, id, key] = match;
            if (!acc[id]) acc[id] = { id };
            acc[id][key] = setting.setting_value;
          }
          return acc;
        }, {} as Record<string, any>);
        
        Object.values(groupedData).forEach((config: any) => {
          if (config.page_id && config.page_name) {
            facebookConfigs.push(config as FacebookConfig);
          }
        });
      }
      
      setConfigs(facebookConfigs);
    } catch (error) {
      console.error('Error fetching Facebook configurations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch Facebook configurations",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageId || !pageName || !accessToken || !webhookToken) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const configId = Math.random().toString(36).substr(2, 9);
      
      const settingsToInsert = [
        { setting_key: `facebook_${configId}_page_id`, setting_value: pageId },
        { setting_key: `facebook_${configId}_page_name`, setting_value: pageName },
        { setting_key: `facebook_${configId}_access_token`, setting_value: accessToken },
        { setting_key: `facebook_${configId}_webhook_verify_token`, setting_value: webhookToken },
        { setting_key: `facebook_${configId}_is_active`, setting_value: true },
      ];

      const { error } = await supabase
        .from('admin_settings')
        .insert(settingsToInsert);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Facebook configuration added successfully",
      });

      // Reset form
      setPageId("");
      setPageName("");
      setAccessToken("");
      setWebhookToken("");
      setShowForm(false);
      
      fetchConfigurations();
    } catch (error) {
      console.error('Error saving Facebook configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save Facebook configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleConfiguration = async (configId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: !isActive })
        .eq('setting_key', `facebook_${configId}_is_active`);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Configuration ${!isActive ? 'activated' : 'deactivated'}`,
      });

      fetchConfigurations();
    } catch (error) {
      console.error('Error updating configuration:', error);
      toast({
        title: "Error",
        description: "Failed to update configuration",
        variant: "destructive",
      });
    }
  };

  const toggleTokenVisibility = (configId: string) => {
    setShowTokens(prev => ({
      ...prev,
      [configId]: !prev[configId]
    }));
  };

  const maskToken = (token: string) => {
    if (token.length <= 8) return '*'.repeat(token.length);
    return token.substring(0, 4) + '*'.repeat(token.length - 8) + token.substring(token.length - 4);
  };

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Facebook Integration</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Configuration'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Facebook Configuration</CardTitle>
            <CardDescription>
              Configure Facebook page to receive inquiries directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pageId">Facebook Page ID</Label>
                  <Input
                    id="pageId"
                    value={pageId}
                    onChange={(e) => setPageId(e.target.value)}
                    placeholder="Enter Facebook Page ID"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pageName">Page Name</Label>
                  <Input
                    id="pageName"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    placeholder="Enter page name for display"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="accessToken">Page Access Token</Label>
                <Input
                  id="accessToken"
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Enter Facebook Page Access Token"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="webhookToken">Webhook Verify Token</Label>
                <Input
                  id="webhookToken"
                  type="password"
                  value={webhookToken}
                  onChange={(e) => setWebhookToken(e.target.value)}
                  placeholder="Enter Webhook Verify Token"
                  required
                />
              </div>
              
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Configuration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {configs.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{config.page_name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={config.is_active ? "default" : "secondary"}>
                    {config.is_active ? "Active" : "Inactive"}
                  </Badge>
                  <Switch
                    checked={config.is_active}
                    onCheckedChange={() => toggleConfiguration(config.id, config.is_active)}
                  />
                </div>
              </div>
              <CardDescription>
                Page ID: {config.page_id}
                {config.last_sync && (
                  <span className="ml-4">
                    Last sync: {new Date(config.last_sync).toLocaleString()}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Access Token:</Label>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {showTokens[config.id] ? config.access_token : maskToken(config.access_token)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTokenVisibility(config.id)}
                    >
                      {showTokens[config.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Webhook Token:</Label>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {showTokens[config.id] ? config.webhook_verify_token : maskToken(config.webhook_verify_token)}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {configs.length === 0 && !showForm && (
        <div className="text-center py-8 text-muted-foreground">
          No Facebook configurations found. Add one to start receiving inquiries from Facebook.
        </div>
      )}
    </div>
  );
};