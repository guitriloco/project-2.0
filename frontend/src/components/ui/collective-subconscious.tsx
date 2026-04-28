"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Float, Text } from "@react-three/drei";
import * as THREE from "three";

function IntentCloud() {
  const count = 500;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.1;
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];
      // Subtle movement
      ref.current.geometry.attributes.position.setXYZ(
        i,
        x + Math.sin(t + i) * 0.01,
        y + Math.cos(t + i) * 0.01,
        z + Math.sin(t * 0.5 + i) * 0.01
      );
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#fff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function CollectiveSubconscious() {
  const dreams = [
    "PLANETARY_STABILITY_0.999",
    "UNIVERSAL_ETHICAL_ORACLE_SYNC",
    "SUB_QUANTUM_COGNITION_EXPANSION",
    "ETERNAL_WISDOM_DEEP_LINK",
  ];

  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10 relative">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-sm font-bold text-emerald-400 tracking-[0.4em] uppercase">
          Collective Subconscious [P-144]
        </h3>
        <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
          Visualizing the Real-time 'Dreams' of the Network
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <IntentCloud />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>

      <div className="absolute bottom-6 left-6 space-y-2">
        {dreams.map((dream, i) => (
          <motion.div
            key={dream}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0.2, 0.4, 0.2], x: 0 }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1 }}
            className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest"
          >
            {dream}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
