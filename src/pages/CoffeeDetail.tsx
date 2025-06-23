
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Package, MapPin, Thermometer, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const CoffeeDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - in real app, this would come from API
  const coffeeData = {
    "1": {
      id: "1",
      name: "Ethiopian Yirgacheffe",
      roaster: "Mountain Peak Roasters",
      price: 24.99,
      weight: "250g",
      flavorNotes: ["Floral", "Citrus", "Berry", "Bright"],
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=600&fit=crop",
      inStock: true,
      description: "This exceptional Ethiopian Yirgacheffe coffee offers a bright, wine-like acidity with distinctive floral and citrus notes. Grown at high altitudes in the birthplace of coffee, this bean delivers a clean, complex cup that's perfect for filter brewing methods.",
      origin: "Yirgacheffe, Ethiopia",
      altitude: "1,700-2,200m",
      processing: "Washed",
      roastLevel: "Light to Medium",
      brewRecommendations: ["Pour Over", "V60", "Chemex", "French Press"]
    },
    "2": {
      id: "2",
      name: "Colombian Supremo",
      roaster: "Heritage Coffee Co.",
      price: 22.50,
      weight: "250g",
      flavorNotes: ["Chocolate", "Nutty", "Caramel", "Smooth"],
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=600&fit=crop",
      inStock: true,
      description: "A classic Colombian coffee with rich chocolate and nutty undertones. This medium roast delivers a smooth, well-balanced cup with caramel sweetness and a clean finish.",
      origin: "Huila, Colombia",
      altitude: "1,400-1,800m", 
      processing: "Washed",
      roastLevel: "Medium",
      brewRecommendations: ["Espresso", "Drip", "French Press"]
    }
  };

  const coffee = coffeeData[id as keyof typeof coffeeData];

  if (!coffee) {
    return (
      <div className="min-h-screen bg-coffee-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-coffee-900 mb-4">Coffee Not Found</h1>
            <Link to="/catalog">
              <Button className="coffee-gradient">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: coffee.id,
        name: coffee.name,
        roaster: coffee.roaster,
        price: coffee.price,
        weight: coffee.weight,
        image: coffee.image
      });
    }
    toast.success(`Added ${quantity} ${coffee.name} to cart`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center text-coffee-600 hover:text-coffee-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src={coffee.image} 
                alt={coffee.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-coffee-900 mb-2">{coffee.name}</h1>
                  <p className="text-lg text-coffee-600">{coffee.roaster}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={`${isFavorite ? 'text-red-500' : 'text-coffee-400'} hover:text-red-500`}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(coffee.rating) ? "fill-coffee-500 text-coffee-500" : "text-coffee-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-coffee-600">({coffee.rating}) • {coffee.reviews} reviews</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-coffee-900">${coffee.price}</span>
                <span className="text-coffee-600">/ {coffee.weight}</span>
                <Badge variant={coffee.inStock ? "secondary" : "destructive"}>
                  {coffee.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            {/* Flavor Notes */}
            <div>
              <h3 className="font-semibold text-coffee-900 mb-3">Flavor Profile</h3>
              <div className="flex flex-wrap gap-2">
                {coffee.flavorNotes.map((note) => (
                  <Badge key={note} variant="outline" className="bg-coffee-100 text-coffee-700 border-coffee-300">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-coffee-300"
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-coffee-300"
                >
                  +
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!coffee.inStock}
                className="flex-1 coffee-gradient hover:opacity-90"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(coffee.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-coffee-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-coffee-900 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Origin Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-coffee-600">Origin:</span>
                <span className="font-medium text-coffee-900">{coffee.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-600">Altitude:</span>
                <span className="font-medium text-coffee-900">{coffee.altitude}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-600">Processing:</span>
                <span className="font-medium text-coffee-900">{coffee.processing}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-coffee-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-coffee-900 flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Roast Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-coffee-600">Roast Level:</span>
                <span className="font-medium text-coffee-900">{coffee.roastLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-600">Weight:</span>
                <span className="font-medium text-coffee-900">{coffee.weight}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-coffee-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-coffee-900 flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Brewing Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {coffee.brewRecommendations.map((method) => (
                  <Badge key={method} variant="secondary" className="bg-coffee-100 text-coffee-700">
                    {method}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="border-coffee-200">
          <CardHeader>
            <CardTitle className="text-coffee-900">About This Coffee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-coffee-700 leading-relaxed">{coffee.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoffeeDetail;
