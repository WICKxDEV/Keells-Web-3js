import React, { useEffect } from 'react';
import { collection, query, onSnapshot, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useStore } from '../lib/store';

export default function NotificationSystem() {
  const { notification, setNotification } = useStore();

  useEffect(() => {
    // Listen for new products or stock updates
    const q = query(collection(db, 'products'), orderBy('updatedAt', 'desc'), limit(1));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          const data = change.doc.data();
          setNotification({
            type: 'info',
            message: `Fresh update! ${data.name} is now back in stock.`
          });
          
          setTimeout(() => setNotification(null), 5000);
        }
      });
    });

    return () => unsubscribe();
  }, [setNotification]);

  const Icon = notification?.type === 'success' ? CheckCircle : 
               notification?.type === 'error' ? AlertTriangle : Bell;

  const colorClass = notification?.type === 'success' ? 'bg-primary' : 
                     notification?.type === 'error' ? 'bg-red-500' : 'bg-secondary text-primary';

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          className="fixed top-24 right-6 z-[200] max-w-xs bg-white/90 backdrop-blur-xl border border-gray-100 p-6 rounded-[30px] shadow-2xl flex gap-4 items-center"
        >
          <div className={`w-12 h-12 ${colorClass} rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary/20`}>
            <Icon size={20} className={notification.type === 'info' ? 'animate-bounce' : ''} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">
              {notification.type === 'success' ? 'Transaction Success' : 'Live Update'}
            </span>
            <p className="text-sm font-bold text-dark leading-tight">{notification.message}</p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="absolute top-2 right-2 text-gray-300 hover:text-dark transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
