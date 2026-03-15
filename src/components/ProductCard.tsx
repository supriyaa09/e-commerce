import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useStore(s => s.addToCart);
  const toggleWishlist = useStore(s => s.toggleWishlist);
  const wishlist = useStore(s => s.wishlist);
  const isWished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="glass-surface rounded-3xl p-3 transition-shadow duration-300 hover:shadow-glass-hover">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
              {product.badge}
            </span>
          )}

          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/80"
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-accent text-accent' : 'text-foreground'}`} />
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="absolute bottom-3 left-3 right-3 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>

        <div className="mt-3 px-2 pb-2">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold tracking-tight hover:text-accent transition-colors">{product.title}</h3>
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-accent">${product.price}</span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
