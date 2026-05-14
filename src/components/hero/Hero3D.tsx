import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function BrandCore() {
  return (
    <group>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 100, 100]} scale={1.4}>
          <MeshDistortMaterial
            color="#008444"
            distort={0.4}
            speed={3}
            roughness={0.1}
            metalness={0.8}
            emissive="#004d28"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
      
      {/* Floating Freshness Particles */}
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={4} rotationIntensity={5} floatIntensity={3} position={[(Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6]}>
          <Sphere args={[0.08, 16, 16]}>
            <meshStandardMaterial color={i % 2 === 0 ? "#79B729" : "#FFD700"} roughness={0} metalness={0.5} />
          </Sphere>
        </Float>
      ))}

      {/* Brand Halo */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.015, 16, 100]} />
          <meshStandardMaterial color="#79B729" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative h-screen min-h-[800px] w-full bg-[#FCFDFB] flex items-center overflow-hidden px-6 lg:px-10">
      {/* Cinematic Background Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-full blur-[150px] opacity-40 z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#F1F8E9] rounded-full blur-[120px] opacity-30 z-0"></div>

      <div className="container mx-auto grid grid-cols-12 gap-8 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 lg:col-span-12 xl:col-span-7"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-[#E8F5E9] text-primary rounded-full w-fit mb-10 shadow-[0_10px_30px_rgba(0,132,68,0.1)]"
          >
            <div className="relative">
              <span className="w-2.5 h-2.5 bg-primary rounded-full block"></span>
              <span className="absolute inset-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t('welcome')}</span>
          </motion.div>
          
          <h1 className="text-[75px] md:text-[110px] lg:text-[140px] leading-[0.8] font-black tracking-tighter text-dark mb-10 uppercase">
            Freshness <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
              Redefined.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-muted max-w-xl mb-14 leading-relaxed">
            {t('hero_subtitle')}
            <span className="block mt-6 font-black text-primary italic text-lg opacity-90 tracking-tight">
              ශ්‍රී ලංකාවේ අංක 1 සුපිරි වෙළඳසැල් අත්දැකීම.
            </span>
          </p>

          <div className="flex flex-wrap gap-6">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group px-14 py-7 bg-primary text-white rounded-[24px] font-black text-xs tracking-[0.3em] uppercase shadow-[0_25px_60px_rgba(0,132,68,0.3)] transition-all flex items-center gap-4"
            >
              <ShoppingBag size={18} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
              {t('shop_now')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#fdfdfd' }}
              whileTap={{ scale: 0.98 }}
              className="px-14 py-7 bg-white border border-gray-100 text-dark rounded-[24px] font-black text-xs tracking-[0.3em] uppercase flex items-center gap-4 shadow-2xl transition-all"
            >
              Virtual Hub
              <ArrowRight size={18} strokeWidth={3} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Cinematic 3D Element Container */}
      <div className="absolute top-0 right-[-15%] xl:right-[-10%] w-[80vw] lg:w-[60vw] h-full z-0 pointer-events-none lg:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 2]}>
          <ambientLight intensity={1.5} />
          <spotLight position={[20, 20, 20]} angle={0.2} penumbra={1} intensity={2.5} color="#E8F5E9" />
          <pointLight position={[-15, -15, -15]} intensity={1.5} color="#C8E6C9" />
          <Suspense fallback={null}>
            <BrandCore />
            <Environment preset="studio" />
            <ContactShadows position={[0, -2.8, 0]} opacity={0.25} scale={15} blur={3.5} far={4.5} />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.8} 
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </div>

      {/* Floating Info Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 right-12 hidden xl:flex items-center gap-8 z-20 bg-white/40 backdrop-blur-2xl p-8 rounded-[40px] border border-white/40 shadow-2xl"
      >
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 opacity-60 italic">Online Reach</span>
            <span className="text-3xl font-black text-dark tracking-tighter">Col 1-15 <span className="text-secondary text-sm">active</span></span>
          </div>
          <div className="h-full w-[1px] bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 opacity-60 italic">Quality Index</span>
            <span className="text-3xl font-black text-dark tracking-tighter">99.2% <span className="text-accent text-sm">fresh</span></span>
          </div>
        </div>
      </motion.div>

      {/* Vertical Brand Scroll */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden 2xl:flex flex-col gap-20 items-center overflow-hidden h-[400px]">
        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr] animate-marquee">
          KEELLS SUPERMARKET • THE HUB OF FRESHNESS • KEELLS SUPERMARKET • THE HUB OF FRESHNESS
        </div>
      </div>
    </section>
  );
}
