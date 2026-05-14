import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Loader2, X, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard';
import { getProducts } from '../services/productService';
import { Product } from '../types';
import { FEATURED_PRODUCTS } from '../constants';

const CATEGORY_MAP: Record<string, string> = {
  'All': 'cat_all',
  'Fruits': 'cat_fruits',
  'Vegetables': 'cat_vegetables',
  'Bakery': 'cat_bakery',
  'Dairy': 'cat_dairy',
  'Frozen Foods': 'cat_frozen',
  'Household': 'cat_household',
  'Pharmacy': 'cat_pharmacy',
  'Snacks': 'cat_snacks',
  'Electronics': 'cat_electronics',
  'Personal Care': 'cat_personal',
  'Baby Care': 'cat_baby',
  'Sri Lankan Local Products': 'cat_local'
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

export default function ShopPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await getProducts();
      if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
        setProducts(FEATURED_PRODUCTS);
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.nameSi && product.nameSi.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-32 pb-20 bg-[#FCFDFB] min-h-screen">
      <div className="container mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-6"
          >
            {t('digital_catalog_1')} <br/> <span className="text-primary">{t('digital_catalog_2')}</span>
          </motion.h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] italic">
            {t('browsing_items', { count: filteredProducts.length })}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="text"
              placeholder={t('search_products')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 outline-none font-bold text-sm transition-all"
            />
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 lg:flex-none px-8 py-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
            >
              <SlidersHorizontal size={16} />
              {t('filter')}
            </button>
            <div className="hidden lg:flex gap-2 overflow-x-auto no-scrollbar max-w-2xl">
              {CATEGORIES.slice(0, 6).map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat ? 'bg-dark text-white shadow-xl scale-105' : 'bg-white border border-gray-100 text-gray-400 hover:border-primary'
                  }`}
                >
                  {t(CATEGORY_MAP[cat])}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[150] bg-white p-10 lg:relative lg:inset-auto lg:p-0 lg:bg-transparent lg:block"
            >
              <div className="flex justify-between items-center mb-10 lg:hidden">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Refine</h2>
                <button onClick={() => setShowFilters(false)} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <X />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      handleCategoryChange(cat);
                      if (window.innerWidth < 1024) setShowFilters(false);
                    }}
                    className={`px-4 py-8 rounded-3xl font-black text-[9px] text-center uppercase tracking-widest transition-all leading-tight border ${
                      activeCategory === cat ? 'bg-primary text-white border-primary shadow-xl' : 'bg-white border-gray-100 text-gray-400 hover:border-primary'
                    }`}
                  >
                    {t(CATEGORY_MAP[cat])}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="mt-12">
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center text-gray-300">
              <Loader2 size={64} className="animate-spin mb-6 text-primary" />
              <p className="text-sm font-black uppercase tracking-[0.5em]">{t('syncing_inventory')}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                 <Filter className="text-gray-200" size={40} />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{t('no_items_found')}</h3>
               <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{t('try_adjusting')}</p>
               <button 
                 onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                 className="mt-8 px-8 py-4 bg-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
               >
                 {t('clear_filters')}
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
