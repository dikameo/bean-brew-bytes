
import { Coffee, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const cartItemCount = getItemCount();

  return (
    <header className="bg-white shadow-sm border-b border-coffee-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-600" />
            <span className="text-xl font-bold coffee-text-gradient">Roasty</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="text-coffee-700 hover:text-coffee-900 transition-colors">
              Browse Coffee
            </Link>
            {userRole && (
              <>
                <Link to="/dashboard" className="text-coffee-700 hover:text-coffee-900 transition-colors">
                  Dashboard
                </Link>
                <Link to="/orders" className="text-coffee-700 hover:text-coffee-900 transition-colors">
                  Orders
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/catalog" className="relative">
              <Button variant="ghost" size="icon" className="text-coffee-600 hover:text-coffee-800">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-coffee-600 hover:bg-coffee-600"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {userRole ? (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-coffee-300 text-coffee-700 capitalize">
                  {userRole}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-coffee-600 hover:text-coffee-800"
                  onClick={handleLogout}
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="coffee-gradient">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-coffee-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-coffee-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/catalog" 
                className="text-coffee-700 hover:text-coffee-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  Browse Coffee
                  {cartItemCount > 0 && (
                    <Badge className="bg-coffee-600 hover:bg-coffee-600">
                      {cartItemCount}
                    </Badge>
                  )}
                </div>
              </Link>
              {userRole && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-coffee-700 hover:text-coffee-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/orders" 
                    className="text-coffee-700 hover:text-coffee-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </>
              )}
              {userRole ? (
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-coffee-300 text-coffee-700 capitalize">
                    {userRole}
                  </Badge>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="coffee-gradient w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
