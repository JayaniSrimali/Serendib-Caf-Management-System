import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <header className="bg-brown-900 text-cream p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-serif text-gold font-bold">Café Serendib</h1>
      <nav>
        <ul className="flex space-x-6">
          <li className="hover:text-gold transition-colors cursor-pointer">Home</li>
          <li className="hover:text-gold transition-colors cursor-pointer">Menu</li>
          <li className="hover:text-gold transition-colors cursor-pointer">Cart</li>
          <li className="hover:text-gold transition-colors cursor-pointer">Login</li>
        </ul>
      </nav>
    </header>

    <main className="flex-grow flex flex-col pt-8 px-4 md:px-8">
      {children}
    </main>

    <footer className="bg-brown-900 text-brown-200 p-6 text-center mt-auto border-t border-brown-700">
      <p>&copy; {new Date().getFullYear()} Café Serendib. All Rights Reserved.</p>
    </footer>
  </div>
);

// Example Pages
const Home = () => (
  <div className="text-center">
    <h2 className="text-4xl text-brown-700 mb-4">Welcome to Café Serendib</h2>
    <p className="text-lg text-brown-600 mb-8 max-w-2xl mx-auto">
      Experience the warm flavors and exquisite blend of our finest coffee, crafted with a perfect touch of luxury.
    </p>
    <button className="btn-primary text-lg">Order Now</button>
  </div>
);

function App() {
  return (
    <Layout>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* other routes will go here: /menu, /cart, /checkout, /login, /register, /admin */}
        <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
