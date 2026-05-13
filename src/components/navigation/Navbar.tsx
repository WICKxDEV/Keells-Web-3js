import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, User, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, COLORS } from '../../constants';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 lg:px-10 ${
        isScrolled ? 'bg-white/40 backdrop-blur-md border-b border-white/20 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <div className="text-3xl font-black tracking-tighter text-primary">
            KEELLS<span className="text-secondary">.</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <a 
              key={item.path} 
              href={item.path}
              className="text-[11px] font-bold uppercase tracking-widest text-dark hover:text-primary transition-all duration-300"
            >
              {i18n.language === 'si' ? item.labelSi : item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-all text-[10px] font-black"
          >
            <span className={i18n.language === 'en' ? 'text-primary' : 'text-gray-400'}>EN</span>
            <span className="h-3 w-[1px] bg-gray-200"></span>
            <span className={i18n.language === 'si' ? 'text-primary' : 'text-gray-400'}>සිං</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-white transition-all text-dark">
              <Search size={18} strokeWidth={2.5} />
            </button>
            
            <button className="relative w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
              <ShoppingCart size={18} strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 bg-accent text-dark text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>

            <button className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
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
              <span className="text-2xl font-bold text-primary">KEELLS</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} className="text-gray-900" />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-3xl font-bold">
              {NAV_ITEMS.map((item) => (
                <a key={item.path} href={item.path} className="hover:text-primary">
                   {i18n.language === 'si' ? item.labelSi : item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
