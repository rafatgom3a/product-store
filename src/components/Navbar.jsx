import React, { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X, ShoppingCart, Heart, UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { wishlistItems } = useWishlist();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const isArabic = language === 'ar';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const updateOffset = () => {
      const navbar = document.querySelector('.storehub-navbar');
      if (navbar) document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => {
      window.removeEventListener('resize', updateOffset);
      document.body.style.paddingTop = '0';
    };
  }, [isMenuOpen]);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const toggleTheme = () => setDarkMode((value) => !value);
  const closeMenu = () => setIsMenuOpen(false);
  const active = (path) => location.pathname === path;
  const links = [
    { to: '/', en: 'Home', ar: 'الرئيسية' },
    { to: '/products', en: 'Products', ar: 'المنتجات' },
    { to: '/about', en: 'About Us', ar: 'من نحن' },
    { to: '/contact', en: 'Contact Us', ar: 'اتصل بنا' },
  ];

  return (
    <nav className="storehub-navbar fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 text-gray-900 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95 dark:text-gray-100">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6">
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center gap-2.5 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm transition-transform group-hover:scale-105">
            <ShoppingCart className="h-5 w-5 text-white" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">{isArabic ? 'ستور هَب' : 'StoreHub'}</span>
        </Link>

        <div className="hidden items-center gap-8 text-[15px] font-semibold md:flex">
          {links.map((item) => (
            <Link key={item.to} to={item.to} className={`whitespace-nowrap transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${active(item.to) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200'}`}>
              {isArabic ? item.ar : item.en}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {!isLoading && (user ? (
            <Link to="/account" onClick={closeMenu} aria-label={isArabic ? 'حسابي' : 'My account'} title={isArabic ? 'حسابي' : 'My account'} className="nav-icon">
              <UserRound size={21} />
            </Link>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link to="/signin" className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold transition hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700">{isArabic ? 'دخول' : 'Sign In'}</Link>
              <Link to="/signup" className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">{isArabic ? 'حساب جديد' : 'Sign Up'}</Link>
            </div>
          ))}
          <Link to="/wishlist" aria-label={isArabic ? 'المفضلة' : 'Wishlist'} title={isArabic ? 'المفضلة' : 'Wishlist'} className="nav-icon relative">
            <Heart size={21} />
            {wishlistItems.length > 0 && <span className="nav-count bg-rose-500">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" aria-label={isArabic ? 'السلة' : 'Cart'} title={isArabic ? 'السلة' : 'Cart'} className="nav-icon relative">
            <ShoppingCart size={21} />
            {totalItems > 0 && <span className="nav-count bg-red-500">{totalItems}</span>}
          </Link>
          <button type="button" onClick={() => setLanguage(isArabic ? 'en' : 'ar')} className="language-toggle" aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'} title={isArabic ? 'English' : 'العربية'}>
            {isArabic ? 'EN' : 'AR'}
          </button>
          <button type="button" onClick={toggleTheme} className="nav-icon" aria-label={isArabic ? 'تغيير المظهر' : 'Toggle theme'} title={isArabic ? 'تغيير المظهر' : 'Toggle theme'}>
            {darkMode ? <Sun size={21} /> : <Moon size={21} />}
          </button>
          <button type="button" className="nav-icon md:hidden" onClick={() => setIsMenuOpen((value) => !value)} aria-label={isArabic ? 'القائمة' : 'Menu'}>
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 shadow-lg dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((item) => <Link key={item.to} to={item.to} onClick={closeMenu} className={`rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-gray-800 ${active(item.to) ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400' : ''}`}>{isArabic ? item.ar : item.en}</Link>)}
          </div>
          {!isLoading && !user && <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
            <Link to="/signin" onClick={closeMenu} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-semibold dark:border-gray-700">{isArabic ? 'تسجيل الدخول' : 'Sign In'}</Link>
            <Link to="/signup" onClick={closeMenu} className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white">{isArabic ? 'إنشاء حساب' : 'Sign Up'}</Link>
          </div>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
