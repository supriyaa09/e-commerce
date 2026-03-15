import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, products } from '@/lib/store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cartCount = useStore(s => s.cartCount());
  const wishlist = useStore(s => s.wishlist);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredProducts = searchQuery.length > 1
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const navLinks = [
    { label: 'Shop', to: '/products' },
    { label: 'Audio', to: '/products?category=Audio' },
    { label: 'Watches', to: '/products?category=Watches' },
    { label: 'Accessories', to: '/products?category=Accessories' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`max-w-7xl mx-auto mx-4 md:mx-auto px-4 md:px-6 flex items-center justify-between rounded-2xl py-3 px-6 transition-all duration-300 ${scrolled ? 'glass-nav' : 'bg-transparent'}`}>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-[-0.05em] uppercase">
            Aether
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map(link => (
              <Link key={link.label} to={link.to} className="hover:text-foreground transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div ref={searchRef} className="relative">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 280 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="absolute right-0 top-full mt-2 glass-surface rounded-xl overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-muted-foreground"
                  />
                  {filteredProducts.length > 0 && (
                    <div className="border-t border-foreground/5 max-h-64 overflow-y-auto">
                      {filteredProducts.map(p => (
                        <button
                          key={p.id}
                          onClick={() => { navigate(`/product/${p.id}`); setSearchOpen(false); setSearchQuery(''); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-hover transition-colors text-left"
                        >
                          <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-medium">{p.title}</p>
                            <p className="text-xs text-muted-foreground font-mono">${p.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/wishlist" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors group">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-muted-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-nav mx-4 mt-2 rounded-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/account" onClick={() => setMobileOpen(false)} className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
