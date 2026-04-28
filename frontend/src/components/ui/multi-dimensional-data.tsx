"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function HyperDataCloud() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      // 3D Spatial Dimensions
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const colors = useMemo(() => {
    const c = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      // 4th Dimension (Time/Evolution) mapped to Color (Hue)
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
      c[i * 3] = color.r;
      c[i * 3 + 1] = color.g;
      c[i * 3 + 2] = color.b;
    }
    return c;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(2000);
    for (let i = 0; i < 2000; i++) {
      // 5th Dimension (Complexity/Importance) mapped to Size
      s[i] = Math.random() * 0.2;
    }
    return s;
  }, []);

  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Points positions={points} colors={colors} sizes={sizes}>
        <PointMaterial
          transparent
          vertexColors
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export function MultiDimensionalData() {
  return (
    <div className="w-full h-[400px] bg-zinc-950 rounded-xl overflow-hidden border border-purple-500/20 relative">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-xs font-bold text-purple-400 tracking-widest uppercase">
          Multi-Dimensional Data Engine [P-83]
        </h3>
        <p className="text-[9px] text-zinc-500 font-mono mt-1 uppercase">
          Dimensions: [X, Y, Z, Hue, Scale, Opacity]
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <HyperDataCloud />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 bg-black/40 backdrop-blur-sm p-3 rounded border border-white/5">
        <div className="space-y-1">
          <div className="flex justify-between gap-8 items-center">
            <span className="text-[8px] text-zinc-500 uppercase">Complexity Index</span>
            <span className="text-[10px] text-purple-400 font-mono">8.42 φ</span>
          </div>
          <div className="flex justify-between gap-8 items-center">
            <span className="text-[8px] text-zinc-500 uppercase">Entropy Level</span>
            <span className="text-[10px] text-cyan-400 font-mono">LOW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
