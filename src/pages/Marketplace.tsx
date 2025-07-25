import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCart, Product } from '@/components/marketplace/CartProvider';
import { Search, Star, MapPin, Filter, ShoppingCart, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Organic Tomatoes',
    description: 'Fresh, juicy tomatoes from organic farms. Perfect for cooking and salads.',
    price: { min: 40, max: 60 },
    location: 'Mumbai, Maharashtra',
    sellerId: 'seller1',
    sellerName: 'Green Valley Farms',
    image: '/api/placeholder/300/200',
    quality: 'gold',
    rating: 4.8,
    category: 'vegetable',
    unit: 'kg'
  },
  {
    id: '2',
    title: 'Red Brand Spice Pack',
    description: 'Premium quality spice mix in sealed packaging. Various flavors available.',
    price: { min: 150, max: 200 },
    location: 'Delhi, NCR',
    sellerId: 'seller2',
    sellerName: 'Spice Masters',
    image: '/api/placeholder/300/200',
    quality: 'gold',
    rating: 4.6,
    category: 'packaged',
    unit: 'pieces'
  },
  {
    id: '3',
    title: 'Fresh Green Onions',
    description: 'Farm fresh green onions, perfect for garnishing and cooking.',
    price: { min: 20, max: 35 },
    location: 'Pune, Maharashtra',
    sellerId: 'seller3',
    sellerName: 'Local Farm Co-op',
    image: '/api/placeholder/300/200',
    quality: 'verified',
    rating: 4.2,
    category: 'vegetable',
    unit: 'kg'
  },
  {
    id: '4',
    title: 'Instant Noodles Bulk Pack',
    description: 'Popular instant noodles in bulk packaging. Great for quick meals.',
    price: { min: 300, max: 450 },
    location: 'Mumbai, Maharashtra',
    sellerId: 'seller4',
    sellerName: 'Food Distributors Ltd',
    image: '/api/placeholder/300/200',
    quality: 'gold',
    rating: 4.4,
    category: 'packaged',
    unit: 'pieces'
  },
  {
    id: '5',
    title: 'Fresh Coriander Leaves',
    description: 'Fresh cilantro leaves, handpicked daily from local farms.',
    price: { min: 15, max: 25 },
    location: 'Nashik, Maharashtra',
    sellerId: 'seller5',
    sellerName: 'Herb Gardens',
    image: '/api/placeholder/300/200',
    quality: 'verified',
    rating: 4.0,
    category: 'vegetable',
    unit: 'kg'
  },
  {
    id: '6',
    title: 'Cooking Oil Multi-Pack',
    description: 'High-quality cooking oil in sealed bottles. Multiple brands available.',
    price: { min: 180, max: 250 },
    location: 'Chennai, Tamil Nadu',
    sellerId: 'seller6',
    sellerName: 'Oil Traders',
    image: '/api/placeholder/300/200',
    quality: 'gold',
    rating: 4.7,
    category: 'packaged',
    unit: 'pieces'
  }
];

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterQuality, setFilterQuality] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  
  const { addToCart } = useCart();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesQuality = filterQuality === 'all' || product.quality === filterQuality;
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesPrice = product.price.min <= priceRange[1] && product.price.max >= priceRange[0];
      
      return matchesSearch && matchesQuality && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price.min - b.price.min);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price.max - a.price.max);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, filterQuality, filterCategory, priceRange]);

  const handleAddToCart = (product: Product) => {
    const quantity = selectedQuantities[product.id] || 1;
    const selectedPrice = Math.round((product.price.min + product.price.max) / 2); // Average price
    addToCart(product, quantity, selectedPrice);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: Math.max(1, quantity) }));
  };

  const getQualityBadge = (quality: string, rating: number) => {
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
        return (
          <Badge variant="outline">
            {rating} ★
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Marketplace
        </h1>
        <p className="text-muted-foreground">
          Find quality raw materials from verified wholesale sellers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Button */}
        <Button variant="outline" className="justify-start">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      <Card className="glass border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quality Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quality</label>
              <Select value={filterQuality} onValueChange={setFilterQuality}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quality</SelectItem>
                  <SelectItem value="gold">Golden Star</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vegetable">Vegetables</SelectItem>
                  <SelectItem value="packaged">Packaged Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={0}
                step={10}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="glass border-border/50 hover-glow overflow-hidden">
            <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <CardContent className="p-6">
              {/* Product Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                {getQualityBadge(product.quality, product.rating)}
              </div>

              {/* Location and Seller */}
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{product.location}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                by {product.sellerName}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-primary">
                  ₹{product.price.min}-{product.price.max}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  per {product.unit}
                </span>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center space-x-3 mb-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product.id, (selectedQuantities[product.id] || 1) - 1)}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">
                    {selectedQuantities[product.id] || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product.id, (selectedQuantities[product.id] || 1) + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {product.unit}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                className="w-full" 
                onClick={() => handleAddToCart(product)}
                variant="default"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
