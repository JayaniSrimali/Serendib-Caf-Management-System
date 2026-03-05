import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Phone, MapPin, Clock, Facebook, Instagram, Twitter, Search, ShoppingBag } from 'lucide-react';
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
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';

import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { cartItems } = useCart();
  const { userInfo } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-theme-bg min-h-screen font-sans text-theme-dark flex flex-col overflow-x-hidden selection:bg-theme-accent selection:text-white">

      {/* Top Bar */}
      <div className="bg-theme-dark text-[#D8C7B9] text-xs py-2 px-6 md:px-12 flex justify-between items-center z-50 relative">
        <div className="flex gap-6 max-w-[1400px] mx-auto w-full justify-between items-center">
          <p className="hidden md:block">Welcome to Café Serendib — The True Taste of Ceylon</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Phone size={14} /> +94 11 234 5678</div>
            <div className="flex gap-3">
              <Facebook size={14} className="hover:text-white cursor-pointer transition-colors" />
              <Instagram size={14} className="hover:text-white cursor-pointer transition-colors" />
              <Twitter size={14} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="w-full bg-theme-bg/95 backdrop-blur-md sticky top-0 z-40 border-b border-theme-dark/10 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Café Serendib Logo" className="w-[45px] h-[45px] object-cover rounded-full shadow-md bg-theme-dark p-0.5 border-2 border-theme-accent" />
            <span className="text-2xl font-serif font-bold text-theme-dark tracking-wide">
              Café Serendib
            </span>
          </Link>

          {/* Middle Links */}
          <nav className="hidden lg:flex items-center gap-10 font-medium text-[15px]">
            <Link to="/" className="text-theme-dark hover:text-theme-accent transition-colors">Home</Link>
            <Link to="/about" className="text-theme-dark hover:text-theme-accent transition-colors">Our Story</Link>
            <Link to="/menu" className="text-theme-dark hover:text-theme-accent transition-colors">Menu</Link>
            <Link to="/contact" className="text-theme-dark hover:text-theme-accent transition-colors">Contact</Link>
          </nav>

          {/* Right Icons / CTA */}
          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-theme-dark hover:text-theme-accent transition-colors"><Search size={22} /></button>

            <Link to="/cart" className="relative text-theme-dark hover:text-theme-accent transition-colors hidden sm:block">
              <ShoppingBag size={22} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-theme-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <Link to="/dashboard" className="hidden border-2 border-theme-dark text-theme-dark px-4 py-2 rounded-full text-xs font-semibold hover:bg-theme-dark hover:text-white transition-all md:block">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="hidden border-2 border-theme-dark text-theme-dark px-4 py-2 rounded-full text-xs font-semibold hover:bg-theme-dark hover:text-white transition-all md:block">
                Log In
              </Link>
            )}

            <Link to="/reserve" className="bg-theme-dark text-theme-bg px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-theme-accent transition-all hidden md:block">
              Reserve a Table
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col items-center">
        {children}
      </main>

      {/* Footer (Premium Dark Design) */}
      <footer className="w-full bg-theme-dark text-[#D8C7B9] pt-24 pb-12 mt-auto px-6 md:px-12 selection:bg-theme-accent selection:text-white">
        <div className="max-w-[1400px] mx-auto">

          {/* Top Section with Decorative Elements (Optional, based on image inspiration) */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-16 mb-16 gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 italic">Experience the art of Ceylon coffee</h3>
              <p className="text-sm md:text-base text-[#D8C7B9]/70 leading-relaxed">
                Join our community of coffee lovers and receive exclusive brewing tips, new menu alerts, and special event invitations directly in your inbox.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full max-w-md">
              <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-full focus-within:border-theme-accent transition-all">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-transparent px-6 py-3 text-sm text-white placeholder:text-[#D8C7B9]/30 outline-none w-full"
                />
                <button className="bg-theme-accent hover:bg-theme-accent/90 text-white px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* Column 1: Logo & About */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-8 group">
                <img src="/assets/logo.png" alt="Café Serendib Logo" className="w-[45px] h-[45px] object-cover rounded-full bg-theme-accent p-0.5 border border-white/20 group-hover:scale-105 transition-transform" />
                <span className="text-2xl font-serif font-bold text-white tracking-wide">
                  Café Serendib
                </span>
              </Link>
              <p className="text-sm text-[#D8C7B9]/60 leading-relaxed mb-8 max-w-xs">
                Crafting authentic Sri Lankan coffee experiences since 1998. Every bean tells a story of our heritage and dedication to the perfect brew.
              </p>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-theme-accent hover:border-theme-accent text-[#D8C7B9] hover:text-white cursor-pointer transition-all">
                  <Facebook size={18} />
                </div>
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-theme-accent hover:border-theme-accent text-[#D8C7B9] hover:text-white cursor-pointer transition-all">
                  <Twitter size={18} />
                </div>
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-theme-accent hover:border-theme-accent text-[#D8C7B9] hover:text-white cursor-pointer transition-all">
                  <Instagram size={18} />
                </div>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-8 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-theme-accent">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Home</Link></li>
                <li><Link to="/about" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Our Story</Link></li>
                <li><Link to="/menu" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Menu</Link></li>
                <li><Link to="/reserve" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Reservations</Link></li>
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
                  <span className="text-[#D8C7B9]/60 leading-relaxed font-medium">
                    123 Galle Road,<br />Colombo 03, Sri Lanka
                  </span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 text-theme-accent"><Phone size={18} /></div>
                  <span className="text-[#D8C7B9]/60 font-medium">+94 11 234 5678</span>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 text-theme-accent"><Clock size={18} /></div>
                  <span className="text-[#D8C7B9]/60 font-medium">
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
                <li><Link to="/contact" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Help Center</Link></li>
                <li><Link to="/contact" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Delivery Info</Link></li>
                <li><Link to="/contact" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Track Order</Link></li>
                <li><Link to="/contact" className="text-[#D8C7B9]/60 hover:text-theme-accent transition-colors flex items-center gap-2"><span>&rsaquo;</span> Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 5: Instagram Preview (Visual aesthetic based on image) */}
            <div>
              <h4 className="text-white font-serif font-bold text-lg mb-8 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-0.5 after:bg-theme-accent">
                Gallery
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
                    <img
                      src={`https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=150&q=80&sig=${i}`}
                      alt="Coffee"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-[#D8C7B9]/40 tracking-[0.1em] uppercase">
              © {new Date().getFullYear()} Café Serendib — All Rights Reserved.
            </p>
            <div className="flex bg-white/5 px-6 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-bold text-[#D8C7B9]/50 uppercase tracking-widest flex items-center gap-3">
                Managed by <span className="text-theme-accent">Jayani Srimali</span>
              </span>
            </div>
            <p className="text-xs font-bold text-[#D8C7B9]/40 tracking-[0.1em] uppercase">
              Colombo, Sri Lanka
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Layout>
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
