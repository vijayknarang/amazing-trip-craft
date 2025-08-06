import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { InquiriesList } from "@/components/admin/InquiriesList";
import { UserManagement } from "@/components/admin/UserManagement";
import { InquiryAssignment } from "@/components/admin/InquiryAssignment";
import { FollowUpDashboard } from "@/components/admin/FollowUpDashboard";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFollowUpNotifications } from "@/hooks/useFollowUpNotifications";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize follow-up notifications for travel advisors
  useFollowUpNotifications({ user, userRole });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile and role
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('role, is_active')
                .eq('id', session.user.id)
                .single();
              
              if (profile) {
                if (!profile.is_active) {
                  toast({
                    title: "Account Deactivated",
                    description: "Your account has been deactivated. Please contact an administrator.",
                    variant: "destructive",
                  });
                  await supabase.auth.signOut();
                  return;
                }
                setUserRole(profile.role);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user || !userRole) {
    return null;
  }

  // Check if user has admin or travel advisor access
  const hasInquiryAccess = userRole === 'admin' || userRole === 'travel_advisor';

  if (!hasInquiryAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You don't have permission to access this page.</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} userRole={userRole} onSignOut={handleSignOut} />
      
      <div className="container mx-auto p-6">
        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList>
            <TabsTrigger value="inquiries">All Inquiries</TabsTrigger>
            <TabsTrigger value="followup">Follow-ups</TabsTrigger>
            {userRole === 'admin' && (
              <>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </>
            )}
          </TabsList>
          
          <TabsContent value="inquiries">
            <InquiriesList userRole={userRole} currentUser={user} />
          </TabsContent>
          
          <TabsContent value="followup">
            <FollowUpDashboard userRole={userRole} currentUser={user} />
          </TabsContent>
          
          {userRole === 'admin' && (
            <>
              <TabsContent value="assignment">
                <InquiryAssignment userRole={userRole} currentUser={user} />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
              
              <TabsContent value="settings">
                <AdminSettings userRole={userRole} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;