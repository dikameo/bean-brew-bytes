
import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Sample tracking data
  const sampleOrders = [
    {
      id: "ORD-001",
      trackingNumber: "TRK12345",
      product: "Ethiopian Yirgacheffe",
      roaster: "Mountain Peak Roasters",
      orderDate: "2024-01-12",
      estimatedDelivery: "2024-01-18",
      status: "shipped",
      currentLocation: "Distribution Center - Chicago",
      timeline: [
        { status: "ordered", date: "2024-01-12", time: "10:30 AM", description: "Order confirmed and payment processed" },
        { status: "processing", date: "2024-01-13", time: "2:15 PM", description: "Coffee beans selected and roasting initiated" },
        { status: "packed", date: "2024-01-14", time: "11:00 AM", description: "Order packed and ready for shipment" },
        { status: "shipped", date: "2024-01-15", time: "3:45 PM", description: "Package picked up by courier", current: true },
        { status: "out-for-delivery", date: "", time: "", description: "Out for delivery" },
        { status: "delivered", date: "", time: "", description: "Package delivered" }
      ]
    }
  ];

  const handleSearch = () => {
    if (trackingNumber.toLowerCase().includes("trk")) {
      setSearchResults(sampleOrders.filter(order => 
        order.trackingNumber.toLowerCase().includes(trackingNumber.toLowerCase()) ||
        order.id.toLowerCase().includes(trackingNumber.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };

  const getStatusIcon = (status: string, isCurrent: boolean) => {
    const iconClass = isCurrent ? "text-coffee-600" : "text-coffee-300";
    
    switch (status) {
      case "ordered":
        return <CheckCircle className={`h-5 w-5 ${iconClass}`} />;
      case "processing":
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
      case "packed":
        return <Package className={`h-5 w-5 ${iconClass}`} />;
      case "shipped":
        return <Truck className={`h-5 w-5 ${iconClass}`} />;
      case "out-for-delivery":
        return <Truck className={`h-5 w-5 ${iconClass}`} />;
      case "delivered":
        return <CheckCircle className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 coffee-text-gradient">Order Tracking</h1>
          <p className="text-coffee-700 text-lg">
            Track your coffee orders from roasting to delivery
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 border-coffee-200">
          <CardHeader>
            <CardTitle className="text-coffee-900">Track Your Order</CardTitle>
            <CardDescription>
              Enter your order ID or tracking number to see the latest updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-coffee-500" />
                <Input
                  placeholder="Enter order ID (e.g., ORD-001) or tracking number (e.g., TRK12345)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="pl-10 border-coffee-300 focus:border-coffee-500"
                />
              </div>
              <Button onClick={handleSearch} className="coffee-gradient">
                Track Order
              </Button>
            </div>
            <p className="text-sm text-coffee-600 mt-2">
              Try searching with: TRK12345 or ORD-001
            </p>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((order) => (
              <Card key={order.id} className="border-coffee-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-coffee-900 flex items-center gap-3">
                        Order {order.id}
                        <Badge 
                          variant="secondary" 
                          className="bg-blue-100 text-blue-800"
                        >
                          {order.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {order.product} from {order.roaster}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-coffee-600">
                      <p>Tracking: {order.trackingNumber}</p>
                      <p>Ordered: {order.orderDate}</p>
                      <p>Est. Delivery: {order.estimatedDelivery}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="text-coffee-700 font-medium mb-2">Current Status:</p>
                    <p className="text-coffee-600">{order.currentLocation}</p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-coffee-900 mb-4">Order Timeline</h3>
                    {order.timeline.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(step.status, step.current || false)}
                          {index < order.timeline.length - 1 && (
                            <div className={`w-px h-8 mt-2 ${step.current ? 'bg-coffee-300' : 'bg-coffee-200'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-medium capitalize ${step.current ? 'text-coffee-900' : 'text-coffee-600'}`}>
                              {step.status.replace('-', ' ')}
                            </p>
                            {step.current && (
                              <Badge variant="default" className="coffee-gradient text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className={`text-sm ${step.current ? 'text-coffee-700' : 'text-coffee-500'}`}>
                            {step.description}
                          </p>
                          {step.date && (
                            <p className={`text-xs mt-1 ${step.current ? 'text-coffee-600' : 'text-coffee-400'}`}>
                              {step.date} at {step.time}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-coffee-200">
                    <Button variant="outline" className="border-coffee-300 text-coffee-700">
                      Contact Roaster
                    </Button>
                    <Button variant="outline" className="border-coffee-300 text-coffee-700">
                      Report Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {trackingNumber && searchResults.length === 0 && (
          <Card className="border-coffee-200">
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-coffee-300 mb-4" />
              <p className="text-coffee-600 text-lg mb-2">No orders found</p>
              <p className="text-coffee-500">
                Please check your order ID or tracking number and try again
              </p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 border-coffee-200">
          <CardHeader>
            <CardTitle className="text-coffee-900">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Search className="h-8 w-8 mx-auto text-coffee-600 mb-2" />
              <h3 className="font-medium text-coffee-900 mb-1">Can't find your order?</h3>
              <p className="text-sm text-coffee-600">Check your email for order confirmation</p>
            </div>
            <div className="text-center p-4">
              <Clock className="h-8 w-8 mx-auto text-coffee-600 mb-2" />
              <h3 className="font-medium text-coffee-900 mb-1">Delayed delivery?</h3>
              <p className="text-sm text-coffee-600">Contact customer support for assistance</p>
            </div>
            <div className="text-center p-4">
              <Package className="h-8 w-8 mx-auto text-coffee-600 mb-2" />
              <h3 className="font-medium text-coffee-900 mb-1">Package issues?</h3>
              <p className="text-sm text-coffee-600">Report damaged or missing items</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;
