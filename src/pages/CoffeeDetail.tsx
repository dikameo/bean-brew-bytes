
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Star, Package, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { toast } from "sonner";

const CoffeeDetail = () => {
  const { id } = useParams();

  // Sample coffee data - in real app this would come from database
  const coffees = [
    {
      id: "1",
      name: "Ethiopian Yirgacheffe",
      roaster: "Mountain Peak Roasters",
      price: 24.99,
      weight: "250g",
      flavorNotes: ["Floral", "Citrus", "Berry"],
      rating: 5,
      image: "/placeholder.svg",
      inStock: true,
      origin: "Yirgacheffe, Ethiopia",
      altitude: "1,700-2,200m",
      process: "Washed",
      roastLevel: "Light",
      description: "This exceptional Ethiopian coffee offers a bright, clean cup with pronounced floral aromatics and vibrant citrus acidity. Notes of bergamot and jasmine complement the wine-like berry undertones.",
      roasterDescription: "Mountain Peak Roasters is a small-batch artisan roastery dedicated to sourcing the finest single-origin beans from around the world.",
      brewingTips: "Best brewed with pour-over methods. Use 1:16 ratio with water at 200°F. Grind just before brewing for optimal flavor."
    },
    {
      id: "2",
      name: "Colombian Supremo",
      roaster: "Heritage Coffee Co.",
      price: 22.50,
      weight: "250g",
      flavorNotes: ["Chocolate", "Nutty", "Caramel"],
      rating: 4,
      image: "/placeholder.svg",
      inStock: true,
      origin: "Huila, Colombia",
      altitude: "1,500-1,800m",
      process: "Fully Washed",
      roastLevel: "Medium",
      description: "A classic Colombian coffee with rich chocolate notes and a smooth, well-balanced body. Perfect for both espresso and drip brewing methods.",
      roasterDescription: "Heritage Coffee Co. has been roasting premium coffees for over 30 years, focusing on traditional roasting techniques.",
      brewingTips: "Versatile brewing. Works great as espresso or drip coffee. Use 1:15 ratio for espresso, 1:17 for drip."
    }
  ];

  const coffee = coffees.find(c => c.id === id);

  if (!coffee) {
    return (
      <div className="min-h-screen bg-coffee-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-coffee-900 mb-4">Coffee Not Found</h1>
          <Link to="/catalog">
            <Button className="coffee-gradient">Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${coffee.name} to cart!`, {
      description: "Continue shopping or proceed to checkout."
    });
  };

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center text-coffee-700 hover:text-coffee-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Coffee Image */}
          <div className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src={coffee.image} 
              alt={coffee.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Coffee Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold coffee-text-gradient mb-2">{coffee.name}</h1>
              <p className="text-lg text-coffee-700 mb-4">{coffee.roaster}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < coffee.rating ? "fill-coffee-500 text-coffee-500" : "text-coffee-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-coffee-600">({coffee.rating}/5)</span>
                </div>
                <Badge variant={coffee.inStock ? "secondary" : "destructive"}>
                  {coffee.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-coffee-900">${coffee.price}</span>
                <span className="text-coffee-600 ml-2">/ {coffee.weight}</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="border-coffee-300">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleAddToCart}
                  disabled={!coffee.inStock}
                  className="coffee-gradient"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Flavor Notes */}
            <div>
              <h3 className="font-semibold text-coffee-900 mb-2">Flavor Notes</h3>
              <div className="flex flex-wrap gap-2">
                {coffee.flavorNotes.map((note) => (
                  <Badge key={note} variant="outline" className="border-coffee-300 text-coffee-700">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Coffee Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coffee-600" />
                <div>
                  <p className="text-sm text-coffee-600">Origin</p>
                  <p className="font-medium text-coffee-900">{coffee.origin}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-coffee-600" />
                <div>
                  <p className="text-sm text-coffee-600">Process</p>
                  <p className="font-medium text-coffee-900">{coffee.process}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-coffee-600" />
                <div>
                  <p className="text-sm text-coffee-600">Roast Level</p>
                  <p className="font-medium text-coffee-900">{coffee.roastLevel}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-coffee-600">Altitude</p>
                <p className="font-medium text-coffee-900">{coffee.altitude}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-coffee-900">About This Coffee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-coffee-700">{coffee.description}</p>
            </CardContent>
          </Card>

          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-coffee-900">About the Roaster</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-coffee-700">{coffee.roasterDescription}</p>
            </CardContent>
          </Card>

          <Card className="border-coffee-200 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-coffee-900">Brewing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-coffee-700">{coffee.brewingTips}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetail;
