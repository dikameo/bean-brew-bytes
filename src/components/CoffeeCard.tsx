
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CoffeeCardProps {
  id: string;
  name: string;
  roaster: string;
  price: number;
  weight: string;
  flavorNotes: string[];
  rating: number;
  image: string;
  inStock: boolean;
  onAddToCart: (id: string) => void;
}

const CoffeeCard = ({
  id,
  name,
  roaster,
  price,
  weight,
  flavorNotes,
  rating,
  image,
  inStock,
  onAddToCart
}: CoffeeCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 border-coffee-200 overflow-hidden">
      <Link to={`/coffee/${id}`}>
        <div className="aspect-square bg-coffee-100 overflow-hidden cursor-pointer">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link to={`/coffee/${id}`}>
              <h3 className="font-semibold text-coffee-900 group-hover:text-coffee-700 transition-colors cursor-pointer">
                {name}
              </h3>
            </Link>
            <p className="text-sm text-coffee-600">{roaster}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-coffee-500 hover:text-red-500">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-coffee-500 text-coffee-500" : "text-coffee-300"
              }`}
            />
          ))}
          <span className="text-sm text-coffee-600 ml-1">({rating})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {flavorNotes.slice(0, 2).map((note) => (
            <Badge key={note} variant="secondary" className="text-xs bg-coffee-100 text-coffee-700">
              {note}
            </Badge>
          ))}
          {flavorNotes.length > 2 && (
            <Badge variant="secondary" className="text-xs bg-coffee-100 text-coffee-700">
              +{flavorNotes.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-coffee-900">${price}</span>
            <span className="text-sm text-coffee-600 ml-1">/ {weight}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={inStock ? "secondary" : "destructive"} className="text-xs">
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        <Button
          onClick={() => onAddToCart(id)}
          disabled={!inStock}
          className="w-full mt-3 coffee-gradient hover:opacity-90"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoffeeCard;
