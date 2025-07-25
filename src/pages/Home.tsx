import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Search, 
  Shield, 
  Truck, 
  Star, 
  ShoppingBag, 
  Store,
  MapPin,
  Clock,
  Users
} from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Search,
      title: "Smart Search & Filters",
      description: "Find exactly what you need with location-based search and quality filters"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Golden Star badges for verified products and transparent quality ratings"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick delivery from local suppliers with real-time order tracking"
    },
    {
      icon: Star,
      title: "Trusted Sellers",
      description: "Work with verified wholesale sellers with proven track records"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "10,000+" },
    { icon: Store, label: "Verified Sellers", value: "500+" },
    { icon: ShoppingBag, label: "Products", value: "50,000+" },
    { icon: MapPin, label: "Cities", value: "25+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Fresh
              </span>
              <span className="text-foreground">Market</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Connecting street food vendors with quality wholesale suppliers. 
              Find, order, and track premium raw materials with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              {!user ? (
                <>
                  <Link to="/register">
                    <Button variant="hero" size="xl" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="xl" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to={user.role === 'vendor' ? '/marketplace' : '/dashboard'}>
                  <Button variant="hero" size="xl">
                    {user.role === 'vendor' ? 'Browse Products' : 'Manage Products'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass text-center border-border/50 hover-glow">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">FreshMarket</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for street food vendors and wholesale suppliers, 
              our platform makes raw material sourcing simple and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-border/50 hover-glow text-center group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Get started in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* For Vendors */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">
                <ShoppingBag className="w-6 h-6 inline mr-2" />
                For Vendors
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: "Sign Up", desc: "Create your vendor account" },
                  { step: 2, title: "Search Products", desc: "Find quality raw materials nearby" },
                  { step: 3, title: "Add to Cart", desc: "Select quantities and add to cart" },
                  { step: 4, title: "Place Order", desc: "Checkout and track your delivery" }
                ].map((item) => (
                  <div key={item.step} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Sellers */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">
                <Store className="w-6 h-6 inline mr-2" />
                For Sellers
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: "Register", desc: "Create your seller account" },
                  { step: 2, title: "List Products", desc: "Upload products with photos and details" },
                  { step: 3, title: "Get Orders", desc: "Receive orders from local vendors" },
                  { step: 4, title: "Fulfill & Earn", desc: "Deliver products and grow your business" }
                ].map((item) => (
                  <div key={item.step} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="glass border-border/50 glow-card">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of vendors and sellers already using FreshMarket to grow their business.
              </p>
              
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button variant="hero" size="xl" className="w-full sm:w-auto">
                      Start Selling
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="xl" className="w-full sm:w-auto">
                      Start Buying
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;