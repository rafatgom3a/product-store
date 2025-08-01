import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">StoreHub</span>
          </div>
          <p className="text-gray-400 text-sm">
            Your trusted destination for premium products and exceptional service.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 text-sm">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Navigation</h3>
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>

        {/* Policy Links */}
        <nav className="flex flex-col gap-2 text-sm">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Legal</h3>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/returns" className="hover:underline">Return Policy</Link>
        </nav>

        {/* Social Links */}
                    <div>
              <h5 className="font-semibold mb-4">Connect With Us</h5>
              <p className="text-sm text-gray-400 mb-4">
                Follow us for the latest updates and exclusive offers
              </p>
              <div className="text-sm text-gray-400">
                <p>📧 hello@storehub.com</p>
                <p>📞 1-800-STORE-HUB</p>
              </div>
            </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} StoreHub. All rights reserved. Built with ❤️ for amazing customers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
