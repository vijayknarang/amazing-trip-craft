import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface FollowUpNotificationProps {
  user: User | null;
  userRole: string | null;
}

export const useFollowUpNotifications = ({ user, userRole }: FollowUpNotificationProps) => {
  const [notificationInterval, setNotificationInterval] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user && userRole === 'travel_advisor') {
      startNotificationSystem();
    }

    return () => {
      if (notificationInterval) {
        clearInterval(notificationInterval);
      }
    };
  }, [user, userRole]);

  const startNotificationSystem = async () => {
    // Get admin settings for notification frequency
    const { data: settings } = await supabase
      .from('admin_settings')
      .select('*');

    const settingsMap = settings?.reduce((acc, setting) => {
      acc[setting.setting_key] = setting.setting_value;
      return acc;
    }, {} as Record<string, any>);

    const isEnabled = settingsMap?.toast_enabled || true;
    const frequencyHours = parseInt(settingsMap?.follow_up_toast_frequency_hours || "2");

    if (!isEnabled || !user) return;

    // Check for overdue follow-ups immediately
    checkOverdueFollowUps();

    // Set up interval to check periodically
    const interval = setInterval(() => {
      checkOverdueFollowUps();
    }, frequencyHours * 60 * 60 * 1000); // Convert hours to milliseconds

    setNotificationInterval(interval);
  };

  const checkOverdueFollowUps = async () => {
    if (!user) return;

    try {
      const { data: overdueInquiries, error } = await supabase
        .from('inquiries')
        .select('id, name, destination, next_follow_up_date')
        .eq('assigned_to', user.id)
        .not('next_follow_up_date', 'is', null)
        .lt('next_follow_up_date', new Date().toISOString());

      if (error) throw error;

      if (overdueInquiries && overdueInquiries.length > 0) {
        overdueInquiries.forEach((inquiry) => {
          toast({
            title: "Follow-up Reminder",
            description: `${inquiry.name} (${inquiry.destination}) requires follow-up`,
            variant: "default",
          });
        });
      }
    } catch (error) {
      console.error('Error checking overdue follow-ups:', error);
    }
  };

  return {
    checkOverdueFollowUps
  };
};