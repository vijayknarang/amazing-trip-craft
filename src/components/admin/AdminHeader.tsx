import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AdminHeaderProps {
  user: SupabaseUser;
  userRole: string;
  onSignOut: () => void;
}

export const AdminHeader = ({ user, userRole, onSignOut }: AdminHeaderProps) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'travel_advisor':
        return 'Travel Advisor';
      case 'traveler':
        return 'Traveler';
      default:
        return role;
    }
  };

  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Amazing Trip Maker</h1>
            <span className="text-sm text-muted-foreground">Admin Panel</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span className="font-medium">{user.email}</span>
              <span className="text-muted-foreground">({getRoleDisplayName(userRole)})</span>
            </div>
            
            <Button variant="outline" onClick={onSignOut} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};