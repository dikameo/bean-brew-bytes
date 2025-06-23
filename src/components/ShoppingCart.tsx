
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const ShoppingCartComponent = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Card className="border-coffee-200">
        <CardHeader>
          <CardTitle className="text-coffee-900 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-coffee-600 text-center py-8">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-coffee-200">
      <CardHeader>
        <CardTitle className="text-coffee-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({items.length})
          </div>
          <Button variant="outline" size="sm" onClick={clearCart} className="text-red-600 border-red-300">
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border border-coffee-200 rounded-lg">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            
            <div className="flex-1">
              <h3 className="font-semibold text-coffee-900">{item.name}</h3>
              <p className="text-sm text-coffee-600">{item.roaster}</p>
              <p className="text-sm text-coffee-600">${item.price} / {item.weight}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="min-w-[2rem] text-center">
                {item.quantity}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600"
              onClick={() => removeFromCart(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Separator />
        
        <div className="flex justify-between items-center font-bold text-lg">
          <span className="text-coffee-900">Total:</span>
          <span className="text-coffee-900">${getTotalPrice().toFixed(2)}</span>
        </div>

        <Button className="w-full coffee-gradient">
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShoppingCartComponent;
