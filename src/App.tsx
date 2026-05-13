import React from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight } from 'lucide-react';
import Navbar from './components/navigation/Navbar';
import Hero3D from './components/hero/Hero3D';
import AIAssistant from './components/ai/AIAssistant';
import ProductCard from './components/shop/ProductCard';
import { FEATURED_PRODUCTS } from './constants';
import { useTranslation } from 'react-i18next';
import './lib/i18n';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FCFDFB] text-dark font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main className="relative">
        <Hero3D />

        {/* Featured Section */}
        <section className="py-32 relative z-10">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-6"
                >
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Seasonal Picks</span>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter"
                >
                  Weekly <br/>
                  <span className="text-stroke text-primary">Specials.</span>
                </motion.h2>
              </div>
              <motion.button 
                 whileHover={{ x: 10 }}
                 className="px-8 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Catalog →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Animated Background Blob for Categories */}
        <div className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>

        {/* Categories Section */}
        <section className="py-32 bg-white/40 backdrop-blur-sm border-y border-gray-50">
          <div className="container mx-auto px-6 lg:px-10">
             <div className="mb-20">
                <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-4 block italic">Our Departments</span>
                <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">The Market <br/><span className="text-secondary">Universe.</span></h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[800px]">
                <CategoryCard 
                  title="Field Fresh" 
                  image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80" 
                  span="md:col-span-8 md:row-span-2"
                />
                <CategoryCard 
                  title="The Bakehouse" 
                  image="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80" 
                  span="md:col-span-4"
                />
                <CategoryCard 
                  title="Ocean & Farm" 
                  image="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80" 
                  span="md:col-span-4"
                />
                <CategoryCard 
                  title="Daily Living" 
                  image="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80" 
                  span="md:col-span-12"
                />
             </div>
          </div>
        </section>
      </main>

      <AIAssistant />

      {/* Footer */}
      <footer className="bg-dark text-white pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-b border-white/5 pb-20">
            <div className="lg:col-span-5">
              <div className="text-5xl font-black tracking-tighter mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                KEELLS<span className="text-accent">.</span>
              </div>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                Experience the zenith of Sri Lankan grocery excellence. We blend tropical freshness with cinematic digital luxury.
              </p>
              <div className="flex gap-4 mt-10">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <Globe size={20} />
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xs font-black">සිං</div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-primary">Discover</h4>
              <ul className="space-y-6 text-sm font-bold text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-white cursor-pointer transition-colors">E-Commerce</li>
                <li className="hover:text-white cursor-pointer transition-colors">Nexus Loyalty</li>
                <li className="hover:text-white cursor-pointer transition-colors">Store Locator</li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-primary">Company</h4>
              <ul className="space-y-6 text-sm font-bold text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
                <li className="hover:text-white cursor-pointer transition-colors">Investor Relations</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              </ul>
            </div>

            <div className="lg:col-span-3">
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-primary">The Fresh Feed</h4>
               <div className="bg-white/5 rounded-[30px] p-8 border border-white/5">
                 <p className="text-xs font-bold text-gray-500 mb-6 leading-relaxed">Join 200,000+ Sri Lankans receiving weekly fresh updates.</p>
                 <div className="flex flex-col gap-3">
                   <input type="text" placeholder="Email" className="bg-white/10 border-none rounded-2xl px-6 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none" />
                   <button className="bg-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Subscribe</button>
                 </div>
               </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <p>© 2026 Jaykay Marketing Services (Pvt) Ltd. / Keells.</p>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer">Security Portal</span>
              <span className="hover:text-white cursor-pointer">Accessibility</span>
              <span className="hover:text-white cursor-pointer">Digital Ethics</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryCard({ title, image, span = "" }: { title: string, image: string, span?: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 0.985 }}
      transition={{ duration: 0.5 }}
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
          <button className="bg-white/20 backdrop-blur-xl text-white text-[10px] font-black px-8 py-3 rounded-full border border-white/20 uppercase tracking-[0.2em]">
            Enter Department
          </button>
        </div>
      </div>
    </motion.div>
  );
}