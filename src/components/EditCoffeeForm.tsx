
import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface EditCoffeeFormProps {
  coffee: any;
  onClose?: () => void;
  onSubmit?: (coffee: any) => void;
}

const EditCoffeeForm = ({ coffee, onClose, onSubmit }: EditCoffeeFormProps) => {
  const [formData, setFormData] = useState({
    name: coffee.name || "",
    roaster: coffee.roaster || "Mountain Peak Roasters",
    price: coffee.price?.toString() || "",
    weight: coffee.weight || "250g",
    description: coffee.description || "",
    origin: coffee.origin || "",
    altitude: coffee.altitude || "",
    processing: coffee.processing || "Washed",
    roastLevel: coffee.roastLevel || "Medium",
    inStock: coffee.stock > 0
  });

  const [flavorNotes, setFlavorNotes] = useState<string[]>(coffee.flavorNotes || []);
  const [newFlavorNote, setNewFlavorNote] = useState("");

  const commonFlavorNotes = [
    "Chocolate", "Nutty", "Caramel", "Floral", "Citrus", "Berry", "Fruity",
    "Spicy", "Smoky", "Wine-like", "Bright", "Clean", "Complex", "Sweet",
    "Vanilla", "Honey", "Tropical", "Earthy", "Herbal"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFlavorNote = (note: string) => {
    if (note && !flavorNotes.includes(note)) {
      setFlavorNotes(prev => [...prev, note]);
      setNewFlavorNote("");
    }
  };

  const removeFlavorNote = (noteToRemove: string) => {
    setFlavorNotes(prev => prev.filter(note => note !== noteToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || flavorNotes.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedCoffee = {
      ...coffee,
      ...formData,
      price: parseFloat(formData.price),
      flavorNotes,
      stock: formData.inStock ? Math.max(coffee.stock, 1) : 0
    };

    if (onSubmit) {
      onSubmit(updatedCoffee);
    }

    toast.success("Coffee updated successfully!", {
      description: `${formData.name} has been updated in your catalog.`
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <Card className="border-coffee-200 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-coffee-900">Edit Coffee</CardTitle>
            <CardDescription>Update coffee details in your catalog</CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Coffee Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ethiopian Yirgacheffe"
                className="border-coffee-300 focus:border-coffee-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roaster">Roaster</Label>
              <Input
                id="roaster"
                value={formData.roaster}
                onChange={(e) => handleInputChange("roaster", e.target.value)}
                className="border-coffee-300 focus:border-coffee-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="24.99"
                className="border-coffee-300 focus:border-coffee-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Select value={formData.weight} onValueChange={(value) => handleInputChange("weight", value)}>
                <SelectTrigger className="border-coffee-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="250g">250g</SelectItem>
                  <SelectItem value="500g">500g</SelectItem>
                  <SelectItem value="1kg">1kg</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the coffee's unique characteristics..."
              className="border-coffee-300 focus:border-coffee-500"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Flavor Notes *</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonFlavorNotes.map((note) => (
                <Badge
                  key={note}
                  variant={flavorNotes.includes(note) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    flavorNotes.includes(note) 
                      ? "coffee-gradient" 
                      : "border-coffee-300 text-coffee-700 hover:bg-coffee-100"
                  }`}
                  onClick={() => 
                    flavorNotes.includes(note) 
                      ? removeFlavorNote(note) 
                      : addFlavorNote(note)
                  }
                >
                  {note}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFlavorNote}
                onChange={(e) => setNewFlavorNote(e.target.value)}
                placeholder="Add custom flavor note"
                className="border-coffee-300 focus:border-coffee-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavorNote(newFlavorNote))}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addFlavorNote(newFlavorNote)}
                className="border-coffee-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {flavorNotes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {flavorNotes.map((note) => (
                  <Badge key={note} variant="secondary" className="bg-coffee-100 text-coffee-700">
                    {note}
                    <button
                      type="button"
                      onClick={() => removeFlavorNote(note)}
                      className="ml-2 text-coffee-500 hover:text-coffee-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => handleInputChange("inStock", e.target.checked)}
              className="w-4 h-4 text-coffee-600 border-coffee-300 rounded focus:ring-coffee-500"
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 coffee-gradient">
              Update Coffee
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose} className="border-coffee-300">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditCoffeeForm;
