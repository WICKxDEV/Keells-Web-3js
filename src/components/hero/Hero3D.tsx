import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={1.8}>
        <MeshDistortMaterial
          color="#006B3F"
          attach="material"
          distort={0.4}
          speed={4}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero3D() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative h-screen w-full bg-[#FCFDFB] flex items-center overflow-hidden px-6 lg:px-10">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-full blur-[120px] opacity-60 z-0"></div>
      <div className="absolute bottom-[-150px] left-[-50px] w-[400px] h-[400px] bg-[#F1F8E9] rounded-full blur-[100px] opacity-40 z-0"></div>

      <div className="container mx-auto grid grid-cols-12 gap-8 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-12 lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F5E9] text-primary rounded-full w-fit mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">{t('welcome')}</span>
          </div>
          
          <h1 className="text-[70px] md:text-[100px] lg:text-[120px] leading-[0.85] font-black tracking-tighter text-dark mb-6 uppercase">
            Freshness <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Redefined.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl font-light text-muted max-w-lg mb-10 leading-relaxed">
            {t('hero_subtitle')}
            <span className="block mt-4 font-bold italic text-primary font-serif italic text-base">
              අලුත්ම නැවුම් බව, දැන් ඔබේ ඇඟිලි තුඩුවලට.
            </span>
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
              {t('shop_now')}
            </button>
            <button className="px-10 py-5 bg-white border border-gray-100 text-dark rounded-2xl font-black text-xs tracking-widest uppercase flex items-center gap-2 hover:shadow-xl transition-all">
              Take 3D Tour
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none lg:pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <AnimatedSphere />
            <Environment preset="city" />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={10} blur={2.5} far={4.5} />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-xs text-gray-400 font-mono rotate-90 origin-left">
        ESTABLISHED 1991 • KEELLS SRI LANKA
      </div>
    </section>
  );
}