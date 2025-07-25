import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/marketplace/CartProvider';
import { 
  ShoppingCart, 
  User, 
  Store, 
  Search, 
  Package, 
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const location = useLocation();
  const cartCount = getItemCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              FreshMarket
            </span>
          </Link>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              {user.role === 'vendor' && (
                <>
                  <Link
                    to="/marketplace"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/marketplace') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Search className="w-4 h-4 inline mr-2" />
                    Browse Products
                  </Link>
                  <Link
                    to="/orders"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/orders') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Package className="w-4 h-4 inline mr-2" />
                    My Orders
                  </Link>
                </>
              )}
              
              {user.role === 'seller' && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/products"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive('/products') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    My Products
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Cart (Vendors only) */}
                {user.role === 'vendor' && (
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="w-5 h-5" />
                      {cartCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )}

                {/* Notifications */}
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>

                {/* Profile */}
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>

                {/* Logout */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout}
                  className="text-destructive hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};