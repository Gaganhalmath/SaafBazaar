import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { CartProvider } from "./components/marketplace/CartProvider";
import { Navigation } from "./components/layout/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import ManageProducts from "./pages/seller/ManageProducts";
import EarningsDashboard from "./pages/seller/EarningsDashboard";

import Profile from "./pages/Profile";
import VendorProfile from "./pages/VendorProfile";
import SellerProfile from "./pages/SellerProfile";
import NotFound from "./pages/NotFound";


import { useAuth } from "./components/auth/AuthProvider";

// ProfileSwitcher component to choose correct profile page
const ProfileSwitcher = () => {
  const { user } = useAuth();
  if (!user) return <Profile />;
  if (user.role === "vendor") return <VendorProfile />;
  if (user.role === "seller") return <SellerProfile />;
  return <Profile />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/seller/products" element={<ManageProducts />} />
                <Route path="/seller/earnings" element={<EarningsDashboard />} />
                <Route path="/profile" element={<ProfileSwitcher />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
