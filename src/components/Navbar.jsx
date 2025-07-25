import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle('dark');

    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <nav className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-indigo-400 dark:text-indigo-600">
          <Link to="/">Product Store</Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/products" className="hover:text-indigo-400 transition">Products</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">About Us</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">Contact Us</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link
            to="/signin"
            className="px-4 py-1 border rounded transition border-gray-300 text-gray-900 bg-white hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
          >
            Sign Up
          </Link>
          <button onClick={toggleTheme} className="hover:text-indigo-400 transition">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
