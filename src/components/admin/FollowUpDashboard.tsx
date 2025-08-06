import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, User, Phone, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InquiryComments } from "./InquiryComments";
import { ActivityLog } from "./ActivityLog";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface FollowUpInquiry {
  id: string;
  name: string;
  phone: string;
  destination: string;
  from_city: string;
  travellers: number;
  status: string;
  next_follow_up_date: string;
  created_at: string;
  assigned_to: string | null;
  profiles?: {
    full_name: string;
  };
}

interface FollowUpDashboardProps {
  userRole: string;
  currentUser: SupabaseUser;
}

export const FollowUpDashboard = ({ userRole, currentUser }: FollowUpDashboardProps) => {
  const [inquiries, setInquiries] = useState<FollowUpInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<FollowUpInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<FollowUpInquiry | null>(null);
  
  // Filters
  const [dateFilter, setDateFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [advisorFilter, setAdvisorFilter] = useState("");
  
  const [travelAdvisors, setTravelAdvisors] = useState<{ id: string; full_name: string }[]>([]);

  useEffect(() => {
    fetchFollowUpInquiries();
    if (userRole === 'admin') {
      fetchTravelAdvisors();
    }
  }, [userRole, currentUser.id]);

  useEffect(() => {
    applyFilters();
  }, [inquiries, dateFilter, destinationFilter, advisorFilter]);

  const fetchFollowUpInquiries = async () => {
    try {
      let query = supabase
        .from('inquiries')
        .select(`
          *,
          profiles:assigned_to(full_name)
        `)
        .not('next_follow_up_date', 'is', null)
        .order('next_follow_up_date', { ascending: true });

      // If travel advisor, only show their assigned inquiries
      if (userRole === 'travel_advisor') {
        query = query.eq('assigned_to', currentUser.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching follow-up inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTravelAdvisors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'travel_advisor')
        .eq('is_active', true);

      if (error) throw error;
      setTravelAdvisors(data || []);
    } catch (error) {
      console.error('Error fetching travel advisors:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...inquiries];

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(inquiry => {
        const followUpDate = new Date(inquiry.next_follow_up_date);
        return followUpDate.toDateString() === filterDate.toDateString();
      });
    }

    if (destinationFilter) {
      filtered = filtered.filter(inquiry =>
        inquiry.destination.toLowerCase().includes(destinationFilter.toLowerCase())
      );
    }

    if (advisorFilter && userRole === 'admin') {
      filtered = filtered.filter(inquiry => inquiry.assigned_to === advisorFilter);
    }

    setFilteredInquiries(filtered);
  };

  const isOverdue = (followUpDate: string) => {
    return new Date(followUpDate) < new Date();
  };

  const getStatusColor = (inquiry: FollowUpInquiry) => {
    if (isOverdue(inquiry.next_follow_up_date)) {
      return 'bg-red-100 text-red-800';
    }
    switch (inquiry.status) {
      case 'hot':
        return 'bg-orange-100 text-orange-800';
      case 'follow_up':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading follow-up inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Follow-up Dashboard</h2>
        <Badge variant="secondary">
          {filteredInquiries.length} Follow-ups
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dateFilter">Follow-up Date</Label>
              <Input
                id="dateFilter"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="destinationFilter">Destination</Label>
              <Input
                id="destinationFilter"
                placeholder="Filter by destination"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
              />
            </div>
            
            {userRole === 'admin' && (
              <div>
                <Label htmlFor="advisorFilter">Travel Advisor</Label>
                <Select value={advisorFilter} onValueChange={setAdvisorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by advisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Advisors</SelectItem>
                    {travelAdvisors.map((advisor) => (
                      <SelectItem key={advisor.id} value={advisor.id}>
                        {advisor.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setDateFilter("");
                setDestinationFilter("");
                setAdvisorFilter("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up Inquiries */}
      <div className="grid gap-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className={isOverdue(inquiry.next_follow_up_date) ? "border-red-300" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {isOverdue(inquiry.next_follow_up_date) && (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                  <Badge className={getStatusColor(inquiry)}>
                    {inquiry.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedInquiry(inquiry)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Inquiry Details - {inquiry.name}</DialogTitle>
                        <DialogDescription>
                          Manage follow-up and view activity history
                        </DialogDescription>
                      </DialogHeader>
                      {selectedInquiry && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <InquiryComments
                              inquiryId={selectedInquiry.id}
                              currentUser={currentUser}
                              onCommentAdded={fetchFollowUpInquiries}
                            />
                          </div>
                          <div>
                            <ActivityLog inquiryId={selectedInquiry.id} />
                          </div>
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
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Follow-up: {new Date(inquiry.next_follow_up_date).toLocaleString()}
                  </span>
                </div>
                {inquiry.profiles?.full_name && (
                  <Badge variant="outline">
                    Assigned to: {inquiry.profiles.full_name}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No follow-up inquiries found for the selected filters.
        </div>
      )}
    </div>
  );
};