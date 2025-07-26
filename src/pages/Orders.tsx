import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/components/auth/AuthProvider';
import { Package, ChevronDown, ChevronUp, Calendar, CreditCard, MapPin, Star, Clock, CheckCircle, Truck, Home } from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  unit: string;
  quality: 'gold' | 'verified' | 'standard';
  rating?: number;
}

interface OrderStatus {
  status: string;
  timestamp: Date;
  description: string;
}

interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  deliveryAddress: string;
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered';
  statuses: OrderStatus[];
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem(`vendor_orders_${user?.id}`);
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      // Convert date strings back to Date objects
      const ordersWithDates = parsedOrders.map((order: any) => ({
        ...order,
        date: new Date(order.date),
        statuses: order.statuses.map((status: any) => ({
          ...status,
          timestamp: new Date(status.timestamp)
        }))
      }));
      setOrders(ordersWithDates);
    } else {
      // Mock orders for demonstration
      const mockOrders: Order[] = [
        {
          id: 'ORD-2024-001',
          date: new Date('2024-01-15'),
          items: [
            {
              id: '1',
              title: 'Premium Organic Tomatoes',
              quantity: 5,
              price: 50,
              unit: 'kg',
              quality: 'gold',
              rating: 4.8
            },
            {
              id: '2',
              title: 'Fresh Green Onions',
              quantity: 2,
              price: 30,
              unit: 'kg',
              quality: 'verified',
              rating: 4.2
            }
          ],
          total: 310,
          paymentMethod: 'Credit Card',
          deliveryAddress: 'Shop 12, Food Street, Mumbai',
          status: 'delivered',
          statuses: [
            {
              status: 'Order Placed',
              timestamp: new Date('2024-01-15T10:30:00'),
              description: 'Your order has been successfully placed'
            },
            {
              status: 'Order Confirmed',
              timestamp: new Date('2024-01-15T11:15:00'),
              description: 'Seller has confirmed your order'
            },
            {
              status: 'Reached Nearest Godown',
              timestamp: new Date('2024-01-16T09:00:00'),
              description: 'Items have arrived at the local distribution center'
            },
            {
              status: 'Delivered',
              timestamp: new Date('2024-01-16T14:30:00'),
              description: 'Order has been successfully delivered'
            }
          ]
        },
        {
          id: 'ORD-2024-002',
          date: new Date('2024-01-18'),
          items: [
            {
              id: '3',
              title: 'Instant Noodles Bulk Pack',
              quantity: 3,
              price: 375,
              unit: 'pieces',
              quality: 'gold',
              rating: 4.4
            }
          ],
          total: 1125,
          paymentMethod: 'UPI',
          deliveryAddress: 'Stall 5, Night Market, Pune',
          status: 'shipped',
          statuses: [
            {
              status: 'Order Placed',
              timestamp: new Date('2024-01-18T15:20:00'),
              description: 'Your order has been successfully placed'
            },
            {
              status: 'Order Confirmed',
              timestamp: new Date('2024-01-18T16:45:00'),
              description: 'Seller has confirmed your order'
            },
            {
              status: 'Reached Nearest Godown',
              timestamp: new Date('2024-01-19T08:30:00'),
              description: 'Items have arrived at the local distribution center'
            }
          ]
        }
      ];
      setOrders(mockOrders);
      // Save mock orders
      localStorage.setItem(`vendor_orders_${user?.id}`, JSON.stringify(mockOrders));
    }
  }, [user]);

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <Package className="w-4 h-4" />;
      case 'order confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'reached nearest godown':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Home className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (index: number, totalStatuses: number) => {
    return index < totalStatuses ? 'text-primary' : 'text-muted-foreground';
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">In Transit</Badge>;
      case 'confirmed':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Confirmed</Badge>;
      case 'placed':
        return <Badge variant="outline">Placed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getQualityBadge = (quality: string, rating?: number) => {
    switch (quality) {
      case 'gold':
        return (
          <Badge variant="secondary" className="quality-gold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Golden Star
          </Badge>
        );
      case 'verified':
        return (
          <Badge variant="secondary" className="quality-verified">
            <Star className="w-3 h-3 mr-1" />
            {rating} ★
          </Badge>
        );
      default:
        return rating ? (
          <Badge variant="outline">
            {rating} ★
          </Badge>
        ) : null;
    }
  };

  const sortedOrders = orders.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-muted-foreground">
          Track and manage all your order history
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {sortedOrders.map((order) => (
          <Card key={order.id} className="glass border-border/50 hover-glow overflow-hidden">
            <Collapsible
              open={expandedOrders.has(order.id)}
              onOpenChange={() => toggleOrderExpansion(order.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(order.date, 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-1" />
                            {order.paymentMethod}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{order.total}</div>
                        <div className="text-sm text-muted-foreground">{order.items.length} items</div>
                      </div>
                      {getOrderStatusBadge(order.status)}
                      {expandedOrders.has(order.id) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0 pb-6">
                  {/* Delivery Address */}
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Delivery to: {order.deliveryAddress}</span>
                  </div>

                  {/* Order Items */}
                  <div className="mb-8">
                    <h4 className="font-semibold mb-4">Items Ordered</h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h5 className="font-medium">{item.title}</h5>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} {item.unit}
                                </span>
                                {getQualityBadge(item.quality, item.rating)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">₹{item.price * item.quantity}</div>
                            <div className="text-sm text-muted-foreground">₹{item.price} per {item.unit}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-4">Order Status Timeline</h4>
                    <div className="space-y-4">
                      {order.statuses.map((status, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`mt-1 ${getStatusColor(index, order.statuses.length)}`}>
                            {getStatusIcon(status.status)}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${getStatusColor(index, order.statuses.length)}`}>
                              {status.status}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {status.description}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {format(status.timestamp, 'MMM dd, yyyy - hh:mm a')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="default" className="flex-1">
                      Buy Again
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* No Orders */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Button>
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;