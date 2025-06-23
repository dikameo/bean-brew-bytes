import { Users, Package, TrendingUp, AlertTriangle, Eye, UserCheck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import Profile from "@/components/Profile";

const AdminDashboard = () => {
  const systemStats = {
    totalUsers: 1247,
    activeRoasters: 43,
    totalProducts: 186,
    monthlyRevenue: 89750,
    pendingReviews: 12,
    supportTickets: 3
  };

  const recentUsers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      role: "buyer",
      joinDate: "2024-01-15",
      status: "active",
      orders: 8
    },
    {
      id: "2", 
      name: "Mountain Peak Roasters",
      email: "contact@mountainpeak.com",
      role: "roaster",
      joinDate: "2024-01-10",
      status: "active",
      products: 12
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@email.com", 
      role: "buyer",
      joinDate: "2024-01-12",
      status: "pending",
      orders: 0
    }
  ];

  const recentTransactions = [
    {
      id: "TXN-001",
      customer: "Sarah Johnson",
      roaster: "Mountain Peak Roasters",
      product: "Ethiopian Yirgacheffe",
      amount: 49.98,
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "TXN-002", 
      customer: "Emma Davis",
      roaster: "Heritage Coffee Co.",
      product: "Colombian Supremo",
      amount: 22.50,
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: "TXN-003",
      customer: "Alex Wilson",
      roaster: "Artisan Roast Works", 
      product: "Guatemala Antigua",
      amount: 80.25,
      date: "2024-01-13",
      status: "refunded"
    }
  ];

  const supportTickets = [
    {
      id: "SUP-001",
      user: "John Doe",
      subject: "Order not received",
      priority: "high",
      status: "open",
      created: "2024-01-15"
    },
    {
      id: "SUP-002",
      user: "Heritage Coffee Co.",
      subject: "Payment processing issue", 
      priority: "medium",
      status: "in-progress",
      created: "2024-01-14"
    },
    {
      id: "SUP-003",
      user: "Lisa Smith",
      subject: "Account verification",
      priority: "low", 
      status: "resolved",
      created: "2024-01-13"
    }
  ];

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold coffee-text-gradient">Admin Dashboard</h1>
            <p className="text-coffee-700 mt-2">System overview and management</p>
          </div>
          <Button className="coffee-gradient">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>

        {/* System Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={systemStats.totalUsers.toLocaleString()}
            description="Platform members"
            icon={Users}
            trend={{ value: 8.2, label: "from last month" }}
          />
          <StatsCard
            title="Active Roasters"
            value={systemStats.activeRoasters}
            description="Verified sellers"
            icon={UserCheck}
          />
          <StatsCard
            title="Total Products"
            value={systemStats.totalProducts}
            description="In marketplace"
            icon={Package}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${(systemStats.monthlyRevenue / 1000).toFixed(1)}k`}
            description="Platform fees"
            icon={TrendingUp}
            trend={{ value: 15.3, label: "from last month" }}
          />
        </div>

        {/* Alert Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">Pending Reviews</p>
                  <p className="text-sm text-orange-700">{systemStats.pendingReviews} reviews awaiting moderation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Support Tickets</p>
                  <p className="text-sm text-red-700">{systemStats.supportTickets} open tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">System Status</p>
                  <p className="text-sm text-green-700">All systems operational</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-coffee-200">
            <TabsTrigger value="users" className="data-[state=active]:bg-coffee-100">User Management</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-coffee-100">Transactions</TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-coffee-100">Support</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-coffee-100">Analytics</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-coffee-100">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Recent User Registrations</CardTitle>
                <CardDescription>Monitor new platform members and their activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-coffee-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-coffee-900">{user.name}</h3>
                          <Badge
                            variant={user.role === "roaster" ? "default" : "secondary"}
                            className={user.role === "roaster" ? "coffee-gradient" : "bg-coffee-100 text-coffee-700"}
                          >
                            {user.role}
                          </Badge>
                          <Badge
                            variant={user.status === "active" ? "secondary" : "destructive"}
                            className={user.status === "active" ? "bg-green-100 text-green-800" : ""}
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-coffee-600">{user.email}</p>
                        <p className="text-xs text-coffee-500">
                          Joined: {user.joinDate} • 
                          {user.role === "buyer" ? ` ${user.orders} orders` : ` ${user.products} products`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-coffee-300">
                          View Profile
                        </Button>
                        {user.status === "pending" && (
                          <Button size="sm" className="coffee-gradient">
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Recent Transactions</CardTitle>
                <CardDescription>Monitor payment activities and order completions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-coffee-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-coffee-900">{transaction.id}</span>
                          <Badge
                            variant={transaction.status === "completed" ? "secondary" : "destructive"}
                            className={transaction.status === "completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-coffee-700 font-medium">{transaction.product}</p>
                        <p className="text-sm text-coffee-600">
                          {transaction.customer} → {transaction.roaster}
                        </p>
                        <p className="text-xs text-coffee-500">
                          {transaction.date} • ${transaction.amount}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="border-coffee-300">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Support Tickets</CardTitle>
                <CardDescription>Customer support and issue resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border border-coffee-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-coffee-900">{ticket.id}</span>
                          <Badge
                            variant={ticket.priority === "high" ? "destructive" : 
                                   ticket.priority === "medium" ? "default" : "secondary"}
                            className={ticket.priority === "high" ? "" :
                                     ticket.priority === "medium" ? "bg-orange-100 text-orange-800" : "bg-coffee-100 text-coffee-700"}
                          >
                            {ticket.priority}
                          </Badge>
                          <Badge
                            variant={ticket.status === "resolved" ? "secondary" : "default"}
                            className={ticket.status === "resolved" ? "bg-green-100 text-green-800" : 
                                     ticket.status === "in-progress" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                        <p className="text-coffee-700 font-medium">{ticket.subject}</p>
                        <p className="text-sm text-coffee-600">From: {ticket.user}</p>
                        <p className="text-xs text-coffee-500">Created: {ticket.created}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-coffee-300">
                        {ticket.status === "open" ? "Respond" : "View"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-coffee-200">
                <CardHeader>
                  <CardTitle className="text-coffee-900">Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">New Users (This Month)</span>
                      <span className="font-bold text-coffee-900">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">New Roasters</span>
                      <span className="font-bold text-coffee-900">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Products Added</span>
                      <span className="font-bold text-coffee-900">34</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Total Orders</span>
                      <span className="font-bold text-coffee-900">456</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-coffee-200">
                <CardHeader>
                  <CardTitle className="text-coffee-900">Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Platform Fees</span>
                      <span className="font-bold text-coffee-900">$4,487</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Processing Fees</span>
                      <span className="font-bold text-coffee-900">$1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Subscription Revenue</span>
                      <span className="font-bold text-coffee-900">$890</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-coffee-200 pt-2">
                      <span className="text-coffee-700 font-medium">Total Revenue</span>
                      <span className="font-bold text-coffee-900">$6,611</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Profile userType="admin" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
