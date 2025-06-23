
import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AddCoffeeFormProps {
  onClose: () => void;
  onSubmit: (coffeeData: any) => void;
}

const AddCoffeeForm = ({ onClose, onSubmit }: AddCoffeeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    weight: "250g",
    origin: "",
    altitude: "",
    process: "",
    roastLevel: "",
    description: "",
    brewingTips: "",
    stock: ""
  });
  
  const [flavorNotes, setFlavorNotes] = useState<string[]>([]);
  const [newFlavorNote, setNewFlavorNote] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFlavorNote = () => {
    if (newFlavorNote.trim() && !flavorNotes.includes(newFlavorNote.trim())) {
      setFlavorNotes(prev => [...prev, newFlavorNote.trim()]);
      setNewFlavorNote("");
    }
  };

  const removeFlavorNote = (note: string) => {
    setFlavorNotes(prev => prev.filter(n => n !== note));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.origin) {
      toast.error("Please fill in all required fields");
      return;
    }

    const coffeeData = {
      ...formData,
      flavorNotes,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      rating: 0,
      image: "/placeholder.svg",
      inStock: parseInt(formData.stock) > 0
    };

    onSubmit(coffeeData);
    toast.success("Coffee added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-coffee-900">Add New Coffee</CardTitle>
            <CardDescription>Add a new coffee to your catalog</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Coffee Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Ethiopian Yirgacheffe"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="24.99"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Select value={formData.weight} onValueChange={(value) => handleInputChange("weight", value)}>
                  <SelectTrigger>
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

            {/* Coffee Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">Origin *</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleInputChange("origin", e.target.value)}
                  placeholder="e.g., Yirgacheffe, Ethiopia"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="altitude">Altitude</Label>
                <Input
                  id="altitude"
                  value={formData.altitude}
                  onChange={(e) => handleInputChange("altitude", e.target.value)}
                  placeholder="e.g., 1,700-2,200m"
                />
              </div>
              
              <div>
                <Label htmlFor="process">Process Method</Label>
                <Select value={formData.process} onValueChange={(value) => handleInputChange("process", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select process" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Washed">Washed</SelectItem>
                    <SelectItem value="Natural">Natural</SelectItem>
                    <SelectItem value="Honey">Honey</SelectItem>
                    <SelectItem value="Semi-washed">Semi-washed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="roastLevel">Roast Level</Label>
                <Select value={formData.roastLevel} onValueChange={(value) => handleInputChange("roastLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roast level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Light">Light</SelectItem>
                    <SelectItem value="Medium-Light">Medium-Light</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Medium-Dark">Medium-Dark</SelectItem>
                    <SelectItem value="Dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Flavor Notes */}
            <div>
              <Label>Flavor Notes</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newFlavorNote}
                  onChange={(e) => setNewFlavorNote(e.target.value)}
                  placeholder="Add flavor note"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavorNote())}
                />
                <Button type="button" onClick={addFlavorNote} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {flavorNotes.map((note) => (
                  <Badge key={note} variant="secondary" className="cursor-pointer" onClick={() => removeFlavorNote(note)}>
                    {note} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                placeholder="50"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the coffee's characteristics, taste profile, and unique qualities..."
                rows={3}
              />
            </div>

            {/* Brewing Tips */}
            <div>
              <Label htmlFor="brewingTips">Brewing Tips</Label>
              <Textarea
                id="brewingTips"
                value={formData.brewingTips}
                onChange={(e) => handleInputChange("brewingTips", e.target.value)}
                placeholder="Share brewing recommendations and tips for the best flavor extraction..."
                rows={2}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 coffee-gradient">
                Add Coffee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCoffeeForm;
