import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../../lib/store';
import { useTranslation } from 'react-i18next';

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeItem, updateQuantity } = useStore();
  const { t } = useTranslation();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isCheckoutLoading, setIsCheckoutLoading] = React.useState(false);
  const { setNotification } = useStore();

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      
      if (!response.ok) throw new Error('Payment service unavailable');
      
      const data = await response.json();
      console.log('Payment Intent Created:', data.clientSecret);
      
      setTimeout(() => {
        setNotification({
          type: 'success',
          message: 'Payment Successful! Thank you for choosing Keells.'
        });
        useStore.getState().clearCart();
        setCartOpen(false);
        setIsCheckoutLoading(false);
        
        // Clear notification after auto-clearing time
        setTimeout(() => setNotification(null), 5000);
      }, 2000);
      
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: `Checkout Error: ${err.message}`
      });
      setIsCheckoutLoading(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center gap-4">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-xl font-black tracking-tighter uppercase">Your Basket</h2>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Basket is empty</h3>
                    <p className="text-sm text-gray-500 font-medium mt-2">Add some fresh items to get started!</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black text-sm uppercase tracking-tight line-clamp-1">{item.name}</h4>
                        <p className="text-primary font-black mt-1">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-gray-50 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Order Total</span>
                  <span className="text-2xl font-black text-primary">Rs. {total.toLocaleString()}</span>
                </div>
                <button 
                  disabled={isCheckoutLoading}
                  onClick={handleCheckout}
                  className="w-full py-6 bg-primary text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {isCheckoutLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Checkout Now'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
