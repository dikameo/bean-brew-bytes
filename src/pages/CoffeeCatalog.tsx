import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import CoffeeCard from "@/components/CoffeeCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const CoffeeCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const { addToCart } = useCart();

  // Sample coffee data with coffee bean images from Unsplash
  const coffees = [
    {
      id: "1",
      name: "Arabica Van Java",
      roaster: "Mountain Peak Roasters",
      price: 24.99,
      weight: "250g",
      flavorNotes: ["Floral", "Citrus", "Berry"],
      rating: 5,
      image: "https://images.unsplash.com/photo-1558618666-4bfc6a7b2b93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      inStock: true
    },
    {
      id: "2",
      name: "Robusta le mbatu",
      roaster: "Heritage Coffee Co.",
      price: 22.50,
      weight: "250g",
      flavorNotes: ["Chocolate", "Nutty", "Caramel"],
      rating: 4,
      image: "https://images.unsplash.com/photo-1573628684835-ca186702bbde?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      inStock: true
    },
    {
      id: "3",
      name: "Liberica amala",
      roaster: "Artisan Roast Works",
      price: 26.75,
      weight: "250g",
      flavorNotes: ["Smoky", "Spicy", "Full-bodied"],
      rating: 5,
      image: "https://images.unsplash.com/photo-1525088553748-01d6e210e00b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      inStock: false
    },
    {
      id: "4",
      name: "Brazilian Santos",
      roaster: "Sunrise Coffee Roasters",
      price: 19.99,
      weight: "250g",
      flavorNotes: ["Nutty", "Chocolate", "Low Acidity"],
      rating: 4,
      image: "https://images.unsplash.com/photo-1640770587296-3bef99ca1df5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8",
      inStock: true
    },
    {
      id: "5",
      name: "Kenya AA",
      roaster: "Highland Roasters",
      price: 28.00,
      weight: "250g",
      flavorNotes: ["Wine-like", "Bright", "Complex"],
      rating: 5,
      image: "https://plus.unsplash.com/premium_photo-1663050893505-590767094e6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8",
      inStock: true
    },
    {
      id: "6",
      name: "Costa Rica Tarrazú",
      roaster: "Pure Origin Coffee",
      price: 25.50,
      weight: "250g",
      flavorNotes: ["Bright", "Clean", "Citrus"],
      rating: 4,
      image: "https://images.unsplash.com/photo-1652007762843-131e95e453d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU1fHx8ZW58MHx8fHx8",
      inStock: true
    }
  ];

  const handleAddToCart = (coffeeId: string) => {
    const coffee = coffees.find(c => c.id === coffeeId);
    if (coffee) {
      addToCart({
        id: coffee.id,
        name: coffee.name,
        roaster: coffee.roaster,
        price: coffee.price,
        weight: coffee.weight,
        image: coffee.image
      });
    }
  };

  const filteredCoffees = coffees.filter(coffee => {
    const matchesSearch = coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coffee.roaster.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coffee.flavorNotes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "in-stock" && coffee.inStock) ||
                         (selectedFilter === "out-of-stock" && !coffee.inStock);
    
    const matchesPrice = priceRange === "all" ||
                        (priceRange === "under-25" && coffee.price < 25) ||
                        (priceRange === "25-30" && coffee.price >= 25 && coffee.price <= 30) ||
                        (priceRange === "over-30" && coffee.price > 30);
    
    return matchesSearch && matchesFilter && matchesPrice;
  });

  const allFlavorNotes = [...new Set(coffees.flatMap(coffee => coffee.flavorNotes))];

  return (
    <div className="min-h-screen bg-coffee-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 coffee-text-gradient">Coffee Catalog</h1>
          <p className="text-coffee-700 text-lg">
            Discover premium coffees from artisan roasters around the world
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-coffee-500" />
              <Input
                placeholder="Search coffees, roasters, or flavor notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-coffee-300 focus:border-coffee-500"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40 border-coffee-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Coffees</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 border-coffee-300">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-25">Under $25</SelectItem>
                  <SelectItem value="25-30">$25 - $30</SelectItem>
                  <SelectItem value="over-30">Over $30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-coffee-700 self-center">Popular flavors:</span>
            {allFlavorNotes.slice(0, 8).map((note) => (
              <Badge
                key={note}
                variant="outline"
                className="cursor-pointer hover:bg-coffee-100 border-coffee-300 text-coffee-700"
                onClick={() => setSearchTerm(note)}
              >
                {note}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-coffee-600">
            Showing {filteredCoffees.length} of {coffees.length} coffees
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredCoffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              {...coffee}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredCoffees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-coffee-600 text-lg mb-4">No coffees match your current filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
                setPriceRange("all");
              }}
              className="border-coffee-300 text-coffee-700 hover:bg-coffee-50"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeCatalog;
