import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, User, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, COLORS } from '../../constants';
import { useStore } from '../../lib/store';
import { useAuth } from '../FirebaseProvider';
import { Shield } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setCartOpen, setAuthModalOpen, setAdminConsoleOpen } = useStore();
  const { user, isAdmin } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'si' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <>
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 lg:px-10 ${
        isScrolled ? 'bg-white/40 backdrop-blur-md border-b border-white/20 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none cursor-pointer group">
          <div className="text-3xl font-black tracking-tighter text-primary group-hover:scale-105 transition-transform">
            KEELLS<span className="text-secondary">.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <NavLink 
              key={item.id} 
              to={item.path}
              className={({ isActive }) => `text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-primary' : 'text-dark hover:text-primary'}`}
            >
              {i18n.language === 'si' ? item.labelSi : item.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            aria-label={i18n.language === 'en' ? 'Switch to Sinhala' : 'Switch to English'}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-all text-[10px] font-black"
          >
            <span className={i18n.language === 'en' ? 'text-primary' : 'text-gray-400'}>EN</span>
            <span className="h-3 w-[1px] bg-gray-200"></span>
            <span className={i18n.language === 'si' ? 'text-primary' : 'text-gray-400'}>සිං</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-white transition-all text-dark"
            >
              <Search size={18} strokeWidth={2.5} />
            </button>
            
            <button 
              aria-label="Shopping Cart"
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-dark text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {isAdmin && (
              <button 
                aria-label="Admin Dashboard"
                onClick={() => setAdminConsoleOpen(true)}
                className="w-10 h-10 rounded-full bg-accent text-dark flex items-center justify-center shadow-lg shadow-accent/20 hover:scale-110 active:scale-95 transition-all"
              >
                <Shield size={18} strokeWidth={2.5} />
              </button>
            )}

            <button 
              aria-label="User Account"
              onClick={() => setAuthModalOpen(true)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${user ? 'bg-secondary text-dark' : 'bg-dark text-white'}`}
            >
              <User size={18} strokeWidth={2.5} />
            </button>

            <button 
              aria-label="Open Menu"
              className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center lg:hidden" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black text-primary">KEELLS</span>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
                <X size={32} className="text-dark" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-black mb-12">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.id} 
                  to={item.path} 
                  className={({ isActive }) => `hover:text-primary transition-colors tracking-tighter uppercase ${isActive ? 'text-primary' : 'text-dark'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                   {i18n.language === 'si' ? item.labelSi : item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl text-sm font-black"
              >
                <Globe size={20} className="text-primary" />
                <span>{i18n.language === 'en' ? 'මාරු වන්න සිංහල' : 'Switch to English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
