import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon, UserIcon, FileTextIcon, UserCheckIcon } from "lucide-react";

interface ActivityLogEntry {
  id: string;
  activity_type: string;
  details: any;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface ActivityLogProps {
  inquiryId: string;
}

const getActivityIcon = (activityType: string) => {
  switch (activityType) {
    case 'comment_added':
      return <FileTextIcon className="h-4 w-4" />;
    case 'status_change':
      return <ClockIcon className="h-4 w-4" />;
    case 'assigned':
      return <UserCheckIcon className="h-4 w-4" />;
    default:
      return <ClockIcon className="h-4 w-4" />;
  }
};

const getActivityDescription = (entry: ActivityLogEntry) => {
  switch (entry.activity_type) {
    case 'comment_added':
      return `Added a comment${entry.details?.next_follow_up_date ? ' and scheduled follow-up' : ''}`;
    case 'status_change':
      return `Changed status from "${entry.old_value}" to "${entry.new_value}"`;
    case 'assigned':
      return `Assigned inquiry to travel advisor`;
    case 'follow_up_scheduled':
      return `Scheduled follow-up for ${new Date(entry.new_value || '').toLocaleString()}`;
    default:
      return `Performed ${entry.activity_type} action`;
  }
};

const getActivityColor = (activityType: string) => {
  switch (activityType) {
    case 'comment_added':
      return 'bg-blue-100 text-blue-800';
    case 'status_change':
      return 'bg-yellow-100 text-yellow-800';
    case 'assigned':
      return 'bg-green-100 text-green-800';
    case 'follow_up_scheduled':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const ActivityLog = ({ inquiryId }: ActivityLogProps) => {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivityLog();
  }, [inquiryId]);

  const fetchActivityLog = async () => {
    try {
      // First get activity log entries
      const { data: activities, error: activitiesError } = await supabase
        .from('inquiry_activity_log')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .order('created_at', { ascending: false });

      if (activitiesError) throw activitiesError;

      // Then get user profiles for each activity
      const activitiesWithProfiles = await Promise.all(
        (activities || []).map(async (activity) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', activity.user_id)
            .single();

          return {
            ...activity,
            profiles: profile
          };
        })
      );

      setActivities(activitiesWithProfiles);
    } catch (error) {
      console.error('Error fetching activity log:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading activity log...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Activity Log</h3>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getActivityIcon(activity.activity_type)}
                    <CardTitle className="text-sm">
                      {activity.profiles?.full_name || 'Unknown User'}
                    </CardTitle>
                    <Badge className={getActivityColor(activity.activity_type)}>
                      {activity.activity_type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {new Date(activity.created_at).toLocaleString()}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  {getActivityDescription(activity)}
                </p>
                {activity.details && (
                  <div className="mt-2 text-xs text-muted-foreground bg-muted p-2 rounded">
                    <pre>{JSON.stringify(activity.details, null, 2)}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {activities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No activity recorded yet.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};