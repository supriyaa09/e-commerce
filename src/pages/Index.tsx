import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { products, testimonials, categories } from '@/lib/store';
import { useState } from 'react';

const Index = () => {
  const [email, setEmail] = useState('');
  const bestSellers = products.filter(p => p.badge === 'Best Seller' || p.rating >= 4.7).slice(0, 4);
  const newArrivals = products.filter(p => p.badge === 'New' || p.badge === 'Limited').slice(0, 4);
  const featuredCategories = ['Audio', 'Watches', 'Accessories', 'Footwear'];

  const categoryImages: Record<string, string> = {
    Audio: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
    Watches: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    Accessories: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    Footwear: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-[10px] font-mono tracking-[0.2em] uppercase mb-8"
          >
            New Collection — Spring 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] mb-8 leading-[0.95]"
          >
            Designed for
            <br />
            <span className="text-muted-foreground italic font-light">precision</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Premium essentials engineered for the modern minimalist.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/products">
              <button className="px-8 py-4 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-full font-semibold hover:bg-foreground/10 transition-colors">
                View Lookbook
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-foreground/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Truck, label: 'Free Shipping Over $200' },
            { icon: Shield, label: '2-Year Warranty' },
            { icon: RotateCcw, label: '30-Day Returns' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 text-muted-foreground">
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCategories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/products?category=${cat}`} className="group relative block aspect-[3/4] rounded-2xl overflow-hidden glass-surface">
                <img src={categoryImages[cat]} alt={cat} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold">{cat}</h3>
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    {products.filter(p => p.category === cat).length} products
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Our most loved products.</p>
          </div>
          <Link to="/products" className="text-sm font-semibold border-b-2 border-accent pb-1 hover:text-accent transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Feature Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative rounded-3xl overflow-hidden glass-surface">
          <img
            src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80"
            alt="Featured"
            className="w-full h-[400px] md:h-[500px] object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex items-center p-12 md:p-20">
            <div className="max-w-lg">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-4 block">Limited Edition</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Studio Monitor Pro</h2>
              <p className="text-muted-foreground mb-8">Reference-grade audio in a sculptural form. Only 500 units worldwide.</p>
              <Link to="/product/3">
                <motion.button whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                  Discover <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-surface rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-star text-star" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-surface border-y border-foreground/5 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Join the Aether.</h2>
          <p className="text-muted-foreground mb-10">Early access to drops and behind-the-scenes engineering insights.</p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-background border border-foreground/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-mono text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
