import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/navigation/Navbar';
import AIAssistant from './components/ai/AIAssistant';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LoyaltyPage from './pages/LoyaltyPage';
import ContactPage from './pages/ContactPage';
import CartDrawer from './components/cart/CartDrawer';
import AuthModal from './components/auth/AuthModal';
import NotificationSystem from './components/NotificationSystem';
import AdminDashboard from './components/admin/AdminDashboard';
import VirtualExperience from './components/hub/VirtualExperience';
import { useStore } from './lib/store';
import { seedDatabase } from './lib/seed';
import { useAuth } from './components/FirebaseProvider';

export default function App() {
  const { pathname } = useLocation();
  const { isAdminConsoleOpen, setAdminConsoleOpen, isVirtualHubOpen, setVirtualHubOpen } = useStore();
  const { isAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFDFB] text-dark font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/loyalty" element={<LoyaltyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

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
            </div>
            
            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-primary">Discover</h4>
              <ul className="space-y-6 text-sm font-bold text-gray-500">
                <li><Link to="/" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">E-Commerce</Link></li>
                <li><Link to="/loyalty" className="hover:text-white transition-colors">Nexus Loyalty</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Store Locator</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-primary">Company</h4>
              <ul className="space-y-6 text-sm font-bold text-gray-500">
                <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Investor Relations</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
               <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-primary">The Fresh Feed</h4>
               <div className="bg-white/5 rounded-[30px] p-8 border border-white/5">
                 <p className="text-xs font-bold text-gray-500 mb-6 leading-relaxed">Join 200,000+ Sri Lankans receiving weekly fresh updates.</p>
                 <div className="flex flex-col gap-3">
                   <input 
                     type="email" 
                     placeholder="Email" 
                     className="bg-white/10 border-none rounded-2xl px-6 py-4 text-xs font-bold focus:ring-1 focus:ring-primary outline-none" 
                   />
                   <button className="bg-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                     Subscribe
                   </button>
                 </div>
               </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <p>© 2026 Developed by <a href="https://github.com/WICKxDEV" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WICKxDEV</a></p>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer transition-colors">Security Portal</span>
              <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
              <span className="hover:text-white cursor-pointer transition-colors">Digital Ethics</span>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <AuthModal />
      <NotificationSystem />
      <AnimatePresence>
        {isAdmin && isAdminConsoleOpen && (
          <AdminDashboard onClose={() => setAdminConsoleOpen(false)} />
        )}
        {isVirtualHubOpen && (
          <VirtualExperience onClose={() => setVirtualHubOpen(false)} />
        )}
      </AnimatePresence>
      <AIAssistant />
    </div>
  );
}
