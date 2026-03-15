import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock, CreditCard, Truck } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useStore } from '@/lib/store';

export default function CheckoutPage() {
  const cart = useStore(s => s.cart);
  const cartTotal = useStore(s => s.cartTotal());
  const clearCart = useStore(s => s.clearCart);
  const navigate = useNavigate();

  const shipping = cartTotal > 200 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvc: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate('/account?order=success');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-2">Nothing to checkout</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart first.</p>
          <Link to="/products">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold">Shop Now</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inputClass = "w-full bg-surface border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-muted-foreground/50";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-24 max-w-5xl mx-auto px-6">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-3xl font-bold tracking-tight mb-12">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lock className="w-4 h-4" /> Contact</h2>
              <input type="email" placeholder="Email address" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Truck className="w-4 h-4" /> Shipping Address</h2>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="First name" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className={inputClass} />
                <input type="text" placeholder="Last name" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className={inputClass} />
              </div>
              <input type="text" placeholder="Address" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className={`${inputClass} mt-3`} />
              <div className="grid grid-cols-3 gap-3 mt-3">
                <input type="text" placeholder="City" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={inputClass} />
                <input type="text" placeholder="State" required value={form.state} onChange={e => setForm({...form, state: e.target.value})} className={inputClass} />
                <input type="text" placeholder="ZIP" required value={form.zip} onChange={e => setForm({...form, zip: e.target.value})} className={inputClass} />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment</h2>
              <input type="text" placeholder="Card number" required value={form.cardNumber} onChange={e => setForm({...form, cardNumber: e.target.value})} className={inputClass} />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <input type="text" placeholder="MM / YY" required value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})} className={inputClass} />
                <input type="text" placeholder="CVC" required value={form.cvc} onChange={e => setForm({...form, cvc: e.target.value})} className={inputClass} />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Pay ${total.toFixed(2)}
            </motion.button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass-surface rounded-2xl p-6 sticky top-28">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-foreground/5 pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono">${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-mono">${tax.toFixed(2)}</span></div>
                <div className="border-t border-foreground/5 pt-2 flex justify-between font-bold"><span>Total</span><span className="font-mono">${total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
