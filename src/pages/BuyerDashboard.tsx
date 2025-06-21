
import { ShoppingCart, Heart, Package, Star, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  const recentOrders = [
    { 
      id: "ORD-001", 
      date: "2024-01-15", 
      roaster: "Mountain Peak Roasters", 
      product: "Ethiopian Yirgacheffe", 
      quantity: 2, 
      status: "delivered", 
      total: 49.98,
      tracking: "DEL001"
    },
    { 
      id: "ORD-002", 
      date: "2024-01-12", 
      roaster: "Heritage Coffee Co.", 
      product: "Colombian Supremo", 
      quantity: 1, 
      status: "shipped", 
      total: 22.50,
      tracking: "TRK002"
    },
    { 
      id: "ORD-003", 
      date: "2024-01-10", 
      roaster: "Artisan Roast Works", 
      product: "Guatemala Antigua", 
      quantity: 3, 
      status: "processing", 
      total: 80.25,
      tracking: "PRO003"
    },
  ];

  const favorites = [
    { id: "1", name: "Ethiopian Yirgacheffe", roaster: "Mountain Peak Roasters", price: 24.99, rating: 4.8 },
    { id: "2", name: "Kenya AA", roaster: "Highland Roasters", price: 28.00, rating: 4.9 },
    { id: "3", name: "Costa Rica Tarrazú", roaster: "Pure Origin Coffee", price: 25.50, rating: 4.7 },
  ];

  const recommendations = [
    { id: "4", name: "Colombian Huila", roaster: "Sunrise Coffee Roasters", price: 23.75, reason: "Similar to your favorites" },
    { id: "5", name: "Panama Geisha", roaster: "Elite Coffee Works", price: 45.00, reason: "Premium selection" },
  ];

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold coffee-text-gradient">Buyer Dashboard</h1>
            <p className="text-coffee-700 mt-2">Welcome back, Coffee Enthusiast!</p>
          </div>
          <div className="flex gap-3">
            <Link to="/catalog">
              <Button className="coffee-gradient">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Coffee
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="outline" className="border-coffee-300 text-coffee-700">
                <Truck className="h-4 w-4 mr-2" />
                Track Orders
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value="23"
            description="All time"
            icon={Package}
          />
          <StatsCard
            title="Favorites"
            value={favorites.length}
            description="Saved coffees"
            icon={Heart}
          />
          <StatsCard
            title="Active Orders"
            value="2"
            description="In progress"
            icon={Truck}
          />
          <StatsCard
            title="Reviews Given"
            value="18"
            description="Community feedback"
            icon={Star}
          />
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-coffee-200">
            <TabsTrigger value="orders" className="data-[state=active]:bg-coffee-100">My Orders</TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-coffee-100">Favorites</TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-coffee-100">For You</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-coffee-100">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Recent Orders</CardTitle>
                <CardDescription>Track your coffee orders and delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-coffee-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-coffee-900">{order.id}</span>
                          <Badge
                            variant={order.status === "delivered" ? "secondary" : 
                                   order.status === "shipped" ? "default" : "destructive"}
                            className={order.status === "delivered" ? "bg-green-100 text-green-800" : 
                                     order.status === "shipped" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-coffee-700 font-medium">{order.product}</p>
                        <p className="text-sm text-coffee-600">
                          {order.roaster} • {order.date} • Qty: {order.quantity} • ${order.total}
                        </p>
                        {order.status !== "delivered" && (
                          <p className="text-xs text-coffee-500 mt-1">
                            Tracking: {order.tracking}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-coffee-300">
                          {order.status === "delivered" ? "Review" : "Track"}
                        </Button>
                        {order.status === "delivered" && (
                          <Button size="sm" className="coffee-gradient">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Your Favorite Coffees</CardTitle>
                <CardDescription>Quick access to your most loved selections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((coffee) => (
                    <div key={coffee.id} className="p-4 border border-coffee-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-coffee-900">{coffee.name}</h3>
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      </div>
                      <p className="text-sm text-coffee-600 mb-2">{coffee.roaster}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-coffee-900">${coffee.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-coffee-500 text-coffee-500" />
                          <span className="text-sm text-coffee-600">{coffee.rating}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3 coffee-gradient">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Recommended for You</CardTitle>
                <CardDescription>Discover new coffees based on your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((coffee) => (
                    <div key={coffee.id} className="p-4 border border-coffee-200 rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-coffee-900 mb-1">{coffee.name}</h3>
                      <p className="text-sm text-coffee-600 mb-2">{coffee.roaster}</p>
                      <Badge variant="secondary" className="bg-coffee-100 text-coffee-700 mb-3">
                        {coffee.reason}
                      </Badge>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-coffee-900">${coffee.price}</span>
                        <Button size="sm" className="coffee-gradient">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Try Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Your Reviews</CardTitle>
                <CardDescription>Share your coffee experiences with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 mx-auto text-coffee-300 mb-4" />
                  <p className="text-coffee-600 mb-4">You haven't written any reviews yet</p>
                  <p className="text-sm text-coffee-500 mb-6">
                    Help other coffee lovers by sharing your thoughts on the coffees you've tried
                  </p>
                  <Link to="/orders">
                    <Button className="coffee-gradient">
                      Review Past Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;
