"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SymbiosisSimulation() {
  const [isActive, setIsActive] = useState(false);
  const [syncLevel, setSyncLevel] = useState(0);

  useEffect(() => {
    if (isActive && syncLevel < 100) {
      const timer = setTimeout(() => setSyncLevel(prev => prev + 0.5), 50);
      return () => clearTimeout(timer);
    }
  }, [isActive, syncLevel]);

  return (
    <Card className="bg-zinc-900/50 border-white/5 p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
          Zero-Interface Symbiosis Simulation [P-158]
        </h3>
        <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">
          Simulating Direct Intent-to-Execution Mapping
        </p>
      </div>

      <div className="relative z-20 flex flex-col items-center gap-12">
        <div className="flex items-center gap-24">
           {/* Human Side */}
           <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                 <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Biological Intent</span>
           </div>

           {/* The Connection */}
           <div className="w-48 h-0.5 bg-zinc-800 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan-500"
                animate={{ 
                  width: `${syncLevel}%`,
                  boxShadow: syncLevel > 90 ? "0 0 20px #06b6d4" : "none"
                }}
              />
              {isActive && (
                <motion.div 
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-sm"
                  animate={{ left: `${syncLevel}%` }}
                />
              )}
           </div>

           {/* System Side */}
           <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center">
                 <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Xerebro Execution</span>
           </div>
        </div>

        <div className="text-center space-y-4">
           <button 
             onClick={() => { setIsActive(true); setSyncLevel(0); }}
             disabled={isActive}
             className="px-8 py-3 bg-white text-black font-bold text-[10px] rounded-full uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all disabled:opacity-50"
           >
             {isActive ? "Simulation Running" : "Initialize Handshake"}
           </button>
           
           <AnimatePresence>
             {isActive && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-1"
               >
                 <div className="text-[10px] font-mono text-white tracking-widest uppercase">
                    Sync Integrity: {syncLevel.toFixed(1)}%
                 </div>
                 <p className="text-[9px] text-zinc-500 font-mono italic">
                   {syncLevel < 50 && "Mapping synaptic pathways..."}
                   {syncLevel >= 50 && syncLevel < 90 && "Synchronizing intent-logic manifolds..."}
                   {syncLevel >= 90 && "Absolute Symbiosis Achieved. Dashboards are now redundant."}
                 </p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Background visual elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-white rounded-full"
             style={{ 
               width: Math.random() * 2, 
               height: Math.random() * 2,
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`
             }}
             animate={{ opacity: [0, 1, 0] }}
             transition={{ duration: Math.random() * 5 + 2, repeat: Infinity }}
           />
         ))}
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
}
