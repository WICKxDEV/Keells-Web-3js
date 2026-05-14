import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types';
import confetti from 'canvas-confetti';
import { useStore } from '../../lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { i18n } = useTranslation();
  const isSi = i18n.language === 'si';
  const { addItem } = useStore();

  const handleAddToCart = () => {
    addItem(product);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#006B3F', '#FFD700', '#FFFFFF']
    });
  };

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-white rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-50 flex flex-col items-center p-6"
    >
      {/* Badge */}
      {product.isFresh && (
        <div className="absolute top-6 left-6 z-10 bg-[#E8F5E9] text-primary text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
          Farmer's Choice
        </div>
      )}

      {/* Image Container */}
      <div className="w-full aspect-square overflow-hidden bg-[#FDFDFD] rounded-[30px] mb-6 relative">
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={18} />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="w-full text-center">
        <span className="text-[10px] font-black tracking-[0.2em] text-primary/60 uppercase mb-2 block italic">
          {product.category}
        </span>
        <h3 className="text-xl font-black text-dark mb-2 group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">
          {isSi ? product.nameSi : product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className={`${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-200'}`} />
          ))}
          <span className="text-[10px] font-black text-muted ml-1">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-4 w-full bg-gray-50/50 rounded-3xl p-3">
          <div className="flex flex-col text-left ml-2">
            <span className="text-sm font-black text-dark">
              Rs. {product.price}
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Per Kilogram</span>
          </div>
          <button 
             onClick={handleAddToCart}
             className="bg-primary text-white p-3.5 rounded-2xl hover:scale-110 active:scale-90 transition-all shadow-lg shadow-primary/20"
          >
            <ShoppingCart size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
