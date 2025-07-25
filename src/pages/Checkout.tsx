import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/components/marketplace/CartProvider';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, Truck, Loader2, CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    // Validate payment details
    if (paymentMethod === 'upi' && !upiId) {
      toast({
        title: "Error",
        description: "Please enter your UPI ID",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      toast({
        title: "Error",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    setShowConfirmation(true);
  };

  const confirmOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order ID
    const orderId = `ORD${Date.now()}`;
    
    // Store order in localStorage (in real app, this would be sent to backend)
    const order = {
      id: orderId,
      items: items,
      total: getTotalPrice(),
      paymentMethod,
      status: 'placed',
      createdAt: new Date().toISOString(),
      userId: user?.id
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));
    
    clearCart();
    setIsProcessing(false);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderId} has been confirmed`,
    });
    
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your order and payment details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Details */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={user?.name || ''} className="bg-background/50" readOnly />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={user?.location || ''} className="bg-background/50" readOnly />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input value={user?.phone || ''} placeholder="Enter phone number" className="bg-background/50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* UPI */}
                  <div className="flex items-center space-x-3 p-4 border border-border/50 rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">UPI Payment</p>
                        <p className="text-sm text-muted-foreground">Pay using UPI ID</p>
                      </div>
                    </Label>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="ml-8 space-y-2">
                      <Label>UPI ID</Label>
                      <Input
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  )}

                  {/* Credit/Debit Card */}
                  <div className="flex items-center space-x-3 p-4 border border-border/50 rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                      </div>
                    </Label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="ml-8 space-y-4">
                      <div>
                        <Label>Cardholder Name</Label>
                        <Input
                          placeholder="Name on card"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-background/50"
                        />
                      </div>
                      <div>
                        <Label>Card Number</Label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                          className="bg-background/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <Input
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  <div className="flex items-center space-x-3 p-4 border border-border/50 rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="glass border-border/50 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} {item.product.unit} × ₹{item.selectedPrice}
                        </p>
                      </div>
                      <p className="font-medium text-sm">
                        ₹{(item.selectedPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="border-border/50" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span>₹0</span>
                  </div>
                </div>

                <hr className="border-border/50" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{getTotalPrice().toLocaleString()}</span>
                </div>

                {/* Place Order Button */}
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="glass border-border/50 w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  Confirm Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Are you sure you want to place this order for ₹{getTotalPrice().toLocaleString()}?
                </p>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowConfirmation(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="hero"
                    className="flex-1"
                    onClick={confirmOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Order'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;