import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Chrome, LogOut, ArrowRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { auth, db } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../FirebaseProvider';
import { User as FirestoreUser } from '../../types';

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, setNotification } = useStore();
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Ensure user profile exists
      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        const newUser: FirestoreUser = {
          uid: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || 'Keells Guest',
          role: result.user.email === 'isuruwickramasinghe.sliate@gmail.com' ? 'admin' : 'customer',
          loyaltyPoints: 0
        };
        await setDoc(userRef, newUser);
      }

      setAuthModalOpen(false);
      setNotification({ type: 'success', message: 'Signed in successfully!' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setNotification({ type: 'success', message: 'Welcome back!' });
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        
        const newUser: FirestoreUser = {
          uid: result.user.uid,
          email: result.user.email || '',
          displayName: 'Keells Guest',
          role: result.user.email === 'isuruwickramasinghe.sliate@gmail.com' ? 'admin' : 'customer',
          loyaltyPoints: 0
        };
        await setDoc(doc(db, 'users', result.user.uid), newUser);
        
        setNotification({ type: 'success', message: 'Account created successfully!' });
      }
      setAuthModalOpen(false);
      setTimeout(() => setNotification(null), 3000);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAuthModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="relative p-10">
              <button 
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all"
              >
                <X size={20} />
              </button>

              {user ? (
                <div className="space-y-10 text-center pt-8">
                  <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mx-auto">
                    <User size={40} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase whitespace-pre-wrap">Welcome Back,\n{user.email}</h2>
                    <p className="text-gray-500 font-medium mt-3">You are currently signed in.</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full py-6 bg-dark text-white rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-red-600 transition-all"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase">{isLogin ? 'Welcome Back' : 'Join Keells'}</h2>
                    <p className="text-gray-500 font-medium mt-2">Experience the zenith of Sri Lankan luxury retail.</p>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                          type="password" 
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 focus:border-primary focus:ring-0 transition-all font-bold text-sm"
                          required
                        />
                      </div>
                    </div>

                    <button className="w-full py-6 bg-primary text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                  </form>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                    <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-gray-400"><span className="bg-white px-4">OR</span></div>
                  </div>

                  <button 
                    onClick={handleGoogleSignIn}
                    className="w-full py-5 bg-white border border-gray-100 text-dark rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-gray-50 transition-all"
                  >
                    <Chrome size={18} />
                    Continue with Google
                  </button>

                  <p className="text-center text-xs font-bold text-gray-500">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary hover:underline"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
