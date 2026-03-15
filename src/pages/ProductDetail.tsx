import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, useStore } from '@/lib/store';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore(s => s.addToCart);
  const toggleWishlist = useStore(s => s.toggleWishlist);
  const wishlist = useStore(s => s.wishlist);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const images = product.images || [product.image];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-3xl overflow-hidden glass-surface mb-4">
              <img src={images[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-star text-star' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold font-mono">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through font-mono">${product.originalPrice}</span>
                  <span className="text-sm text-accent font-semibold">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center glass-surface rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors">−</button>
                <span className="px-4 py-3 font-mono text-sm min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors">+</button>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart — ${product.price * quantity}
              </motion.button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-4 glass-surface rounded-xl hover:bg-surface-hover transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWished ? 'fill-accent text-accent' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-foreground/5">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: Shield, label: '2-Year Warranty' },
                { icon: RotateCcw, label: '30-Day Returns' },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
