"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InfiniteCreativity() {
  const [styleIndex, setStyleIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = [
    { name: "Neo-Biological Glass", era: "2026.4", palette: ["#e2e8f0", "#94a3b8", "#1e293b"] },
    { name: "Quantum Geometric Flux", era: "2026.8", palette: ["#00f2ff", "#7000ff", "#000000"] },
    { name: "Sub-Quantum Ether", era: "2027.2", palette: ["#ffffff", "#fbcfe8", "#db2777"] },
    { name: "Absolute Reality Zenith", era: "2028.0", palette: ["#fbbf24", "#78350f", "#000000"] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGenerating(true);
      setTimeout(() => {
        setStyleIndex((prev) => (prev + 1) % styles.length);
        setIsGenerating(false);
      }, 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-zinc-950 border-white/5 overflow-hidden flex flex-col min-h-[350px]">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div>
           <h3 className="text-xs font-bold text-amber-500 tracking-widest uppercase">
             Infinite Creativity Engine [P-118]
           </h3>
           <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">
             Autonomously Evolving UI Paradigms
           </p>
        </div>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-amber-500 animate-pulse" : "bg-zinc-800"}`} />
           <span className="text-[8px] font-mono text-zinc-500 uppercase">{isGenerating ? "Synthesizing" : "Standby"}</span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isGenerating ? (
            <motion.div
              key={styleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-500/60 uppercase">Current Paradigm</span>
                <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                  {styles[styleIndex].name}
                </h4>
              </div>

              <div className="flex gap-2">
                {styles[styleIndex].palette.map((color, i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-lg border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="p-4 border border-white/5 rounded-xl bg-white/5 backdrop-blur-md">
                 <p className="text-[10px] text-zinc-400 italic leading-relaxed">
                   "Aesthetic style derived from sub-quantum harmonic resonance. This paradigm optimizes for multi-dimensional data ingestion and emotional stabilization."
                 </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                Merging Latent Creative Spaces...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Abstract shapes in background */}
        <div className="absolute inset-0 -z-10 opacity-20">
           <motion.div 
             animate={{ 
               rotate: [0, 360],
               scale: [1, 1.2, 1]
             }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-12 -right-12 w-48 h-48 border border-amber-500/20 rounded-full" 
           />
        </div>
      </div>

      <div className="p-4 bg-amber-500/5 flex justify-between items-center text-[8px] font-mono text-amber-900 uppercase">
        <span>Iteration: {Math.floor(Date.now() / 100000)}</span>
        <span>Creative Entropy: MINIMAL</span>
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
}
