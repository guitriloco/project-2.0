"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Box, Cylinder } from "@react-three/drei";

export function InfrastructureSynthesis() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [progress, setProgress] = useState(0);

  const startSynthesis = () => {
    setIsPrinting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPrinting(false);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 p-6 backdrop-blur-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-1">
            Infrastructure Synthesis [P-88]
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase">
            Status: {isPrinting ? "Synthesizing Hardware..." : "Ready for Physical Deployment"}
          </p>
        </div>
        <button 
          onClick={startSynthesis}
          disabled={isPrinting}
          className={`px-3 py-1 rounded text-[9px] font-bold tracking-tighter uppercase transition-colors ${
            isPrinting ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-400"
          }`}
        >
          {isPrinting ? "PRINTING..." : "START SYNTHESIS"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3D Component Preview */}
        <div className="h-[250px] bg-black rounded-lg border border-white/5 relative">
          <div className="absolute top-2 left-2 z-10 text-[8px] text-zinc-600 font-mono uppercase">
            Preview: Neural Processor Node v7.4
          </div>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Stage environment="city" intensity={0.5}>
               <group rotation={[0, Math.PI / 4, 0]}>
                 <Box args={[2, 0.5, 2]}>
                   <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
                 </Box>
                 <Cylinder args={[0.3, 0.3, 1, 32]} position={[0, 0.5, 0]}>
                   <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
                 </Cylinder>
               </group>
            </Stage>
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </div>

        {/* Synthesis Parameters */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-zinc-500 uppercase">Synthesis Progress</span>
              <span className="text-yellow-500">{progress}%</span>
            </div>
            <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-yellow-500 transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-white/5 rounded bg-white/5">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">Material</span>
              <span className="text-[10px] font-mono text-zinc-200">Graphene Composite</span>
            </div>
            <div className="p-3 border border-white/5 rounded bg-white/5">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">Structural Integrity</span>
              <span className="text-[10px] font-mono text-emerald-500">OPTIMAL</span>
            </div>
            <div className="p-3 border border-white/5 rounded bg-white/5">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">Target Node</span>
              <span className="text-[10px] font-mono text-zinc-200">BERLIN-HUB-01</span>
            </div>
            <div className="p-3 border border-white/5 rounded bg-white/5">
              <span className="block text-[8px] text-zinc-500 uppercase mb-1">ETA</span>
              <span className="text-[10px] font-mono text-zinc-200">14m 22s</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Minimal Card component since we are in a sub-file
function Card({ children, className }: any) {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
}
