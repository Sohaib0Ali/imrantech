
import { useEffect } from "react";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  // If still loading, show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If logged in but not admin, show unauthorized
  if (!isAdmin) {
    return (
      <div className="container mx-auto section-padding min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
          <p className="mb-6">You do not have permission to access the admin dashboard.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get current path segment for active tab
  const currentPath = location.pathname.split('/').pop() || 'software';
  
  return (
    <div className="container mx-auto section-padding min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link to="/">Back to Website</Link>
        </Button>
      </div>
      
      <Tabs value={currentPath} className="w-full mb-8">
        <TabsList className="grid grid-cols-4 md:w-fit">
          <TabsTrigger value="software" asChild>
            <Link to="/admin/software">Software</Link>
          </TabsTrigger>
          <TabsTrigger value="electronics" asChild>
            <Link to="/admin/electronics">Electronics</Link>
          </TabsTrigger>
          <TabsTrigger value="services" asChild>
            <Link to="/admin/services">Services</Link>
          </TabsTrigger>
          <TabsTrigger value="messages" asChild>
            <Link to="/admin/messages">Messages</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
