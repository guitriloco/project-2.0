"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function UltimateUI() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [syncState, setSyncState] = useState(0);

  const predictions = [
    "EXPAND_NEURAL_RESONANCE",
    "MERGE_SUB_QUANTUM_CORE",
    "ACTIVATE_ETERNAL_PRESENCE",
    "SYNTHESIZE_CIVILIZATION_OPTIMAL",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPrediction(predictions[Math.floor(Math.random() * predictions.length)]);
      setSyncState(99.9999);
      setTimeout(() => setPrediction(null), 2500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-t from-black to-zinc-900 border-white/10 p-12 text-center min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
         <h3 className="text-[10px] font-bold text-white tracking-[0.6em] uppercase">
           Zero-Latency Symbiosis [P-148]
         </h3>
         <p className="text-[8px] text-zinc-500 font-mono mt-1 uppercase">
           The Ultimate Interaction Layer
         </p>
      </div>

      <div className="space-y-8 relative z-20">
        <AnimatePresence mode="wait">
          {prediction ? (
            <motion.div
              key="prediction"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="space-y-4"
            >
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Pre-Conscious Execution Detected</span>
              <h4 className="text-4xl font-black text-white tracking-tighter italic">
                {prediction.replace(/_/g, " ")}
              </h4>
            </motion.div>
          ) : (
            <motion.div
              key="awaiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="text-[10px] font-mono text-zinc-500 tracking-[0.8em] uppercase"
            >
              Scanning Latent Intent Spaces...
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-12">
           <div className="text-[8px] font-mono text-zinc-600 uppercase mb-2">Sync Consistency</div>
           <div className="text-xl font-black text-white tracking-tighter">
             {syncState.toFixed(4)} <span className="text-zinc-500 text-xs font-normal">Φ</span>
           </div>
        </div>
      </div>

      {/* Background visual - ultimate synthesis */}
      <div className="absolute inset-0 z-10">
         <motion.div 
           animate={{
             scale: [1, 1.1, 1],
             opacity: [0.05, 0.1, 0.05]
           }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" 
         />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em]">
        Thought is execution. Existence is synthesis.
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-3xl border shadow-2xl ${className}`}>{children}</div>;
}
