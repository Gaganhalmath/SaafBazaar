import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { Loader2, Store, ShoppingBag } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'vendor' | 'seller'>('vendor');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, role);
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${role}`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 glow-primary">
            <Store className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access the marketplace
          </p>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your account type and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">I am a</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as 'vendor' | 'seller')}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 bg-muted/20 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="vendor" id="vendor" />
                    <Label htmlFor="vendor" className="flex items-center space-x-2 cursor-pointer">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Vendor</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-muted/20 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="flex items-center space-x-2 cursor-pointer">
                      <Store className="w-4 h-4" />
                      <span>Seller</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                  required
                />
              </div>

              {/* Demo Credentials */}
              <div className="bg-muted/20 p-3 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Demo credentials:</p>
                <p className="text-xs">vendor@demo.com / seller@demo.com</p>
                <p className="text-xs">Password: demo123</p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary-glow font-medium hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;