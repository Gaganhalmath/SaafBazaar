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
		unit: 'kg',
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
		unit: 'pieces',
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
		unit: 'kg',
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
		unit: 'pieces',
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
		unit: 'kg',
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
		unit: 'pieces',
	},
	// --- 50 more random mock products below ---
	{
		id: '7',
		title: 'Street Style Pav Bhaji Masala',
		description: 'Signature spice blend for authentic Mumbai pav bhaji.',
		price: { min: 60, max: 90 },
		location: 'Mumbai, Maharashtra',
		sellerId: 'seller7',
		sellerName: 'Spice Street',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.5,
		category: 'packaged',
		unit: 'packets',
	},
	{
		id: '8',
		title: '5-Star Hotel Truffle Oil',
		description: 'Imported truffle oil for gourmet dishes in luxury hotels.',
		price: { min: 1200, max: 1800 },
		location: 'Bangalore, Karnataka',
		sellerId: 'seller8',
		sellerName: 'Gourmet Imports',
		image: '/api/placeholder/300/200',
		quality: 'gold',
		rating: 4.9,
		category: 'packaged',
		unit: 'bottles',
	},
	{
		id: '9',
		title: 'Fresh Mint Leaves',
		description: 'Aromatic mint leaves for chutneys and mojitos.',
		price: { min: 10, max: 20 },
		location: 'Lucknow, Uttar Pradesh',
		sellerId: 'seller9',
		sellerName: 'Herb Fresh',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.3,
		category: 'vegetable',
		unit: 'bunches',
	},
	{
		id: '10',
		title: 'Paneer Cubes',
		description: 'Soft paneer cubes for curries and snacks.',
		price: { min: 180, max: 250 },
		location: 'Delhi, NCR',
		sellerId: 'seller10',
		sellerName: 'Dairy Best',
		image: '/api/placeholder/300/200',
		quality: 'gold',
		rating: 4.7,
		category: 'packaged',
		unit: 'kg',
	},
	{
		id: '11',
		title: 'Street Vendor Samosa Sheets',
		description: 'Ready-to-use samosa sheets for quick frying.',
		price: { min: 50, max: 80 },
		location: 'Ahmedabad, Gujarat',
		sellerId: 'seller11',
		sellerName: 'Snack Supplies',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.1,
		category: 'packaged',
		unit: 'packets',
	},
	{
		id: '12',
		title: 'Exotic Microgreens',
		description: 'Premium microgreens for 5-star hotel salads and garnishes.',
		price: { min: 400, max: 600 },
		location: 'Hyderabad, Telangana',
		sellerId: 'seller12',
		sellerName: 'Urban Greens',
		image: '/api/placeholder/300/200',
		quality: 'gold',
		rating: 4.8,
		category: 'vegetable',
		unit: 'trays',
	},
	{
		id: '13',
		title: 'Street Chutney Mix',
		description: 'Tangy chutney powder for street-side chaats.',
		price: { min: 30, max: 50 },
		location: 'Indore, Madhya Pradesh',
		sellerId: 'seller13',
		sellerName: 'Chaat Bazaar',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.2,
		category: 'packaged',
		unit: 'packets',
	},
	{
		id: '14',
		title: 'Premium Basmati Rice',
		description: 'Long-grain basmati rice for biryanis in hotels and restaurants.',
		price: { min: 90, max: 140 },
		location: 'Amritsar, Punjab',
		sellerId: 'seller14',
		sellerName: 'Rice Traders',
		image: '/api/placeholder/300/200',
		quality: 'gold',
		rating: 4.7,
		category: 'packaged',
		unit: 'kg',
	},
	{
		id: '15',
		title: 'Street Vendor Chana Masala',
		description: 'Classic chana masala blend for street-side chole.',
		price: { min: 45, max: 70 },
		location: 'Kanpur, Uttar Pradesh',
		sellerId: 'seller15',
		sellerName: 'Masala House',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.0,
		category: 'packaged',
		unit: 'packets',
	},
	{
		id: '16',
		title: 'Imported Parmesan Cheese',
		description: 'Aged parmesan cheese for gourmet Italian dishes.',
		price: { min: 900, max: 1200 },
		location: 'Mumbai, Maharashtra',
		sellerId: 'seller16',
		sellerName: 'Cheese World',
		image: '/api/placeholder/300/200',
		quality: 'gold',
		rating: 4.9,
		category: 'packaged',
		unit: 'kg',
	},
	{
		id: '17',
		title: 'Fresh Ginger',
		description: 'Aromatic ginger root for curries and teas.',
		price: { min: 30, max: 50 },
		location: 'Kochi, Kerala',
		sellerId: 'seller17',
		sellerName: 'Spice Roots',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.3,
		category: 'vegetable',
		unit: 'kg',
	},
	{
		id: '18',
		title: 'Street Vendor Pav Buns',
		description: 'Soft pav buns for vada pav and misal pav.',
		price: { min: 25, max: 40 },
		location: 'Mumbai, Maharashtra',
		sellerId: 'seller18',
		sellerName: 'Bakery Fresh',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.1,
		category: 'packaged',
		unit: 'pieces',
	},
	{
		id: '19',
		title: 'Exotic Saffron',
		description: 'Premium saffron strands for desserts and biryanis.',
		price: { min: 350, max: 500 },
		location: 'Srinagar, Jammu & Kashmir',
		sellerId: 'seller19',
		sellerName: 'Spice Valley',
		image: '/api/placeholder/300/200',
		quality: 'gold',
		rating: 4.8,
		category: 'packaged',
		unit: 'grams',
	},
	{
		id: '20',
		title: 'Fresh Lemons',
		description: 'Juicy lemons for street-side lemonade and hotel kitchens.',
		price: { min: 20, max: 35 },
		location: 'Nagpur, Maharashtra',
		sellerId: 'seller20',
		sellerName: 'Citrus Farms',
		image: '/api/placeholder/300/200',
		quality: 'verified',
		rating: 4.2,
		category: 'vegetable',
		unit: 'kg',
	},
{
	id: '21', title: 'Fresh Baby Corn', description: 'Crisp baby corn for stir fries and salads.', price: { min: 60, max: 90 }, location: 'Bengaluru, Karnataka', sellerId: 'seller21', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.4, category: 'vegetable', unit: 'kg',
  },
  {
	id: '22', title: 'Hotel Grade Olive Oil', description: 'Imported olive oil for 5-star hotel kitchens.', price: { min: 800, max: 1200 }, location: 'Chennai, Tamil Nadu', sellerId: 'seller22', sellerName: 'Oil World', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.8, category: 'packaged', unit: 'bottles',
  },
  {
	id: '23', title: 'Street Vendor Jalebi Mix', description: 'Ready-to-cook jalebi mix for sweet shops and vendors.', price: { min: 40, max: 60 }, location: 'Indore, Madhya Pradesh', sellerId: 'seller23', sellerName: 'Sweet Treats', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'packaged', unit: 'packets',
  },
  {
	id: '24', title: 'Exotic Mushrooms', description: 'Button and shiitake mushrooms for gourmet dishes.', price: { min: 200, max: 350 }, location: 'Shimla, Himachal Pradesh', sellerId: 'seller24', sellerName: 'Himalayan Farms', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.7, category: 'vegetable', unit: 'kg',
  },
  {
	id: '25', title: 'Street Vendor Chutney Pack', description: 'Assorted chutney packs for street-side snacks.', price: { min: 30, max: 50 }, location: 'Kolkata, West Bengal', sellerId: 'seller25', sellerName: 'Chutney House', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.1, category: 'packaged', unit: 'packets',
  },
  {
	id: '26', title: 'Premium Cashew Nuts', description: 'Whole cashew nuts for hotels and bakeries.', price: { min: 700, max: 950 }, location: 'Goa', sellerId: 'seller26', sellerName: 'Nut Traders', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.9, category: 'packaged', unit: 'kg',
  },
  {
	id: '27', title: 'Fresh Spinach Bunch', description: 'Green spinach bunches for healthy meals.', price: { min: 20, max: 35 }, location: 'Lucknow, Uttar Pradesh', sellerId: 'seller27', sellerName: 'Leafy Greens', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.3, category: 'vegetable', unit: 'bunches',
  },
  {
	id: '28', title: 'Hotel Butter Packets', description: 'Butter packets for hotels and restaurants.', price: { min: 250, max: 350 }, location: 'Delhi, NCR', sellerId: 'seller28', sellerName: 'Dairy Best', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.7, category: 'packaged', unit: 'packets',
  },
  {
	id: '29', title: 'Street Vendor Chole Bhature Mix', description: 'Ready-to-cook chole bhature mix for vendors.', price: { min: 60, max: 90 }, location: 'Amritsar, Punjab', sellerId: 'seller29', sellerName: 'Spice Masters', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'packaged', unit: 'packets',
  },
  {
	id: '30', title: 'Fresh Carrots', description: 'Crunchy carrots for salads and cooking.', price: { min: 25, max: 40 }, location: 'Jaipur, Rajasthan', sellerId: 'seller30', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.1, category: 'vegetable', unit: 'kg',
  },
  {
	id: '31', title: 'Fresh Red Chillies', description: 'Spicy red chillies for curries and pickles.', price: { min: 50, max: 80 }, location: 'Guntur, Andhra Pradesh', sellerId: 'seller31', sellerName: 'Spice Valley', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.5, category: 'vegetable', unit: 'kg',
  },
  {
	id: '32', title: 'Hotel Grade Pasta', description: 'Premium pasta for hotels and restaurants.', price: { min: 120, max: 180 }, location: 'Delhi, NCR', sellerId: 'seller32', sellerName: 'Pasta World', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.7, category: 'packaged', unit: 'packets',
  },
  {
	id: '33', title: 'Fresh Green Peas', description: 'Sweet green peas for curries and salads.', price: { min: 40, max: 70 }, location: 'Agra, Uttar Pradesh', sellerId: 'seller33', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.3, category: 'vegetable', unit: 'kg',
  },
  {
	id: '34', title: 'Premium Almonds', description: 'Whole almonds for hotels and bakeries.', price: { min: 800, max: 1100 }, location: 'Kashmir', sellerId: 'seller34', sellerName: 'Nut Traders', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.8, category: 'packaged', unit: 'kg',
  },
  {
	id: '35', title: 'Street Vendor Dosa Batter', description: 'Ready-to-cook dosa batter for vendors.', price: { min: 60, max: 100 }, location: 'Chennai, Tamil Nadu', sellerId: 'seller35', sellerName: 'Batter House', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'packaged', unit: 'packets',
  },
  {
	id: '36', title: 'Fresh Broccoli', description: 'Green broccoli for salads and continental dishes.', price: { min: 80, max: 120 }, location: 'Ooty, Tamil Nadu', sellerId: 'seller36', sellerName: 'Hill Farms', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.6, category: 'vegetable', unit: 'kg',
  },
  {
	id: '37', title: 'Hotel Grade Mayonnaise', description: 'Creamy mayonnaise for hotels and restaurants.', price: { min: 150, max: 220 }, location: 'Mumbai, Maharashtra', sellerId: 'seller37', sellerName: 'Sauce World', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.7, category: 'packaged', unit: 'bottles',
  },
  {
	id: '38', title: 'Fresh Cauliflower', description: 'Farm fresh cauliflower for curries and snacks.', price: { min: 30, max: 55 }, location: 'Patna, Bihar', sellerId: 'seller38', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'vegetable', unit: 'kg',
  },
  {
	id: '39', title: 'Premium Walnuts', description: 'Whole walnuts for hotels and bakeries.', price: { min: 900, max: 1300 }, location: 'Kashmir', sellerId: 'seller39', sellerName: 'Nut Traders', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.9, category: 'packaged', unit: 'kg',
  },
  {
	id: '40', title: 'Street Vendor Idli Mix', description: 'Ready-to-cook idli mix for vendors.', price: { min: 50, max: 80 }, location: 'Chennai, Tamil Nadu', sellerId: 'seller40', sellerName: 'Batter House', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.3, category: 'packaged', unit: 'packets',
  },
  {
	id: '41', title: 'Fresh Cabbage', description: 'Farm fresh cabbage for salads and curries.', price: { min: 20, max: 35 }, location: 'Kolkata, West Bengal', sellerId: 'seller41', sellerName: 'Leafy Greens', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.1, category: 'vegetable', unit: 'kg',
  },
  {
	id: '42', title: 'Hotel Grade Tomato Ketchup', description: 'Tomato ketchup for hotels and restaurants.', price: { min: 90, max: 140 }, location: 'Delhi, NCR', sellerId: 'seller42', sellerName: 'Sauce World', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.8, category: 'packaged', unit: 'bottles',
  },
  {
	id: '43', title: 'Fresh Beans', description: 'Green beans for curries and salads.', price: { min: 40, max: 70 }, location: 'Bengaluru, Karnataka', sellerId: 'seller43', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'vegetable', unit: 'kg',
  },
  {
	id: '44', title: 'Premium Raisins', description: 'Sweet raisins for hotels and bakeries.', price: { min: 300, max: 500 }, location: 'Nashik, Maharashtra', sellerId: 'seller44', sellerName: 'Nut Traders', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.7, category: 'packaged', unit: 'kg',
  },
  {
	id: '45', title: 'Street Vendor Vada Mix', description: 'Ready-to-cook vada mix for vendors.', price: { min: 60, max: 90 }, location: 'Hyderabad, Telangana', sellerId: 'seller45', sellerName: 'Batter House', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.1, category: 'packaged', unit: 'packets',
  },
  {
	id: '46', title: 'Fresh Pumpkin', description: 'Farm fresh pumpkin for curries and desserts.', price: { min: 25, max: 45 }, location: 'Ahmedabad, Gujarat', sellerId: 'seller46', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.0, category: 'vegetable', unit: 'kg',
  },
  {
	id: '47', title: 'Hotel Grade Mustard Oil', description: 'Mustard oil for hotels and restaurants.', price: { min: 200, max: 300 }, location: 'Kolkata, West Bengal', sellerId: 'seller47', sellerName: 'Oil World', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.6, category: 'packaged', unit: 'bottles',
  },
  {
	id: '48', title: 'Fresh Zucchini', description: 'Green zucchini for salads and continental dishes.', price: { min: 60, max: 100 }, location: 'Pune, Maharashtra', sellerId: 'seller48', sellerName: 'Hill Farms', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.5, category: 'vegetable', unit: 'kg',
  },
  {
	id: '49', title: 'Premium Pistachios', description: 'Whole pistachios for hotels and bakeries.', price: { min: 1200, max: 1600 }, location: 'Rajasthan', sellerId: 'seller49', sellerName: 'Nut Traders', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.9, category: 'packaged', unit: 'kg',
  },
  {
	id: '50', title: 'Street Vendor Upma Mix', description: 'Ready-to-cook upma mix for vendors.', price: { min: 40, max: 70 }, location: 'Bengaluru, Karnataka', sellerId: 'seller50', sellerName: 'Batter House', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'packaged', unit: 'packets',
  },
  {
	id: '51', title: 'Fresh Sweet Corn', description: 'Sweet corn for salads and snacks.', price: { min: 30, max: 55 }, location: 'Patna, Bihar', sellerId: 'seller51', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.3, category: 'vegetable', unit: 'kg',
  },
  {
	id: '52', title: 'Hotel Grade Vinegar', description: 'Vinegar for hotels and restaurants.', price: { min: 60, max: 100 }, location: 'Delhi, NCR', sellerId: 'seller52', sellerName: 'Sauce World', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.7, category: 'packaged', unit: 'bottles',
  },
  {
	id: '53', title: 'Fresh Eggplant', description: 'Farm fresh eggplant for curries and snacks.', price: { min: 20, max: 35 }, location: 'Lucknow, Uttar Pradesh', sellerId: 'seller53', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.1, category: 'vegetable', unit: 'kg',
  },
  {
	id: '54', title: 'Premium Dates', description: 'Sweet dates for hotels and bakeries.', price: { min: 400, max: 700 }, location: 'Gujarat', sellerId: 'seller54', sellerName: 'Nut Traders', image: '/api/placeholder/300/200', quality: 'gold', rating: 4.8, category: 'packaged', unit: 'kg',
  },
  {
	id: '55', title: 'Street Vendor Poha Mix', description: 'Ready-to-cook poha mix for vendors.', price: { min: 30, max: 50 }, location: 'Indore, Madhya Pradesh', sellerId: 'seller55', sellerName: 'Batter House', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.0, category: 'packaged', unit: 'packets',
  },
  {
	id: '56', title: 'Fresh Bottle Gourd', description: 'Farm fresh bottle gourd for curries and snacks.', price: { min: 20, max: 35 }, location: 'Nashik, Maharashtra', sellerId: 'seller56', sellerName: 'Veggie Delight', image: '/api/placeholder/300/200', quality: 'verified', rating: 4.2, category: 'vegetable', unit: 'kg',
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
