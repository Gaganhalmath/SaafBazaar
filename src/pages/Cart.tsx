import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/components/marketplace/CartProvider';
import { Trash2, Plus, Minus, ShoppingBag, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const getQualityBadge = (quality: string, rating: number) => {
    switch (quality) {
      case 'gold':
        return (
          <Badge variant="secondary" className="quality-gold text-xs">
            Golden Star
          </Badge>
        );
      case 'verified':
        return (
          <Badge variant="secondary" className="quality-verified text-xs">
            {rating} ★
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {rating} ★
          </Badge>
        );
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/marketplace">
            <Button variant="hero" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={clearCart}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id} className="glass border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          by {item.product.sellerName}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.product.location}
                        </p>
                        {getQualityBadge(item.product.quality, item.product.rating)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-destructive hover:text-destructive flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 bg-muted/20 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {item.product.unit}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          ₹{item.selectedPrice} per {item.product.unit}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₹{(item.selectedPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="glass border-border/50 sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items Breakdown */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate pr-2">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{(item.selectedPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-border/50" />

              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
              </div>

              {/* Delivery */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-success">Free</span>
              </div>

              <hr className="border-border/50" />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{getTotalPrice().toLocaleString()}</span>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout" className="block">
                <Button variant="hero" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Continue Shopping */}
              <Link to="/marketplace" className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;