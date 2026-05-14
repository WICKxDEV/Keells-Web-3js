import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Facebook, 
  Instagram, 
  Twitter as TwitterIcon, 
  Linkedin,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useStore } from '../lib/store';

export default function ContactPage() {
  const { setNotification } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({
      type: 'success',
      message: 'Message sent successfully! Our team will reach out soon.'
    });
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  const contactMethods = [
    {
      icon: <Phone size={24} className="text-primary" />,
      title: "Direct Line",
      value: "+94 11 230 3500",
      desc: "Available 24/7 for critical support"
    },
    {
      icon: <Mail size={24} className="text-secondary" />,
      title: "Email Support",
      value: "care@keellssuper.com",
      desc: "Typical response within 2 hours"
    },
    {
      icon: <MapPin size={24} className="text-accent" />,
      title: "HQ Location",
      value: "No. 117, Sir Chittampalam A. Gardiner Mawatha, Colombo 02",
      desc: "Headquarters & Digital Center"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-[#FCFDFB] min-h-screen">
      <div className="container mx-auto px-6 lg:px-10">
        
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-end gap-8"
          >
            <div>
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase mb-6 block italic">Support Portal</span>
              <h1 className="text-7xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.75]">
                Get in <br/> <span className="text-secondary">Touch.</span>
              </h1>
            </div>
            <p className="text-xl text-gray-500 font-light max-w-sm leading-relaxed lg:mb-4">
              Connecting Sri Lanka through premium retail experiences. We're here to listen, support, and innovate.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-12 mb-32">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-12 lg:col-span-7 bg-white rounded-[50px] p-10 lg:p-16 border border-gray-100 shadow-2xl"
          >
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4">
              <MessageSquare className="text-primary" size={32} />
              Drop a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inquiry Subject</label>
                <select 
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option>General Inquiry</option>
                  <option>E-Commerce Support</option>
                  <option>Nexus Rewards</option>
                  <option>Supplier Portal</option>
                  <option>Corporate Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Message</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help you today?"
                  className="w-full bg-gray-50 border-none rounded-3xl px-8 py-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-dark text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-xl group"
              >
                Dispatch Message
                <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            {contactMethods.map((method, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl group hover:border-primary transition-all flex items-start gap-8"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 opacity-60 italic">{method.title}</h3>
                  <p className="text-xl font-black text-dark mb-2 tracking-tight group-hover:text-primary transition-colors">{method.value}</p>
                  <p className="text-sm text-gray-400 font-medium">{method.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Connect */}
            <div className="bg-dark rounded-[40px] p-10 flex flex-col items-center justify-center text-center">
               <h4 className="text-white text-xl font-black uppercase tracking-tighter mb-8 italic">Join the Movement</h4>
               <div className="flex gap-6">
                  {[Facebook, Instagram, TwitterIcon, Linkedin].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      href="#"
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-primary transition-all"
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Global Network Section */}
        <div className="bg-gray-50 rounded-[50px] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Network Uptime</span>
               </div>
               <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">Operating <span className="text-primary italic">150+</span> outlets nationwide.</h3>
               <p className="text-gray-400 font-medium">Find our nearest store for the ultimate fresh market experience in your neighborhood.</p>
            </div>
            <button className="px-12 py-6 bg-white border border-gray-100 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:shadow-2xl transition-all">
               Store Locator
               <ArrowUpRight size={18} />
            </button>
        </div>

      </div>
    </div>
  );
}
