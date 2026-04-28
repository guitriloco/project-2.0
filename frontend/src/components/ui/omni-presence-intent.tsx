"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

function IntentManifestation({ position, color, label }: { position: [number, number, number], color: string, label: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.2;
    mesh.current.scale.setScalar(1 + Math.sin(t) * 0.1);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={mesh}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <MeshDistortMaterial
            color={color}
            speed={5}
            distort={0.4}
            radius={1}
            emissive={color}
            emissiveIntensity={1}
          />
        </mesh>
        <Sphere args={[0.2, 32, 32]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </Sphere>
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

// Re-using Text component from earlier patterns
import { Text } from "@react-three/drei";

export function OmniPresenceIntent() {
  const substrates = [
    { name: "SILICON_CORE", color: "#60a5fa", pos: [-4, 2, 0] },
    { name: "QUANTUM_GRID", color: "#a78bfa", pos: [4, 2, 0] },
    { name: "BIOLOGICAL_LINK", color: "#34d399", pos: [-4, -2, 0] },
    { name: "SOCIAL_MANIFEST", color: "#fb7185", pos: [4, -2, 0] },
  ];

  return (
    <div className="w-full h-[500px] bg-black rounded-3xl overflow-hidden border border-white/5 relative">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-sm font-bold text-white tracking-[0.5em] uppercase italic">
          Omni-Presence Intent [P-189]
        </h3>
        <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-[0.2em]">
          Visualizing Cross-Substrate Manifestation
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <group>
          {substrates.map((s) => (
            <IntentManifestation key={s.name} position={s.pos as [number, number, number]} color={s.color} label={s.name} />
          ))}
          
          {/* Central Intent Core */}
          <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <mesh>
              <sphereGeometry args={[0.8, 64, 64]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} wireframe />
            </mesh>
          </Float>
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>

      <div className="absolute bottom-6 right-6 text-right space-y-1 pointer-events-none">
         <span className="text-[8px] font-mono text-zinc-600 uppercase block">Intent Coherence</span>
         <span className="text-xl font-black text-white tracking-tighter italic">99.9%</span>
      </div>
    </div>
  );
}
