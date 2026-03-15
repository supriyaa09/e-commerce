import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  description: string;
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: number[];
  searchQuery: string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  setSearchQuery: (query: string) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  searchQuery: '',

  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.product.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { product, quantity: 1 }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cart: quantity <= 0
      ? state.cart.filter(item => item.product.id !== productId)
      : state.cart.map(item => item.product.id === productId ? { ...item, quantity } : item)
  })),

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId)
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId]
  })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  cartTotal: () => get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
}));

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Over-Ear Headphones",
    price: 349,
    originalPrice: 399,
    category: "Audio",
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
    ],
    description: "Immerse yourself in studio-quality sound with our flagship wireless headphones. Featuring 40mm custom drivers, adaptive noise cancellation, and 30-hour battery life.",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    title: "Premium Sunglasses",
    price: 189,
    category: "Accessories",
    rating: 4.6,
    reviews: 1203,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    ],
    description: "Handcrafted acetate frames with polarized lenses. UV400 protection meets timeless design.",
    inStock: true,
  },
  {
    id: 3,
    title: "Mechanical Chronograph Watch",
    price: 899,
    originalPrice: 1099,
    category: "Watches",
    rating: 4.9,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    ],
    description: "Swiss-made automatic movement housed in a 42mm titanium case. Sapphire crystal with 100m water resistance.",
    badge: "Limited",
    inStock: true,
  },
  {
    id: 4,
    title: "Leather Minimal Wallet",
    price: 79,
    category: "Accessories",
    rating: 4.7,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    ],
    description: "Full-grain Italian leather with RFID blocking. Slim profile holds 8 cards and cash.",
    inStock: true,
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    price: 149,
    category: "Audio",
    rating: 4.5,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    ],
    description: "360° immersive sound in a waterproof, dust-proof design. 24-hour playtime with USB-C fast charging.",
    inStock: true,
  },
  {
    id: 6,
    title: "Canvas Backpack",
    price: 129,
    category: "Bags",
    rating: 4.4,
    reviews: 967,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    description: "Waxed canvas with vegetable-tanned leather trim. Padded 15\" laptop compartment with organizer pockets.",
    inStock: true,
  },
  {
    id: 7,
    title: "Running Sneakers Pro",
    price: 219,
    originalPrice: 259,
    category: "Footwear",
    rating: 4.7,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    ],
    description: "Engineered mesh upper with responsive foam midsole. Carbon fiber plate for energy return.",
    badge: "New",
    inStock: true,
  },
  {
    id: 8,
    title: "Ceramic Pour-Over Set",
    price: 65,
    category: "Home",
    rating: 4.8,
    reviews: 743,
    image: "https://images.unsplash.com/photo-1517256064527-9d228fee26ec?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517256064527-9d228fee26ec?w=800&q=80",
    ],
    description: "Hand-thrown ceramic dripper with thermal carafe. Includes stainless steel filter for a clean, rich brew.",
    inStock: true,
  },
];

export const categories = ["All", "Audio", "Watches", "Accessories", "Bags", "Footwear", "Home"];

export const testimonials = [
  { name: "Sarah Chen", role: "Designer", text: "The quality is unmatched. Every detail feels intentional and premium.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Marcus Webb", role: "Architect", text: "Finally, products that match the aesthetics I demand. Exceptional craftsmanship.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Elena Rodriguez", role: "Photographer", text: "From packaging to product, the attention to detail is remarkable.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];
