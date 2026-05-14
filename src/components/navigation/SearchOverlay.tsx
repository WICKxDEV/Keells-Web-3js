import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  
  const results = FEATURED_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center p-6 md:p-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-10 border-b border-gray-100 flex items-center gap-6">
              <SearchIcon size={32} className="text-primary" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search fresh products, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-3xl font-black focus:ring-0 outline-none placeholder:text-gray-200 tracking-tighter uppercase"
              />
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all border border-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 bg-gray-50/50">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Suggestions</span>
              </div>
              
              <div className="space-y-4">
                {query.length > 0 ? (
                  results.length > 0 ? (
                    results.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 group cursor-pointer hover:border-primary transition-all">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-black text-sm uppercase tracking-tight">{product.name}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</p>
                          </div>
                        </div>
                        <ArrowRight size={20} className="text-gray-200 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm font-bold text-gray-400 italic">No products found matching your search.</p>
                  )
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {['Fresh Milk', 'Organic Tea', 'Red Rice', 'Spices', 'Bakery'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-6 py-3 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
