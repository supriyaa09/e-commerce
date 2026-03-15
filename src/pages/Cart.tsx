import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const cart = useStore(s => s.cart);
  const removeFromCart = useStore(s => s.removeFromCart);
  const updateQuantity = useStore(s => s.updateQuantity);
  const cartTotal = useStore(s => s.cartTotal());

  const shipping = cartTotal > 200 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh]">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-6" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/products">
            <motion.button whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center gap-2">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-surface rounded-2xl p-4 flex gap-4"
              >
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-semibold text-sm hover:text-accent transition-colors">{item.product.title}</Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.product.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center glass-surface rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1.5 font-mono text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-surface rounded-2xl p-8 h-fit sticky top-28">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono">${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-mono">${tax.toFixed(2)}</span></div>
              <div className="border-t border-foreground/5 pt-3 flex justify-between font-bold text-base">
                <span>Total</span><span className="font-mono">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <motion.button whileTap={{ scale: 0.98 }} className="w-full mt-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/products" className="block text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
