
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import RoasterDashboard from "@/pages/RoasterDashboard";
import BuyerDashboard from "@/pages/BuyerDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const RoleBasedDashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get user role from localStorage or session
    const role = localStorage.getItem("userRole") || "guest";
    setUserRole(role);
  }, []);

  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  if (userRole === "roaster") {
    return <RoasterDashboard />;
  }

  if (userRole === "buyer") {
    return <BuyerDashboard />;
  }

  // Guest or no role - show role selection
  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold coffee-text-gradient mb-4">
            Welcome to Roasty
          </h1>
          <p className="text-coffee-700 text-lg mb-8">
            Choose your role to access your personalized dashboard
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-coffee-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-coffee-900">Admin</CardTitle>
                <CardDescription>
                  Manage the entire platform, users, and system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/login">
                  <Button className="w-full coffee-gradient">
                    Admin Login
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-coffee-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-coffee-900">Roaster</CardTitle>
                <CardDescription>
                  Manage your coffee products, orders, and business analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full coffee-gradient"
                  onClick={() => {
                    localStorage.setItem("userRole", "roaster");
                    setUserRole("roaster");
                  }}
                >
                  Enter as Roaster
                </Button>
              </CardContent>
            </Card>

            <Card className="border-coffee-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-coffee-900">Buyer</CardTitle>
                <CardDescription>
                  Browse coffees, manage orders, and track your purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full coffee-gradient"
                  onClick={() => {
                    localStorage.setItem("userRole", "buyer");
                    setUserRole("buyer");
                  }}
                >
                  Enter as Buyer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedDashboard;
