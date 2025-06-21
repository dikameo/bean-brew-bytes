
import { Coffee, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-600" />
            <span className="text-2xl font-bold coffee-text-gradient">
              Bean Brew Bytes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/catalog"
              className="text-coffee-700 hover:text-coffee-900 transition-colors"
            >
              Coffee Catalog
            </Link>
            <Link
              to="/roaster"
              className="text-coffee-700 hover:text-coffee-900 transition-colors"
            >
              For Roasters
            </Link>
            <Link
              to="/buyer"
              className="text-coffee-700 hover:text-coffee-900 transition-colors"
            >
              For Buyers
            </Link>
            <Link
              to="/admin"
              className="text-coffee-700 hover:text-coffee-900 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-coffee-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/catalog"
                className="text-coffee-700 hover:text-coffee-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Coffee Catalog
              </Link>
              <Link
                to="/roaster"
                className="text-coffee-700 hover:text-coffee-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                For Roasters
              </Link>
              <Link
                to="/buyer"
                className="text-coffee-700 hover:text-coffee-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                For Buyers
              </Link>
              <Link
                to="/admin"
                className="text-coffee-700 hover:text-coffee-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
