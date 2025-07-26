import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  DollarSign, 
  Package, 
  Star, 
  TrendingUp, 
  Download,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface EarningsData {
  totalEarnings: number;
  completedOrders: number;
  averageRating: number;
  monthlyGrowth: number;
  recentEarnings: Array<{
    date: Date;
    amount: number;
    orderId: string;
    customerName: string;
  }>;
}

const EarningsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);

  useEffect(() => {
    // Load earnings data from localStorage or generate mock data
    const savedEarnings = localStorage.getItem(`seller_earnings_${user?.id}`);
    if (savedEarnings) {
      const parsed = JSON.parse(savedEarnings);
      // Convert date strings back to Date objects
      const earningsWithDates = {
        ...parsed,
        recentEarnings: parsed.recentEarnings.map((earning: any) => ({
          ...earning,
          date: new Date(earning.date)
        }))
      };
      setEarningsData(earningsWithDates);
    } else {
      // Mock earnings data
      const mockEarnings: EarningsData = {
        totalEarnings: 45750,
        completedOrders: 127,
        averageRating: 4.6,
        monthlyGrowth: 12.5,
        recentEarnings: [
          {
            date: subDays(new Date(), 1),
            amount: 850,
            orderId: 'ORD-2024-045',
            customerName: 'Raj Food Stall'
          },
          {
            date: subDays(new Date(), 3),
            amount: 1200,
            orderId: 'ORD-2024-044',
            customerName: 'Mumbai Street Kitchen'
          },
          {
            date: subDays(new Date(), 5),
            amount: 675,
            orderId: 'ORD-2024-043',
            customerName: 'Spice Corner'
          },
          {
            date: subDays(new Date(), 7),
            amount: 950,
            orderId: 'ORD-2024-042',
            customerName: 'Fresh Bites Stall'
          },
          {
            date: subDays(new Date(), 10),
            amount: 1375,
            orderId: 'ORD-2024-041',
            customerName: 'Golden Tiffin Center'
          }
        ]
      };
      setEarningsData(mockEarnings);
      localStorage.setItem(`seller_earnings_${user?.id}`, JSON.stringify(mockEarnings));
    }
  }, [user]);

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Request Submitted",
      description: "Your earnings withdrawal request has been submitted. You'll receive the amount within 2-3 business days.",
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Detailed earnings reports will be available soon.",
    });
  };

  if (!earningsData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Earnings Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your earnings and business performance
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleViewDetails}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button variant="default" onClick={handleWithdraw}>
            <Download className="w-4 h-4 mr-2" />
            Withdraw Earnings
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Earnings */}
        <Card className="glass border-border/50 hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹{earningsData.totalEarnings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-green-500">+{earningsData.monthlyGrowth}%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Completed Orders */}
        <Card className="glass border-border/50 hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsData.completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders successfully delivered
            </p>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card className="glass border-border/50 hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{earningsData.averageRating}</div>
              <Badge variant="secondary" className="quality-gold">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Excellent
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Based on customer reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Earnings */}
      <Card className="glass border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Recent Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earningsData.recentEarnings.map((earning, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{earning.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      Order #{earning.orderId}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">₹{earning.amount}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(earning.date, 'MMM dd')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Withdrawal Information */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Withdrawal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Balance:</span>
              <span className="font-semibold text-primary">₹{earningsData.totalEarnings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processing Time:</span>
              <span className="font-medium">2-3 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Withdrawal Fee:</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="pt-2">
              <Button className="w-full" onClick={handleWithdraw}>
                <Download className="w-4 h-4 mr-2" />
                Request Withdrawal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Performance This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Monthly Growth:</span>
              <div className="flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                <span className="font-semibold text-green-500">+{earningsData.monthlyGrowth}%</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Success Rate:</span>
              <span className="font-semibold">96%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="font-semibold">&lt; 2 hours</span>
            </div>
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={handleViewDetails}>
                <Eye className="w-4 h-4 mr-2" />
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EarningsDashboard;