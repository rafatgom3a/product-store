import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <section>
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Product Store</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your trusted store for quality products.
          </p>
        </section>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 text-sm">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Navigation</h3>
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
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
        <section>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Follow us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Product Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
