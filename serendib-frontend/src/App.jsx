import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Phone, MapPin, Clock, Facebook, Instagram, Twitter, Search, ShoppingBag, User, X, Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Reserve from './pages/Reserve';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';

const Layout = ({ children }) => {
  const { cartItems } = useCart();
  const { userInfo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-theme-bg min-h-screen font-sans text-theme-text flex flex-col overflow-x-hidden selection:bg-theme-accent selection:text-white">



      {/* Main Navigation */}
      <header className="w-full bg-[#2C1E16] fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Café Serendib Logo" className="w-[45px] h-[45px] object-cover rounded-full shadow-md bg-[#E8DCC4] p-0.5 border-2 border-theme-accent" />
            <span className="text-2xl font-serif font-bold text-white tracking-wide drop-shadow-sm">
              Café Serendib
            </span>
          </Link>

          {/* Middle Links */}
          <nav className="hidden lg:flex items-center gap-10 font-medium text-[15px]">
            <Link to="/" className="text-[#E8DCC4]/80 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-[#E8DCC4]/80 hover:text-white transition-colors">Our Story</Link>
            <Link to="/menu" className="text-[#E8DCC4]/80 hover:text-white transition-colors">Menu</Link>
            <Link to="/contact" className="text-[#E8DCC4]/80 hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Right Icons / CTA */}
          <div className="flex items-center gap-4">
            {/* Search - visible sm+ */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:block text-[#E8DCC4]/80 hover:text-white transition-colors"
            >
              <Search size={22} />
            </button>

            {/* Cart - visible sm+ */}
            <Link to="/cart" className="relative text-[#E8DCC4]/80 hover:text-white transition-colors hidden sm:block">
              <ShoppingBag size={22} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-theme-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* User icon - visible always */}
            {userInfo ? (
              <Link to="/dashboard" state={{ tab: 'profile' }} className="text-[#E8DCC4]/80 hover:text-theme-accent transition-all p-1.5 rounded-full border border-[#E8DCC4]/10 hover:border-theme-accent/30 flex items-center justify-center">
                <User size={22} />
              </Link>
            ) : (
              <Link to="/login" className="hidden border border-[#E8DCC4]/20 text-[#E8DCC4] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#E8DCC4] hover:text-[#2C1E16] transition-all md:block">
                Log In
              </Link>
            )}

            {/* Reserve - desktop only */}
            <Link to="/reserve" className="bg-theme-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#2C1E16] transition-all hidden md:block">
              Reserve a Table
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#E8DCC4]/15 text-[#E8DCC4]/80 hover:text-white hover:border-[#E8DCC4]/40 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-white/5 bg-[#1e1410]"
            >
              <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-1">

                {/* Nav Links */}
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'Our Story' },
                  { to: '/menu', label: 'Menu' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3.5 rounded-xl font-semibold text-[15px] transition-all ${location.pathname === link.to
                        ? 'bg-[#CDA177]/15 text-[#CDA177]'
                        : 'text-[#E8DCC4]/70 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="h-[1px] bg-white/5 my-3" />

                {/* Cart & Search row */}
                <div className="flex items-center gap-3 px-2">
                  <Link
                    to="/cart"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-[#E8DCC4]/70 hover:text-white hover:bg-white/10 transition-all flex-1"
                  >
                    <ShoppingBag size={18} />
                    <span className="font-semibold text-sm">Cart</span>
                    {cartItems?.length > 0 && (
                      <span className="ml-auto bg-theme-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-[#E8DCC4]/70 hover:text-white hover:bg-white/10 transition-all flex-1"
                  >
                    <Search size={18} />
                    <span className="font-semibold text-sm">Search</span>
                  </button>
                </div>

                <div className="h-[1px] bg-white/5 my-1" />

                {/* Reserve & Login */}
                <Link
                  to="/reserve"
                  className="w-full bg-[#CDA177] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-[12px] text-center hover:bg-[#b88c64] transition-all mt-1"
                >
                  Reserve a Table
                </Link>

                {!userInfo && (
                  <Link
                    to="/login"
                    className="w-full border border-[#E8DCC4]/20 text-[#E8DCC4] py-4 rounded-xl font-bold uppercase tracking-widest text-[12px] text-center hover:bg-white/5 transition-all"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col items-center pt-[85px]">
        {children}
      </main>

      {/* Footer (Premium Dark Design) */}
      <footer className="w-full bg-[#2C1E16] text-[#D8C9BB] pt-24 pb-12 mt-auto px-6 md:px-12 selection:bg-theme-accent selection:text-white border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">

          {/* Top Section with Decorative Elements (Optional, based on image inspiration) */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-black/5 pb-16 mb-16 gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 italic">Experience the art of Ceylon coffee</h3>
              <p className="text-sm md:text-base text-theme-textMuted/70 leading-relaxed">
                Join our community of coffee lovers and receive exclusive brewing tips, new menu alerts, and special event invitations directly in your inbox.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full max-w-md">
              <div className="flex bg-white/5 border border-black/5 p-1.5 rounded-full focus-within:border-theme-accent transition-all">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-transparent px-6 py-3 text-sm text-white placeholder:text-theme-textMuted/30 outline-none w-full"
                />
                <button className="bg-theme-accent hover:bg-theme-accent/90 text-white px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Column 1: Logo & About */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-8 group">
                <img src="/assets/logo.png" alt="Café Serendib Logo" className="w-[45px] h-[45px] object-cover rounded-full bg-theme-accent p-0.5 border border-white/20 group-hover:scale-105 transition-transform" />
                <span className="text-2xl font-serif font-bold text-white tracking-wide">
                  Café Serendib
                </span>
              </Link>
              <p className="text-sm text-theme-textMuted/60 leading-relaxed mb-8 max-w-xs">
                Crafting authentic Sri Lankan coffee experiences since 1998. Every bean tells a story of our heritage and dedication to the perfect brew.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-black/5 flex items-center justify-center hover:bg-theme-accent hover:border-theme-accent text-theme-textMuted hover:text-white cursor-pointer transition-all">
                  <Facebook size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-black/5 flex items-center justify-center hover:bg-theme-accent hover:border-theme-accent text-theme-textMuted hover:text-white cursor-pointer transition-all">
                  <Twitter size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-black/5 flex items-center justify-center hover:bg-theme-accent hover:border-theme-accent text-theme-textMuted hover:text-white cursor-pointer transition-all">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-8 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-theme-accent">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Home</Link></li>
                <li><Link to="/about" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Our Story</Link></li>
                <li><Link to="/menu" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Menu</Link></li>
                <li><Link to="/reserve" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Reservations</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-8 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-theme-accent">
                Contact Info
              </h4>
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4">
                  <div className="mt-1 text-theme-accent"><MapPin size={18} /></div>
                  <span className="text-theme-textMuted/60 leading-relaxed font-medium">
                    123 Galle Road,<br />Colombo 03, Sri Lanka
                  </span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 text-theme-accent"><Phone size={18} /></div>
                  <span className="text-theme-textMuted/60 font-medium">+94 11 234 5678</span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 text-theme-accent"><Clock size={18} /></div>
                  <span className="text-theme-textMuted/60 font-medium">
                    Mon - Fri: 7:00 - 22:00<br />
                    Sat - Sun: 8:00 - 23:00
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Customer Care */}
            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-8 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-theme-accent">
                Customer Care
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/contact" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Help Center</Link></li>
                <li><Link to="/about" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Delivery Info</Link></li>
                <li><Link to="/dashboard" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Track Order</Link></li>
                <li><Link to="/about" className="text-theme-textMuted/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Privacy Policy</Link></li>
              </ul>
            </div>


          </div>

          <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-theme-textMuted/40 tracking-[0.1em] uppercase">
              © {new Date().getFullYear()} Café Serendib — All Rights Reserved.
            </p>
            <div className="flex bg-white/5 px-6 py-2 rounded-full border border-black/5">
              <span className="text-[10px] font-bold text-theme-textMuted/50 uppercase tracking-widest flex items-center gap-3">
                Managed by <span className="text-theme-accent">Jayani Srimali</span>
              </span>
            </div>
            <p className="text-xs font-bold text-theme-textMuted/40 tracking-[0.1em] uppercase">
              Colombo, Sri Lanka
            </p>
          </div>
        </div>
      </footer>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#130f0c]/95 backdrop-blur-xl flex flex-col items-center justify-center px-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-[#E8DCC4]/40 hover:text-white transition-all transform hover:rotate-90"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-2xl text-center"
            >
              <h2 className="text-3xl font-serif font-bold text-white mb-10 tracking-widest uppercase italic">What are you craving?</h2>

              <form onSubmit={handleSearch} className="relative group">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search our collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#CDA177]/20 py-6 text-4xl md:text-5xl font-serif text-white placeholder:text-white/10 focus:outline-none focus:border-[#CDA177] transition-all text-center"
                />
                <div className="mt-8 flex justify-center gap-4">
                  {['Espresso', 'Kottu', 'Iced Coffee', 'Pastry'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#CDA177]/60 hover:text-[#CDA177] transition-colors"
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-12 bg-[#CDA177] text-black px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all"
                >
                  Find Serendipity
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Toaster position="top-right"
        toastOptions={{
          style: { background: '#2B2019', color: '#fff' }
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div className="text-center py-40 min-h-screen text-2xl font-serif">Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
