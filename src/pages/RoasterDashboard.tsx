import { useState } from "react";
import { Package, TrendingUp, Star, Plus, Bell, BarChart3, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import AddCoffeeForm from "@/components/AddCoffeeForm";
import EditCoffeeForm from "@/components/EditCoffeeForm";
import { toast } from "sonner";
import Profile from "@/components/Profile";

const RoasterDashboard = () => {
  const [showAddCoffeeForm, setShowAddCoffeeForm] = useState(false);
  const [showEditCoffeeForm, setShowEditCoffeeForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [products, setProducts] = useState([
    { 
      id: "1", 
      name: "Ethiopian Yirgacheffe", 
      roaster: "Mountain Peak Roasters",
      stock: 45, 
      price: 24.99, 
      rating: 4.8, 
      sales: 127,
      flavorNotes: ["Floral", "Citrus", "Berry"],
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
    },
    { 
      id: "2", 
      name: "Colombian Supremo", 
      roaster: "Mountain Peak Roasters",
      stock: 32, 
      price: 22.50, 
      rating: 4.6, 
      sales: 89,
      flavorNotes: ["Chocolate", "Nutty", "Caramel"],
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop"
    },
    { 
      id: "3", 
      name: "Guatemala Antigua", 
      roaster: "Mountain Peak Roasters",
      stock: 0, 
      price: 26.75, 
      rating: 4.9, 
      sales: 156,
      flavorNotes: ["Smoky", "Spicy", "Full-bodied"],
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
    },
  ]);

  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Sarah Johnson", product: "Ethiopian Yirgacheffe", quantity: 2, status: "pending", total: 49.98 },
    { id: "ORD-002", customer: "Mike Chen", product: "Colombian Supremo", quantity: 1, status: "processing", total: 22.50 },
    { id: "ORD-003", customer: "Emma Davis", product: "Guatemala Antigua", quantity: 3, status: "shipped", total: 80.25 },
  ]);

  const handleAddProduct = () => {
    setShowAddCoffeeForm(true);
  };

  const handleProductSubmit = (newCoffee: any) => {
    setProducts(prev => [...prev, {
      id: newCoffee.id,
      name: newCoffee.name,
      roaster: newCoffee.roaster,
      stock: 50,
      price: newCoffee.price,
      rating: 0,
      sales: 0,
      flavorNotes: newCoffee.flavorNotes,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
    }]);
    setShowAddCoffeeForm(false);
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setShowEditCoffeeForm(true);
    }
  };

  const handleEditSubmit = (updatedCoffee: any) => {
    setProducts(prev => prev.map(p => 
      p.id === updatedCoffee.id ? updatedCoffee : p
    ));
    setShowEditCoffeeForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast.success("Product deleted successfully");
  };

  const handleRestockProduct = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: p.stock + 50 } : p
    ));
    toast.success("Product restocked successfully");
  };

  const handleViewProduct = (productId: string) => {
    toast.info(`Viewing product ${productId} details`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleViewOrderDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast.info(`Order Details: ${order.customer} - ${order.product} x${order.quantity} - $${order.total}`);
    }
  };

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold coffee-text-gradient">Roaster Dashboard</h1>
            <p className="text-coffee-700 mt-2">Welcome back, Mountain Peak Roasters</p>
          </div>
          <Dialog open={showAddCoffeeForm} onOpenChange={setShowAddCoffeeForm}>
            <DialogTrigger asChild>
              <Button onClick={handleAddProduct} className="coffee-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Add New Coffee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <AddCoffeeForm
                onClose={() => setShowAddCoffeeForm(false)}
                onSubmit={handleProductSubmit}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Coffee Dialog */}
        <Dialog open={showEditCoffeeForm} onOpenChange={setShowEditCoffeeForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {editingProduct && (
              <EditCoffeeForm
                coffee={editingProduct}
                onClose={() => {
                  setShowEditCoffeeForm(false);
                  setEditingProduct(null);
                }}
                onSubmit={handleEditSubmit}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Sales"
            value="$12,847"
            description="This month"
            icon={TrendingUp}
            trend={{ value: 12.5, label: "from last month" }}
          />
          <StatsCard
            title="Active Products"
            value={products.length}
            description="In catalog"
            icon={Package}
          />
          <StatsCard
            title="Pending Orders"
            value={orders.filter(o => o.status === "pending").length.toString()}
            description="Need attention"
            icon={Bell}
          />
          <StatsCard
            title="Avg Rating"
            value="4.8"
            description="Customer satisfaction"
            icon={Star}
          />
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-coffee-200">
            <TabsTrigger value="orders" className="data-[state=active]:bg-coffee-100">Recent Orders</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-coffee-100">My Products</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-coffee-100">Analytics</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-coffee-100">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Recent Orders</CardTitle>
                <CardDescription>Manage your incoming orders and fulfillment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-coffee-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-coffee-900">{order.id}</span>
                          <Badge
                            variant={order.status === "pending" ? "destructive" : 
                                   order.status === "processing" ? "default" : "secondary"}
                            className={order.status === "pending" ? "" : 
                                     order.status === "processing" ? "coffee-gradient" : "bg-green-100 text-green-800"}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-coffee-700">{order.customer} • {order.product}</p>
                        <p className="text-sm text-coffee-600">Quantity: {order.quantity} • Total: ${order.total}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-coffee-300"
                          onClick={() => handleViewOrderDetails(order.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {order.status === "pending" && (
                          <Button 
                            size="sm" 
                            className="coffee-gradient"
                            onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                          >
                            Process
                          </Button>
                        )}
                        {order.status === "processing" && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                          >
                            Ship
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="border-coffee-200">
              <CardHeader>
                <CardTitle className="text-coffee-900">Product Inventory</CardTitle>
                <CardDescription>Manage your coffee products and stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border border-coffee-200 rounded-lg">
                      <div className="flex items-center gap-4 flex-1">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-coffee-900 mb-1">{product.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-coffee-600">
                            <span>Stock: {product.stock} bags</span>
                            <span>Price: ${product.price}</span>
                            <span>Rating: {product.rating}/5</span>
                            <span>Sales: {product.sales}</span>
                          </div>
                          {product.stock === 0 && (
                            <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                          )}
                          {product.stock < 10 && product.stock > 0 && (
                            <Badge variant="default" className="mt-2 bg-orange-100 text-orange-800">Low Stock</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-coffee-300"
                          onClick={() => handleViewProduct(product.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-coffee-300"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-coffee-300"
                          onClick={() => handleRestockProduct(product.id)}
                        >
                          Restock
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
                  <CardTitle className="text-coffee-900 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">This Week</span>
                      <span className="font-bold text-coffee-900">$2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">This Month</span>
                      <span className="font-bold text-coffee-900">$12,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Total Revenue</span>
                      <span className="font-bold text-coffee-900">$67,234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-coffee-200">
                <CardHeader>
                  <CardTitle className="text-coffee-900">Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products
                      .sort((a, b) => b.sales - a.sales)
                      .map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center p-0">
                              {index + 1}
                            </Badge>
                            <span className="text-coffee-900">{product.name}</span>
                          </div>
                          <span className="text-coffee-600">{product.sales} sales</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Profile userType="roaster" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoasterDashboard;
