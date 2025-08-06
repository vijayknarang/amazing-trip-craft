import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@supabase/supabase-js";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  destination: string;
  from_city: string;
  travellers: number;
  status: string;
  created_at: string;
}

interface TravelAdvisor {
  id: string;
  full_name: string;
  email: string;
}

interface InquiryAssignmentProps {
  userRole: string;
  currentUser: User;
}

export const InquiryAssignment = ({ userRole, currentUser }: InquiryAssignmentProps) => {
  const [unassignedInquiries, setUnassignedInquiries] = useState<Inquiry[]>([]);
  const [travelAdvisors, setTravelAdvisors] = useState<TravelAdvisor[]>([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (userRole === 'admin') {
      fetchUnassignedInquiries();
      fetchTravelAdvisors();
    }
  }, [userRole]);

  const fetchUnassignedInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .is('assigned_to', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUnassignedInquiries(data || []);
    } catch (error) {
      console.error('Error fetching unassigned inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch unassigned inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTravelAdvisors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'travel_advisor')
        .eq('is_active', true);

      if (error) throw error;
      setTravelAdvisors(data || []);
    } catch (error) {
      console.error('Error fetching travel advisors:', error);
    }
  };

  const assignInquiry = async (inquiryId: string, advisorId: string) => {
    try {
      // Update inquiry status and assignment
      const { error: updateError } = await supabase
        .from('inquiries')
        .update({
          assigned_to: advisorId,
          assigned_at: new Date().toISOString(),
          status: 'fresh'
        })
        .eq('id', inquiryId);

      if (updateError) throw updateError;

      // Log the activity
      await supabase.rpc('log_inquiry_activity', {
        p_inquiry_id: inquiryId,
        p_user_id: currentUser.id,
        p_activity_type: 'assigned',
        p_details: { assigned_to: advisorId },
        p_new_value: advisorId
      });

      // Refresh data
      await fetchUnassignedInquiries();
      
      toast({
        title: "Success",
        description: "Inquiry assigned successfully",
      });
    } catch (error) {
      console.error('Error assigning inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to assign inquiry",
        variant: "destructive",
      });
    }
  };

  if (userRole !== 'admin') {
    return null;
  }

  if (loading) {
    return <div className="text-center py-8">Loading unassigned inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inquiry Assignment</h2>
        <Badge variant="secondary">
          {unassignedInquiries.length} Unassigned
        </Badge>
      </div>

      <div className="grid gap-4">
        {unassignedInquiries.map((inquiry) => (
          <Card key={inquiry.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                <Badge variant="outline">
                  {inquiry.destination}
                </Badge>
              </div>
              <CardDescription>
                {inquiry.from_city} • {inquiry.travellers} travelers • {inquiry.phone}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedAdvisor}
                  onValueChange={setSelectedAdvisor}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select travel advisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {travelAdvisors.map((advisor) => (
                      <SelectItem key={advisor.id} value={advisor.id}>
                        {advisor.full_name} ({advisor.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => assignInquiry(inquiry.id, selectedAdvisor)}
                  disabled={!selectedAdvisor}
                >
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {unassignedInquiries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No unassigned inquiries found.
        </div>
      )}
    </div>
  );
};