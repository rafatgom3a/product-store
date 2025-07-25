import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 py-6 mt-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Logo or Brand */}
        <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-600">
          Product Store
        </div>

        {/* Right: Copyright */}
        <div className="text-xs mt-4 md:mt-0">
          © {new Date().getFullYear()} Product Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
