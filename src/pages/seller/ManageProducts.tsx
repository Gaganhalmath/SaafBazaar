import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/components/auth/AuthProvider';
import { Product } from '@/components/marketplace/CartProvider';
import { Search, Star, MapPin, Edit, Trash2, Plus, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ManageProducts: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem(`seller_products_${user?.id}`);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Mock initial products for demonstration
      const mockProducts: Product[] = [
        {
          id: '1',
          title: 'Premium Organic Tomatoes',
          description: 'Fresh, juicy tomatoes from organic farms. Perfect for cooking and salads.',
          price: { min: 40, max: 60 },
          location: 'Mumbai, Maharashtra',
          sellerId: user?.id || 'seller1',
          sellerName: user?.name || 'Your Business',
          image: '/api/placeholder/300/200',
          quality: 'gold' as const,
          rating: 4.8,
          category: 'vegetable' as const,
          unit: 'kg'
        },
        {
          id: '2',
          title: 'Fresh Green Onions',
          description: 'Farm fresh green onions, perfect for garnishing and cooking.',
          price: { min: 20, max: 35 },
          location: 'Mumbai, Maharashtra',
          sellerId: user?.id || 'seller1',
          sellerName: user?.name || 'Your Business',
          image: '/api/placeholder/300/200',
          quality: 'verified' as const,
          rating: 4.2,
          category: 'vegetable' as const,
          unit: 'kg'
        }
      ];
      setProducts(mockProducts);
      localStorage.setItem(`seller_products_${user?.id}`, JSON.stringify(mockProducts));
    }
  }, [user]);

  // Save products to localStorage
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem(`seller_products_${user?.id}`, JSON.stringify(updatedProducts));
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData(e.currentTarget);
    const updatedProduct: Product = {
      ...editingProduct,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: {
        min: parseInt(formData.get('minPrice') as string),
        max: parseInt(formData.get('maxPrice') as string)
      },
      category: formData.get('category') as 'vegetable' | 'packaged',
      quality: formData.get('quality') as 'gold' | 'verified' | 'standard'
    };

    const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    saveProducts(updatedProducts);
    setEditingProduct(null);
    toast({
      title: "Product updated",
      description: "Your product has been successfully updated.",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    saveProducts(updatedProducts);
    toast({
      title: "Product deleted",
      description: "Your product has been successfully deleted.",
    });
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: {
        min: parseInt(formData.get('minPrice') as string),
        max: parseInt(formData.get('maxPrice') as string)
      },
      location: 'Mumbai, Maharashtra',
      sellerId: user?.id || 'seller1',
      sellerName: user?.name || 'Your Business',
      image: '/api/placeholder/300/200',
      quality: formData.get('quality') as 'gold' | 'verified' | 'standard',
      rating: 4.0,
      category: formData.get('category') as 'vegetable' | 'packaged',
      unit: formData.get('unit') as 'kg' | 'pieces'
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setIsAddDialogOpen(false);
    toast({
      title: "Product added",
      description: "Your new product has been successfully added.",
    });
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Manage Products
          </h1>
          <p className="text-muted-foreground">
            View and manage all your listed products
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Product Title</label>
                <Input name="title" placeholder="Enter product title" required />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea name="description" placeholder="Describe your product" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Min Price (₹)</label>
                  <Input name="minPrice" type="number" placeholder="40" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Price (₹)</label>
                  <Input name="maxPrice" type="number" placeholder="60" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetable">Vegetables</SelectItem>
                      <SelectItem value="packaged">Packaged Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <Select name="unit" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="pieces">pieces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Quality</label>
                <Select name="quality" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold">Golden Star</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Add Product</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search your products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-background/50">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="vegetable">Vegetables</SelectItem>
            <SelectItem value="packaged">Packaged Goods</SelectItem>
          </SelectContent>
        </Select>
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

              {/* Location */}
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{product.location}</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-primary">
                  ₹{product.price.min}-{product.price.max}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  per {product.unit}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  {editingProduct && (
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveEdit} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Product Title</label>
                          <Input name="title" defaultValue={editingProduct.title} required />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Textarea name="description" defaultValue={editingProduct.description} required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Min Price (₹)</label>
                            <Input name="minPrice" type="number" defaultValue={editingProduct.price.min} required />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Max Price (₹)</label>
                            <Input name="maxPrice" type="number" defaultValue={editingProduct.price.max} required />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Category</label>
                            <Select name="category" defaultValue={editingProduct.category}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vegetable">Vegetables</SelectItem>
                                <SelectItem value="packaged">Packaged Goods</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Quality</label>
                            <Select name="quality" defaultValue={editingProduct.quality}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gold">Golden Star</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button type="submit" className="flex-1">Save Changes</Button>
                          <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{product.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {products.length === 0 ? 'No products yet' : 'No products found'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {products.length === 0 
              ? 'Start by adding your first product to the marketplace'
              : 'Try adjusting your search or filter criteria'
            }
          </p>
          {products.length === 0 && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;