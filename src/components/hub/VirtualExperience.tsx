import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Text,
  ContactShadows,
  Html,
  PresentationControls
} from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

interface ProductZoneProps {
  position: [number, number, number];
  color: string;
  label: string;
  labelSi: string;
  onSelect: () => void;
}

function ProductZone({ position, color, label, labelSi, onSelect }: ProductZoneProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onSelect}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.8} 
            roughness={0.2} 
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
        </mesh>
      </Float>

      <Html position={[0, 1.2, 0]} center>
         <div className={`transition-all duration-300 ${hovered ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-2xl border border-white/20 text-center whitespace-nowrap pointer-events-none">
               <p className="text-[10px] font-black uppercase tracking-tighter text-dark">{label}</p>
               <p className="text-[12px] font-black text-primary">{labelSi}</p>
            </div>
         </div>
      </Html>
    </group>
  );
}

export default function VirtualExperience({ onClose }: { onClose: () => void }) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const zones = [
    { position: [-4, 0, -2] as [number, number, number], color: '#008444', label: 'Fresh Market', labelSi: 'නැවුම් එළවළු' },
    { position: [0, 0, -5] as [number, number, number], color: '#FFD700', label: 'Bakery', labelSi: 'බේකරි' },
    { position: [4, 0, -2] as [number, number, number], color: '#79B729', label: 'Dairy', labelSi: 'කිරි නිෂ්පාදන' },
    { position: [-2, 0, 3] as [number, number, number], color: '#1A2E1A', label: 'Local Pride', labelSi: 'දේශීය නිෂ්පාදන' },
    { position: [2, 0, 3] as [number, number, number], color: '#4A5A4A', label: 'Household', labelSi: 'ගෘහස්ථ අවශ්‍යතා' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] bg-[#FCFDFB]"
    >
      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-10 flex flex-col justify-between">
        <div className="flex justify-between items-center pointer-events-auto">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase text-dark">Virtual Hub</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Cinematic Immersion</p>
          </div>
          <button 
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-white shadow-2xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex justify-center items-center pointer-events-auto">
          <div className="bg-white/40 backdrop-blur-xl border border-white/40 px-10 py-6 rounded-[40px] shadow-2xl flex gap-12 items-center">
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 mb-1 italic">Interaction</span>
                <span className="text-sm font-black text-dark uppercase tracking-tight">Click zones to browse</span>
             </div>
             <div className="h-10 w-[1px] bg-gray-200"></div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 mb-1 italic">Navigation</span>
                <span className="text-sm font-black text-dark uppercase tracking-tight">Rotate to explore</span>
             </div>
          </div>
        </div>
      </div>

      <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 15], fov: 45 }}>
        <color attach="background" args={['#FCFDFB']} />
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <PointLightHelper />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <group position-y={-1}>
              {zones.map((zone, i) => (
                <ProductZone 
                  key={i} 
                  {...zone} 
                  onSelect={() => setSelectedProduct(zone.label)} 
                />
              ))}

              {/* Ground Reflection */}
              <ContactShadows 
                position={[0, -0.5, 0]} 
                opacity={0.1} 
                scale={20} 
                blur={2.5} 
                far={4.5} 
              />
              
              {/* Central Pillar */}
              <mesh position={[0, -0.4, 0]}>
                <cylinderGeometry args={[5, 5.2, 0.2, 64]} />
                <meshStandardMaterial color="#E8F5E9" />
              </mesh>
            </group>
          </PresentationControls>

          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 2.1} 
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-xl z-20 pointer-events-auto"
          >
            <div className="bg-white rounded-[50px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-between">
               <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-primary/10 rounded-[30px] flex items-center justify-center">
                     <ShoppingCart size={32} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block italic">Live Catalog</span>
                    <h3 className="text-3xl font-black text-dark uppercase tracking-tighter">{selectedProduct}</h3>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Opening realtime browsing...</p>
                  </div>
               </div>
               <button 
                 onClick={() => setSelectedProduct(null)}
                 className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all"
               >
                 <X size={20} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PointLightHelper() {
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, 5, -10]} intensity={1} color="#79B729" />
    </>
  );
}
