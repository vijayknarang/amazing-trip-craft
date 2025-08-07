import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Eye, Calendar, User, MapPin, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { InquiryComments } from "./InquiryComments";
import { ActivityLog } from "./ActivityLog";
import { StatusTimingDisplay } from "./StatusTimingDisplay";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  destination: string;
  from_city: string;
  travellers: number;
  status: string;
  assigned_to: string | null;
  follow_up_notes: string | null;
  last_follow_up: string | null;
  created_at: string;
  assigned_at: string | null;
  profiles?: {
    full_name: string;
  };
}

interface InquiriesListProps {
  userRole: string;
  currentUser?: SupabaseUser;
}

export const InquiriesList = ({ userRole, currentUser }: InquiriesListProps) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      let query = supabase
        .from('inquiries')
        .select(`
          *,
          profiles:assigned_to(full_name)
        `)
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: string, followUpNotes?: string) => {
    try {
      const updateData: any = {
        status,
        last_follow_up: new Date().toISOString(),
      };

      if (followUpNotes) {
        updateData.follow_up_notes = followUpNotes;
      }

      const { error } = await supabase
        .from('inquiries')
        .update(updateData)
        .eq('id', inquiryId);

      if (error) throw error;

      await fetchInquiries();
      toast({
        title: "Success",
        description: "Inquiry updated successfully",
      });
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to update inquiry",
        variant: "destructive",
      });
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

  const filteredInquiries = inquiries.filter(inquiry => 
    statusFilter === "all" || inquiry.status === statusFilter
  );

  if (loading) {
    return <div className="text-center py-8">Loading inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inquiries Management</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Inquiries</SelectItem>
            <SelectItem value="fresh">Fresh</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="follow_up">Follow Up</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="requirement">Requirement</SelectItem>
            <SelectItem value="itinerary">Itinerary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(inquiry.status)}>
                    {inquiry.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedInquiry(inquiry)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                        <DialogDescription>
                          Manage inquiry status, comments, and view activity
                        </DialogDescription>
                      </DialogHeader>
                      {selectedInquiry && currentUser && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                          <div>
                            <InquiryDetailsForm
                              inquiry={selectedInquiry}
                              onUpdate={updateInquiryStatus}
                              userRole={userRole}
                            />
                          </div>
                          <div>
                            <InquiryComments
                              inquiryId={selectedInquiry.id}
                              currentUser={currentUser}
                              onCommentAdded={fetchInquiries}
                            />
                          </div>
                          <div>
                            <ActivityLog inquiryId={selectedInquiry.id} />
                          </div>
                          {userRole === 'admin' && (
                            <div>
                              <StatusTimingDisplay inquiryId={selectedInquiry.id} />
                            </div>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <CardDescription>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {inquiry.travellers} travelers
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {inquiry.from_city} → {inquiry.destination}
                  </span>
                  <span className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {inquiry.phone}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No inquiries found for the selected filter.
        </div>
      )}
    </div>
  );
};

interface InquiryDetailsFormProps {
  inquiry: Inquiry;
  onUpdate: (id: string, status: string, notes?: string) => void;
  userRole: string;
}

const InquiryDetailsForm = ({ inquiry, onUpdate, userRole }: InquiryDetailsFormProps) => {
  const [status, setStatus] = useState(inquiry.status);
  const [followUpNotes, setFollowUpNotes] = useState(inquiry.follow_up_notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(inquiry.id, status, followUpNotes);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Customer Name</Label>
          <p className="text-sm text-muted-foreground">{inquiry.name}</p>
        </div>
        <div>
          <Label>Phone</Label>
          <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
        </div>
        <div>
          <Label>From City</Label>
          <p className="text-sm text-muted-foreground">{inquiry.from_city}</p>
        </div>
        <div>
          <Label>Destination</Label>
          <p className="text-sm text-muted-foreground">{inquiry.destination}</p>
        </div>
        <div>
          <Label>Number of Travelers</Label>
          <p className="text-sm text-muted-foreground">{inquiry.travellers}</p>
        </div>
        <div>
          <Label>Created At</Label>
          <p className="text-sm text-muted-foreground">
            {new Date(inquiry.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fresh">Fresh</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="follow_up">Follow Up</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="requirement">Requirement</SelectItem>
            <SelectItem value="itinerary">Itinerary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="followUpNotes">Follow-up Notes</Label>
        <Textarea
          id="followUpNotes"
          value={followUpNotes}
          onChange={(e) => setFollowUpNotes(e.target.value)}
          placeholder="Add follow-up notes..."
          rows={4}
        />
      </div>

      {inquiry.last_follow_up && (
        <div>
          <Label>Last Follow-up</Label>
          <p className="text-sm text-muted-foreground">
            {new Date(inquiry.last_follow_up).toLocaleString()}
          </p>
        </div>
      )}

      <Button type="submit" className="w-full">
        Update Inquiry
      </Button>
    </form>
  );
};