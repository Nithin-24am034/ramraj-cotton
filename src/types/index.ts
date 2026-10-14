export type Brand = 'ramraj' | 'ramyyam';

export type Category =
  | 'dhotis'
  | 'shirts'
  | 'veshti'
  | 'innerwear'
  | 'lungis'
  | 'kurtas'
  | 'combos'
  | 'kids'
  | 'sarees'
  | 'kurtis'
  | 'women-innerwear'
  | 'women-nightwear'
  | 'girls';

export type Occasion = 'wedding' | 'festival' | 'daily' | 'office' | 'puja';
export type BorderType = 'gold-zari' | 'silver-zari' | 'temple' | 'mayilkan' | 'colour' | 'plain';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  location: string;
  verified: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: Brand;
  category: Category;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  shortDescription: string;
  images: string[];
  sizes: string[];
  materials: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  occasion?: Occasion;
  borderType?: BorderType;
  fabric?: string;
  length?: string;
  specialFeature?: string;
  purityBadge?: string;
  specifications?: ProductSpecification[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface FilterState {
  brand?: Brand | 'all';
  category: Category | 'all';
  sizes: string[];
  materials: string[];
  priceRange: [number, number];
  sortBy: SortOption;
  occasion?: Occasion | 'all';
  borderType?: BorderType | 'all';
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'card' | 'upi' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
}

export type Currency = 'INR' | 'USD' | 'AED' | 'SGD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // multiplier from INR (1 INR = X currency)
  label: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  brand: 'ramraj' | 'ramyyam' | 'both';
  city: string;
  state: string;
  address: string;
  landmark: string;
  phone: string;
  timings: string;
  hasParking: boolean;
  isFlagship: boolean;
}

export interface TrackingStep {
  status: string;
  date: string;
  location: string;
  completed: boolean;
  description: string;
}

export interface OrderTrackResult {
  orderId: string;
  estimatedDelivery: string;
  currentStatus: string;
  courier: string;
  trackingNumber: string;
  steps: TrackingStep[];
}
