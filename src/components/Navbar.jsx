import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = (
    <>
      <Link
        to="/"
        onClick={closeMenu}
        className={`transition hover:text-indigo-400 ${isActive('/') ? 'underline underline-offset-4 decoration-2' : ''}`}
      >
        Home
      </Link>
      <Link
        to="/products"
        onClick={closeMenu}
        className={`transition hover:text-indigo-400 ${isActive('/products') ? 'underline underline-offset-4 decoration-2' : ''}`}
      >
        Products
      </Link>
      <Link
        to="/about"
        onClick={closeMenu}
        className={`transition hover:text-indigo-400 ${isActive('/about') ? 'underline underline-offset-4 decoration-2' : ''}`}
      >
        About Us
      </Link>
      <Link
        to="/contact"
        onClick={closeMenu}
        className={`transition hover:text-indigo-400 ${isActive('/contact') ? 'underline underline-offset-4 decoration-2' : ''}`}
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <nav className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-indigo-500 dark:text-indigo-400">
          <Link to="/">Product Store</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">{navLinks}</div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link
            to="/signin"
            className="hidden md:inline-block px-4 py-1 border rounded transition border-gray-300 text-gray-900 bg-white hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hidden md:inline-block px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Sign Up
          </Link>
          <button onClick={toggleTheme} className="hover:text-indigo-400 transition">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-white dark:bg-gray-900 shadow-inner border-t border-gray-200 dark:border-gray-700 transition-all duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            {navLinks}
          </div>
          <div className="flex flex-col mt-4 space-y-2">
            <Link
              to="/signin"
              onClick={closeMenu}
              className="w-full px-4 py-2 border rounded border-gray-300 text-center text-gray-900 bg-white hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="w-full px-4 py-2 rounded text-center bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
