import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Gift, Zap, Star, LayoutGrid, ArrowRight, Wallet, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../components/FirebaseProvider';

export default function LoyaltyPage() {
  const { t } = useTranslation();
  const { profile } = useAuth();

  const benefits = [
    {
      icon: <Zap className="text-secondary" />,
      title: "Instant Points",
      desc: "Earn 1 point for every Rs. 100 spent across all Keells branches and online."
    },
    {
      icon: <Gift className="text-primary" />,
      title: "Exclusive Vouchers",
      desc: "Personalized monthly coupons based on your favorite fresh picks."
    },
    {
      icon: <Star className="text-accent" />,
      title: "Priority Access",
      desc: "Early access to seasonal product launches and limited-time offers."
    },
    {
      icon: <Heart className="text-red-500" />,
      title: "Charity Matching",
      desc: "Choose to donate your points to local farmer welfare programs."
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-[#FCFDFB] min-h-screen">
      <div className="container mx-auto px-6 lg:px-10">
        
        {/* Hero Section */}
        <div className="grid grid-cols-12 gap-12 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 text-dark rounded-full mb-8">
               <ShieldCheck className="text-accent" size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Nexus Loyalty Network</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-10">
              Nexus <br/> <span className="text-primary">Rewards.</span>
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-xl leading-relaxed mb-12">
              The most rewarding supermarket loyalty program in Sri Lanka. Designed for those who value freshness and quality.
            </p>
            
            {profile ? (
              <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-dark rounded-full flex items-center justify-center text-white text-3xl font-black">
                    {profile.displayName?.[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{profile.displayName}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Member • Blue Tier</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black text-primary uppercase mb-1">Total Points</span>
                  <span className="text-5xl font-black text-dark tracking-tighter">{profile.loyaltyPoints}</span>
                </div>
              </div>
            ) : (
              <button className="px-12 py-6 bg-dark text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all">
                Join Nexus Rewards
                <ArrowRight size={18} />
              </button>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-12 lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-secondary/10 blur-[120px] rounded-full"></div>
            <div className="relative bg-gradient-to-br from-dark to-primary/80 p-1 bg-white rounded-[50px] shadow-2xl overflow-hidden aspect-square flex items-center justify-center group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="text-center z-10">
                  <div className="text-7xl font-black text-white italic tracking-tighter mb-2 group-hover:scale-110 transition-transform cursor-pointer">NEXUS</div>
                  <div className="text-accent text-[10px] font-black uppercase tracking-[1em]">PLATINUM</div>
               </div>
               
               {/* Animated Rings */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 border border-white/10 rounded-full animate-spin-slow"></div>
                  <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-reverse-spin"></div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-5xl font-black uppercase tracking-tighter">Your <br/> <span className="text-secondary text-stroke-primary">Privileges.</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] max-w-xs md:text-right">Multi-tier reward system designed for enterprise-level benefits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl group hover:border-primary transition-all"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{b.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tier Stats */}
        <div className="bg-dark rounded-[50px] p-12 lg:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[150px] -z-0"></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div>
                <span className="text-7xl font-black text-white italic tracking-tighter">2M+</span>
                <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-4">Active Nexus Members</p>
              </div>
              <div>
                <span className="text-7xl font-black text-white italic tracking-tighter">150+</span>
                <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-4">Merchant Partners</p>
              </div>
              <div>
                <span className="text-7xl font-black text-white italic tracking-tighter">Rs. 1B+</span>
                <p className="text-accent text-[10px] font-black uppercase tracking-widest mt-4">Rewards Redeemed</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
