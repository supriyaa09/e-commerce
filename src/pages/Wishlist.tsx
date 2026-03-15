import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useStore, products } from '@/lib/store';

export default function WishlistPage() {
  const wishlist = useStore(s => s.wishlist);
  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Wishlist</h1>

        {wishedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <Heart className="w-16 h-16 text-muted-foreground/30 mb-6" />
            <h2 className="text-xl font-bold mb-2">No saved items</h2>
            <p className="text-muted-foreground mb-8">Items you love will appear here.</p>
            <Link to="/products">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold">Browse Products</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
