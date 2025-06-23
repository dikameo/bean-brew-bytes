
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { toast } from "sonner";

const CoffeeDetail = () => {
  const { id } = useParams();

  // Sample coffee data - in a real app, this would come from an API
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
      description: "A bright and complex coffee with distinctive wine-like acidity and floral aroma. Grown at high altitude in the Yirgacheffe region of Ethiopia, this coffee offers a clean cup with notes of bergamot and jasmine.",
      origin: "Yirgacheffe, Ethiopia",
      altitude: "1,700-2,200m",
      processing: "Washed",
      roastLevel: "Light to Medium",
      brewRecommendations: ["Pour Over", "V60", "French Press"],
      reviews: 127
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
      description: "A well-balanced coffee with rich chocolate and nutty undertones. This Colombian Supremo offers a smooth, full-bodied experience with subtle caramel sweetness.",
      origin: "Huila, Colombia",
      altitude: "1,200-1,800m",
      processing: "Washed",
      roastLevel: "Medium",
      brewRecommendations: ["Espresso", "French Press", "Drip"],
      reviews: 89
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
            <Button className="coffee-gradient">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Button>
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

  const handleAddToWishlist = () => {
    toast.success(`Added ${coffee.name} to wishlist!`);
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
          <div className="aspect-square bg-coffee-100 rounded-lg overflow-hidden">
            <img 
              src={coffee.image} 
              alt={coffee.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Coffee Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-coffee-900 mb-2">{coffee.name}</h1>
              <p className="text-lg text-coffee-600 mb-4">{coffee.roaster}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < coffee.rating ? "fill-coffee-500 text-coffee-500" : "text-coffee-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-coffee-600">({coffee.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-coffee-900">${coffee.price}</span>
                <span className="text-coffee-600">/ {coffee.weight}</span>
                <Badge variant={coffee.inStock ? "secondary" : "destructive"}>
                  {coffee.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <p className="text-coffee-700 mb-6">{coffee.description}</p>

              {/* Flavor Notes */}
              <div className="mb-6">
                <h3 className="font-semibold text-coffee-900 mb-2">Flavor Notes</h3>
                <div className="flex flex-wrap gap-2">
                  {coffee.flavorNotes.map((note) => (
                    <Badge key={note} variant="secondary" className="bg-coffee-100 text-coffee-700">
                      {note}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!coffee.inStock}
                  className="flex-1 coffee-gradient"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="border-coffee-300 text-coffee-700"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-coffee-900">Coffee Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-coffee-600">Origin:</span>
                <span className="text-coffee-900">{coffee.origin}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-coffee-600">Altitude:</span>
                <span className="text-coffee-900">{coffee.altitude}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-coffee-600">Processing:</span>
                <span className="text-coffee-900">{coffee.processing}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-coffee-600">Roast Level:</span>
                <span className="text-coffee-900">{coffee.roastLevel}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-coffee-900">Brewing Recommendations</CardTitle>
              <CardDescription>Best brewing methods for this coffee</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {coffee.brewRecommendations.map((method) => (
                  <Badge key={method} variant="outline" className="border-coffee-300 text-coffee-700">
                    {method}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetail;
