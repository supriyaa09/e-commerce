import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get('order') === 'success';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 pb-24 max-w-4xl mx-auto px-6">
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-surface rounded-2xl p-8 mb-12 text-center border border-accent/20"
          >
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-muted-foreground">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          </motion.div>
        )}

        <h1 className="text-3xl font-bold tracking-tight mb-12">Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: User, title: 'Profile', desc: 'Manage your personal information', to: '#' },
            { icon: Package, title: 'Orders', desc: 'Track and manage your orders', to: '#' },
            { icon: Heart, title: 'Wishlist', desc: 'View your saved items', to: '/wishlist' },
            { icon: Settings, title: 'Settings', desc: 'Preferences and notifications', to: '#' },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={item.to} className="glass-surface rounded-2xl p-8 flex items-start gap-4 hover:shadow-glass-hover transition-shadow block">
                <div className="p-3 rounded-xl bg-surface-hover">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
