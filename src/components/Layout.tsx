import React from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-300 to-orange-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍰</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Neha's Bakehouse
                </h1>
                <p className="text-xs text-amber-700">Baked with Love</p>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-amber-900' : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`text-sm font-medium transition-colors ${
                  isActive('/products') ? 'text-amber-900' : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                Products
              </Link>
              <Link
                to="/custom-order"
                className={`text-sm font-medium transition-colors ${
                  isActive('/custom-order') ? 'text-amber-900' : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                Custom Order
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 hover:bg-orange-50 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-amber-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-orange-50 rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-amber-900" /> : <Menu className="w-6 h-6 text-amber-900" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive('/') ? 'text-amber-900' : 'text-amber-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive('/products') ? 'text-amber-900' : 'text-amber-700'
                }`}
              >
                Products
              </Link>
              <Link
                to="/custom-order"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive('/custom-order') ? 'text-amber-900' : 'text-amber-700'
                }`}
              >
                Custom Order
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-amber-900 text-orange-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
                Neha's Bakehouse
              </h3>
              <p className="text-orange-100 text-sm">
                Fresh baked goods made with love and the finest ingredients. Every bite tells a story of passion and tradition.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/custom-order" className="hover:text-white transition-colors">Custom Order</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>Monday - Friday: 7am - 7pm</li>
                <li>Saturday: 8am - 8pm</li>
                <li>Sunday: 9am - 6pm</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-orange-100">
            <p>&copy; 2024 Neha's Bakehouse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
