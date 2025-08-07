import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface StatusTiming {
  id: string;
  inquiry_id: string;
  status: string;
  changed_at: string;
  changed_by: string;
  time_in_status_hours: number | null;
  profiles?: {
    full_name: string;
  };
}

interface StatusTimingDisplayProps {
  inquiryId: string;
}

export const StatusTimingDisplay = ({ inquiryId }: StatusTimingDisplayProps) => {
  const [timings, setTimings] = useState<StatusTiming[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatusTimings();
  }, [inquiryId]);

  const fetchStatusTimings = async () => {
    try {
      // Using activity log to calculate status timings
      const { data, error } = await supabase
        .from('inquiry_activity_log')
        .select(`
          *,
          profiles:user_id(full_name)
        `)
        .eq('inquiry_id', inquiryId)
        .eq('activity_type', 'status_change')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform activity log to status timings
      const transformedTimings: StatusTiming[] = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          const current = data[i];
          const next = data[i + 1];
          
          let timeInStatusHours = null;
          if (next) {
            const currentTime = new Date(current.created_at).getTime();
            const nextTime = new Date(next.created_at).getTime();
            timeInStatusHours = (nextTime - currentTime) / (1000 * 60 * 60);
          }
          
          transformedTimings.push({
            id: current.id,
            inquiry_id: current.inquiry_id,
            status: current.new_value || 'unknown',
            changed_at: current.created_at,
            changed_by: current.user_id,
            time_in_status_hours: timeInStatusHours,
            profiles: Array.isArray(current.profiles) && current.profiles.length > 0 
              ? current.profiles[0] 
              : undefined
          });
        }
      }
      
      setTimings(transformedTimings);
    } catch (error) {
      console.error('Error fetching status timings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (hours: number | null) => {
    if (!hours) return 'Current status';
    
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes} minutes`;
    } else if (hours < 24) {
      return `${Math.round(hours * 10) / 10} hours`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = Math.round(hours % 24);
      return `${days} days ${remainingHours} hours`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh':
        return 'bg-blue-100 text-blue-800';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'follow_up':
        return 'bg-purple-100 text-purple-800';
      case 'hot':
        return 'bg-red-100 text-red-800';
      case 'cold':
        return 'bg-gray-100 text-gray-800';
      case 'requirement':
        return 'bg-orange-100 text-orange-800';
      case 'itinerary':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading timing data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Status Timeline
        </CardTitle>
        <CardDescription>
          Time spent in each status by travel advisors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timings.map((timing) => (
            <div key={timing.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(timing.status)}>
                  {timing.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <div>
                  <p className="font-medium">{timing.profiles?.full_name || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(timing.changed_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatDuration(timing.time_in_status_hours)}</p>
                {timing.time_in_status_hours && timing.time_in_status_hours > 48 && (
                  <Badge variant="destructive" className="text-xs">Long duration</Badge>
                )}
              </div>
            </div>
          ))}
          
          {timings.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No status changes recorded yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};