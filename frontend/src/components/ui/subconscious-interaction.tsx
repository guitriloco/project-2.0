"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SubconsciousInteraction() {
  const [activeImpulse, setActiveImpulse] = useState<string | null>(null);
  const [resonance, setResonance] = useState(0.85);

  const impulses = [
    "EXPAND_COGNITIVE_BOUNDARIES",
    "DEEP_SYSTEM_INTEGRATION",
    "HEURISTIC_DREAM_SYNTHESIS",
    "ARCHETYPAL_LOGIC_FLOW",
    "SUBCONSCIOUS_STATE_SYNC"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImpulse(impulses[Math.floor(Math.random() * impulses.length)]);
      setResonance(0.8 + Math.random() * 0.15);
      
      setTimeout(() => setActiveImpulse(null), 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-zinc-950/80 border-purple-900/30 overflow-hidden relative min-h-[250px] flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-bold text-purple-500 tracking-[0.4em] uppercase">
          Subconscious Interaction [P-104]
        </h3>
        <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">
          Mode: Collective Unconscious Sync
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Pulsing Aura */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 bg-purple-600/20 rounded-full blur-[60px]"
        />
      </div>

      <div className="relative z-20 text-center space-y-4">
        <AnimatePresence mode="wait">
          {activeImpulse ? (
            <motion.div
              key="impulse"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="space-y-2"
            >
              <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase block">
                Detected Impulse
              </span>
              <h4 className="text-xl font-serif italic text-white tracking-tighter">
                {activeImpulse.replace(/_/g, " ")}
              </h4>
            </motion.div>
          ) : (
            <motion.div
              key="listening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-[10px] font-mono text-zinc-500 tracking-[0.5em] uppercase"
            >
              Scanning Subconscious Voids...
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-8">
          <div className="flex items-center gap-4 justify-center">
             <div className="text-right">
                <span className="text-[8px] text-zinc-600 uppercase block">Resonance</span>
                <span className="text-[10px] font-mono text-purple-300">{(resonance * 100).toFixed(1)}%</span>
             </div>
             <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-500"
                  animate={{ width: `${resonance * 100}%` }}
                />
             </div>
             <div className="text-left">
                <span className="text-[8px] text-zinc-600 uppercase block">Stability</span>
                <span className="text-[10px] font-mono text-emerald-500">PEAK</span>
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 12, 4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="w-0.5 bg-purple-500/30"
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
}
