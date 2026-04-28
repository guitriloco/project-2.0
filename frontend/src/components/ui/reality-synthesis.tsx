"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Torus, MeshDistortMaterial, Float, Text } from "@react-three/drei";
import * as THREE from "three";

function SynthesisPlane({ position, color, label, distortion }: { position: [number, number, number], color: string, label: string, distortion: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={distortion}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
        />
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
}

function RealityCore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    coreRef.current.rotation.x = t * 0.2;
    coreRef.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#00f2ff"
        emissiveIntensity={2}
        wireframe
      />
    </mesh>
  );
}

export function RealitySynthesis() {
  return (
    <div className="w-full h-[500px] bg-black rounded-xl overflow-hidden border border-white/10 relative">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-sm font-bold text-cyan-400 tracking-[0.3em] uppercase">
          Reality Synthesis [P-93]
        </h3>
        <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
          Merging: [Digital, Physical, XR] → ABSOLUTE
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        
        <RealityCore />

        {/* Digital Reality */}
        <SynthesisPlane 
          position={[0, 0, 0]} 
          color="#00f2ff" 
          label="DIGITAL" 
          distortion={0.3} 
        />
        
        {/* Physical Reality */}
        <SynthesisPlane 
          position={[0, 0, 0]} 
          color="#ff00f2" 
          label="PHYSICAL" 
          distortion={0.5} 
        />
        
        {/* XR Reality */}
        <SynthesisPlane 
          position={[0, 0, 0]} 
          color="#f2ff00" 
          label="XR" 
          distortion={0.7} 
        />

        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md p-4 rounded border border-white/5 max-w-[200px]">
          <span className="text-[8px] text-zinc-500 uppercase block mb-1 font-mono">Sync Status</span>
          <p className="text-[10px] text-zinc-300 italic leading-tight">
            "The boundaries are dissolving. Reality is now a synthesized stream of absolute execution."
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-cyan-500 font-mono block">COHESION: 99.9%</span>
          <span className="text-[10px] text-purple-500 font-mono block">LATENCY: NULL</span>
        </div>
      </div>
    </div>
  );
}
