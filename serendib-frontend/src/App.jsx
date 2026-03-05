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
import Dashboard from './pages/Dashboard';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';

const Layout = ({ children }) => {
  const { cartItems } = useCart();
  const { userInfo } = useAuth();

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

      {/* Footer */}
      <footer className="w-full bg-theme-dark text-[#D8C7B9] pt-20 pb-8 mt-auto px-6 md:px-12 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-[#D8C7B9]/20 pb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-3">
              <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-theme-accent/50" />
              Café Serendib
            </h2>
            <p className="text-sm leading-relaxed mb-6 opacity-90 max-w-xs">
              Where every cup tells a story and every bite feels like home. Enjoy handcrafted coffee, freshly baked delights, and the warmth of Sri Lankan hospitality.
            </p>
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-[#4A3B31] flex items-center justify-center hover:bg-theme-accent hover:text-white cursor-pointer transition-all"><Facebook size={16} /></div>
              <div className="w-9 h-9 rounded-full bg-[#4A3B31] flex items-center justify-center hover:bg-theme-accent hover:text-white cursor-pointer transition-all"><Instagram size={16} /></div>
              <div className="w-9 h-9 rounded-full bg-[#4A3B31] flex items-center justify-center hover:bg-theme-accent hover:text-white cursor-pointer transition-all"><Twitter size={16} /></div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-serif mb-6">Come Visit Us</h4>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-theme-accent shrink-0 mt-0.5" />
                <span>123 Galle Road,<br />Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-theme-accent shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white text-lg font-serif mb-6">Opening Hours</h4>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex gap-4">
                <Clock size={18} className="text-theme-accent shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-medium mb-1">Mon - Fri:</strong>
                  07:00 AM - 10:00 PM
                </div>
              </li>
              <li className="flex gap-4">
                {/* Invisible spacer icon to align text */}
                <Clock size={18} className="shrink-0 mt-0.5 opacity-0" />
                <div>
                  <strong className="block text-white font-medium mb-1">Sat - Sun:</strong>
                  08:00 AM - 11:00 PM
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-serif mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm opacity-90 flex flex-col items-start">
              <li><Link to="/about" className="hover:text-theme-accent inline-block transition-colors">Our Story</Link></li>
              <li><Link to="/menu" className="hover:text-theme-accent inline-block transition-colors">Featured Menu</Link></li>
              <li><Link to="/reserve" className="hover:text-theme-accent inline-block transition-colors">Reserve a Table</Link></li>
              <li><Link to="/orders" className="hover:text-theme-accent inline-block transition-colors">Order Online</Link></li>
            </ul>
          </div>

        </div>

        <div className="max-w-[1400px] mx-auto text-center text-sm opacity-70 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © {new Date().getFullYear()} Café Serendib. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<div className="text-center py-40 min-h-screen text-2xl font-serif">Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
