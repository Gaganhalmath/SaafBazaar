import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, Truck, MapPin, Clock, Star } from 'lucide-react';

interface OrderStatus {
  status: string;
  timestamp: string;
  description: string;
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([
    {
      status: 'Order Placed',
      timestamp: new Date().toISOString(),
      description: 'Your order has been confirmed and is being processed'
    }
  ]);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: any) => o.id === orderId);
    setOrder(foundOrder);

    if (foundOrder) {
      // Simulate order progress updates
      const updateStatuses = () => {
        setTimeout(() => {
          setOrderStatuses(prev => [...prev, {
            status: 'Order Confirmed',
            timestamp: new Date(Date.now() + 60000).toISOString(),
            description: 'Seller has confirmed your order'
          }]);
        }, 3000);

        setTimeout(() => {
          setOrderStatuses(prev => [...prev, {
            status: 'Order Reached Nearest Godown',
            timestamp: new Date(Date.now() + 120000).toISOString(),
            description: 'Your order is at the distribution center'
          }]);
        }, 6000);

        setTimeout(() => {
          setOrderStatuses(prev => [...prev, {
            status: 'Out for Delivery',
            timestamp: new Date(Date.now() + 180000).toISOString(),
            description: 'Your order is on the way to you'
          }]);
        }, 9000);
      };

      updateStatuses();
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link to="/marketplace">
            <Button variant="hero">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 glow-primary">
            <CheckCircle className="w-8 h-8 text-success-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground">
            Your order #{orderId} has been confirmed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="capitalize">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Items Ordered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          by {item.product.sellerName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} {item.product.unit}
                        </p>
                        {item.product.quality === 'gold' && (
                          <Badge variant="secondary" className="quality-gold text-xs mt-1">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Golden Star
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.selectedPrice * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Tracking */}
          <div>
            <Card className="glass border-border/50 sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Track Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderStatuses.map((status, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        {index < orderStatuses.length - 1 && (
                          <div className="w-0.5 h-8 bg-primary/30 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{status.status}</span>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-2.5 h-2.5 mr-1" />
                            {new Date(status.timestamp).toLocaleTimeString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {status.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Future statuses */}
                  {orderStatuses.length < 4 && (
                    <div className="flex items-start space-x-3 opacity-50">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 border-2 border-muted rounded-full" />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-sm text-muted-foreground">
                          Delivered
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Order delivered successfully
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Estimated Delivery */}
                <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">Estimated Delivery:</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()} - 
                    {new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3 mt-6">
                  <Link to="/orders" className="block">
                    <Button variant="default" className="w-full">
                      View All Orders
                    </Button>
                  </Link>
                  <Link to="/marketplace" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;