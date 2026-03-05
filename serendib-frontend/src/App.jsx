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

      {/* Footer (Minimalist Light Design) */}
      <footer className="w-full bg-white pt-20 pb-12 mt-auto px-6 md:px-12 border-t border-theme-dark/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Logo & Copyright */}
          <div className="flex flex-col justify-between h-full lg:col-span-1 min-h-[150px]">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <img src="/assets/logo.png" alt="Café Serendib Logo" className="w-[35px] h-[35px] object-cover rounded-full bg-theme-dark p-0.5" />
              <span className="text-xl font-serif font-bold text-theme-dark tracking-wide">
                Café Serendib
              </span>
            </Link>

            <div className="mt-auto">
              <p className="text-xs text-theme-dark/60 font-medium mb-1">© {new Date().getFullYear()} Café Serendib, Inc.</p>
              <p className="text-xs text-theme-dark/60 font-medium">Terms of Service | Privacy Policy</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-theme-dark mb-6">Quick Links</h4>
            <ul className="space-y-3 text-xs font-semibold text-theme-dark/60">
              <li><Link to="/" className="hover:text-theme-accent transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-theme-accent transition-colors">Our Menu</Link></li>
              <li><Link to="/about" className="hover:text-theme-accent transition-colors">Our Story</Link></li>
              <li><Link to="/reserve" className="hover:text-theme-accent transition-colors">Reservations</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Offerings */}
          <div>
            <h4 className="text-sm font-bold text-theme-dark mb-6">Our Offerings</h4>
            <ul className="space-y-3 text-xs font-semibold text-theme-dark/60">
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Coffee Essentials</li>
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Fresh Pastries</li>
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Special Offers</li>
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Merchandise</li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-sm font-bold text-theme-dark mb-6">Support</h4>
            <ul className="space-y-3 text-xs font-semibold text-theme-dark/60">
              <li><Link to="/contact" className="hover:text-theme-accent transition-colors">Contact Us</Link></li>
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Order Status</li>
              <li className="hover:text-theme-accent cursor-pointer transition-colors">Locations</li>
            </ul>
          </div>

          {/* Column 5: Get in touch & Socials */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h4 className="text-sm font-bold text-theme-dark mb-6">Get in touch</h4>
              <p className="text-xs font-semibold text-theme-dark/60 leading-relaxed max-w-xs">
                Questions or feedback?<br />We'd love to hear from you.
              </p>
            </div>

            <div className="flex gap-4 mt-8 lg:mt-auto">
              <Facebook size={18} className="text-theme-dark/80 hover:text-theme-accent cursor-pointer transition-colors" />
              <Twitter size={18} className="text-theme-dark/80 hover:text-theme-accent cursor-pointer transition-colors" />
              <Instagram size={18} className="text-theme-dark/80 hover:text-theme-accent cursor-pointer transition-colors" />
            </div>
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
