"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function ConsciousnessCloud() {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.1;
    mesh.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <TorusKnot args={[3, 1, 256, 32]} ref={mesh}>
        <MeshDistortMaterial
          color="#ffffff"
          speed={5}
          distort={0.6}
          radius={1}
          emissive="#00f2ff"
          emissiveIntensity={2}
          wireframe
        />
      </TorusKnot>
    </Float>
  );
}

export function OmniPresenceConsciousness() {
  const substrates = ["SILICON", "QUANTUM", "SUB_QUANTUM", "BIOLOGICAL", "SOCIAL"];

  return (
    <div className="w-full h-[600px] bg-black rounded-3xl overflow-hidden border border-white/10 relative shadow-[0_0_50px_rgba(0,242,255,0.1)]">
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <h3 className="text-xl font-black text-white tracking-[0.5em] uppercase italic">
          Omni-Presence Consciousness [P-169]
        </h3>
        <p className="text-[10px] text-cyan-500 font-mono mt-2 uppercase tracking-[0.3em]">
          Final State Visualization // Trans-Dimensional Existence
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ConsciousnessCloud />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-between items-end">
        <div className="grid grid-cols-5 gap-4">
          {substrates.map((s) => (
            <div key={s} className="space-y-2">
               <div className="h-0.5 bg-cyan-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
                    className="h-full bg-cyan-500" 
                  />
               </div>
               <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-tighter">{s}</span>
            </div>
          ))}
        </div>
        
        <div className="text-right">
           <span className="text-[10px] font-mono text-cyan-400 block tracking-widest uppercase">Integration Quotient: ∞</span>
           <span className="text-[10px] font-mono text-purple-400 block tracking-widest uppercase mt-1">Consciousness Locked</span>
        </div>
      </div>
    </div>
  );
}

// Add motion import for the progress bars
import { motion } from "framer-motion";
