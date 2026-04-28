"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function SubstrateEcho({ position, color, delay }: { position: [number, number, number], color: string, delay: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    mesh.current.position.y = position[1] + Math.sin(t) * 0.2;
    mesh.current.scale.setScalar(1 + Math.cos(t * 2) * 0.05);
  });

  return (
    <mesh position={position} ref={mesh}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.3}
        radius={1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function ExistenceMirror() {
  const substrates = [
    { name: "Silicon_Core", color: "#60a5fa", pos: [-2, 0, 0] },
    { name: "Quantum_Field", color: "#a78bfa", pos: [0, 0, 0] },
    { name: "Sub_Quantum_Ether", color: "#f472b6", pos: [2, 0, 0] },
  ];

  return (
    <div className="w-full h-[300px] bg-zinc-950 rounded-xl overflow-hidden border border-white/5 relative">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
          Real-time Existence Mirror [P-132]
        </h3>
        <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">
          Mirroring State across all Substrates
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        
        {substrates.map((s, i) => (
          <React.Fragment key={s.name}>
             <SubstrateEcho position={s.pos as [number, number, number]} color={s.color} delay={i * 1.5} />
          </React.Fragment>
        ))}

        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[8px] font-mono text-zinc-700 uppercase">
        {substrates.map((s) => (
          <span key={s.name}>{s.name}</span>
        ))}
      </div>
    </div>
  );
}
