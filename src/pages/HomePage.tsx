import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, Loader2 } from 'lucide-react';
import Hero3D from '../components/hero/Hero3D';
import AIAssistant from '../components/ai/AIAssistant';
import ProductCard from '../components/shop/ProductCard';
import { FEATURED_PRODUCTS } from '../constants';
import { useTranslation } from 'react-i18next';
import { useStore } from '../lib/store';
import { getProducts } from '../services/productService';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setNotification } = useStore();

  useEffect(() => {
    const init = async () => {
      const fetchedProducts = await getProducts();
      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts as Product[]);
      } else {
        setProducts(FEATURED_PRODUCTS);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'si' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <main className="relative">
      <Hero3D />

      {/* Featured Section */}
      <section id="shop" className="py-32 relative z-10 scroll-mt-24">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">{t('seasonal_picks')}</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter"
              >
                {t('weekly_specials_1')} <br/>
                <span className="text-stroke text-primary">{t('weekly_specials_2')}</span>
              </motion.h2>
            </div>
            <motion.button 
               onClick={() => navigate('/shop')}
               whileHover={{ x: 10 }}
               className="px-8 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              {t('full_catalog')} →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {isLoading ? (
              <div className="col-span-full h-80 flex flex-col items-center justify-center text-gray-300">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">{t('gathering_fresh')}</p>
              </div>
            ) : (
              products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Animated Background Blob for Categories */}
      <div className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>

      {/* Categories Section */}
      <section id="departments" className="py-32 bg-white/40 backdrop-blur-sm border-y border-gray-50 scroll-mt-24">
        <div className="container mx-auto px-6 lg:px-10">
            <div className="mb-20">
              <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-4 block italic">{t('categories')}</span>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">{t('market_universe_1')} <br/><span className="text-secondary">{t('market_universe_2')}</span></h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[800px]">
              <CategoryCard 
                title={t('field_fresh')} 
                image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80" 
                span="md:col-span-8 md:row-span-2"
                onClick={() => navigate('/shop?category=Vegetables')}
              />
              <CategoryCard 
                title={t('bakehouse')} 
                image="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80" 
                span="md:col-span-4"
                onClick={() => navigate('/shop?category=Bakery')}
              />
              <CategoryCard 
                title={t('ocean_farm')} 
                image="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80" 
                span="md:col-span-4"
                onClick={() => navigate('/shop?category=Frozen Foods')}
              />
              <CategoryCard 
                title={t('daily_living')} 
                image="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80" 
                span="md:col-span-12"
                onClick={() => navigate('/shop')}
              />
           </div>
        </div>
      </section>

      <AIAssistant />
    </main>
  );
}

function CategoryCard({ title, image, span = "", onClick }: { title: string, image: string, span?: string, onClick?: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div 
      whileHover={{ scale: 0.985 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`relative group rounded-[40px] overflow-hidden cursor-pointer ${span} shadow-2xl`}
    >
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent opacity-80 group-hover:from-primary/95 transition-all duration-700" />
      <div className="absolute inset-0 p-12 flex flex-col justify-end items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-5xl font-black mb-4 uppercase tracking-tighter"
        >
          {title}
        </motion.span>
        <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-500">
          <button className="bg-white/20 backdrop-blur-xl text-white text-[10px] font-black px-8 py-3 rounded-full border border-white/20 uppercase tracking-[0.2em] inline-block">
            {t('enter_department')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
