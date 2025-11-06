import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/hooks/useTheme"; 

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, toggleTheme } = useTheme(); 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="text-2xl font-bold tracking-tight">
              SENDO ATELIER
            </Link>
            <nav className="hidden lg:flex gap-6">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-accent">
                Home
              </Link>
              <Link to="/shop" className="text-sm font-medium transition-colors hover:text-accent">
                Shop
              </Link>
              <Link to="/categories" className="text-sm font-medium transition-colors hover:text-accent">
                Categories
              </Link>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-accent">
                About
              </Link>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search bar (hidden on mobile) */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 w-64"
              />
            </div>

            {/* Dark/Light toggle button */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* User */}
            {/* <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button> */}

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
