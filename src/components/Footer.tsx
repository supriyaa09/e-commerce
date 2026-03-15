import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold tracking-[-0.03em] uppercase mb-4">Aether</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium essentials engineered for the modern minimalist.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold mb-4 text-muted-foreground">Shop</h4>
            <div className="flex flex-col gap-2.5">
              {['All Products', 'Audio', 'Watches', 'Accessories'].map(item => (
                <Link key={item} to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold mb-4 text-muted-foreground">Company</h4>
            <div className="flex flex-col gap-2.5">
              {['About', 'Careers', 'Press', 'Sustainability'].map(item => (
                <span key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold mb-4 text-muted-foreground">Support</h4>
            <div className="flex flex-col gap-2.5">
              {['FAQ', 'Shipping', 'Returns', 'Contact'].map(item => (
                <span key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-foreground/5 gap-4">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">© 2026 Aether Industries Ltd.</p>
          <div className="flex gap-6 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
