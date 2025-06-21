
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  onAddToCart?: (id: string) => void;
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
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-coffee-200">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-coffee-900 mb-2">
          {name}
        </CardTitle>
        <p className="text-sm text-coffee-600 mb-2">by {roaster}</p>
        
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-coffee-500 text-coffee-500" : "text-coffee-200"
              }`}
            />
          ))}
          <span className="text-sm text-coffee-600 ml-1">({rating})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {flavorNotes.map((note) => (
            <Badge key={note} variant="secondary" className="bg-coffee-100 text-coffee-700 text-xs">
              {note}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-coffee-900">${price}</span>
            <span className="text-sm text-coffee-600 ml-1">/ {weight}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full coffee-gradient hover:opacity-90 transition-opacity"
          disabled={!inStock}
          onClick={() => onAddToCart?.(id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoffeeCard;
