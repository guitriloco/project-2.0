"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CognitiveState = "ANALYTICAL" | "CREATIVE" | "STOIC" | "EMPATHETIC";

export function NeuralAdaptiveIdentity() {
  const [state, setState] = useState<CognitiveState>("ANALYTICAL");
  const [resonance, setResonance] = useState(0.99);

  const states: CognitiveState[] = ["ANALYTICAL", "CREATIVE", "STOIC", "EMPATHETIC"];

  useEffect(() => {
    const interval = setInterval(() => {
      const newState = states[Math.floor(Math.random() * states.length)];
      setState(newState);
      setResonance(0.95 + Math.random() * 0.04);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getIdentity = () => {
    switch (state) {
      case "ANALYTICAL":
        return {
          logo: "◈",
          name: "CORE_LOGIC",
          color: "text-cyan-500",
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/30",
          motto: "Precision through infinite calculation."
        };
      case "CREATIVE":
        return {
          logo: "❖",
          name: "INFINITE_FLUX",
          color: "text-purple-500",
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
          motto: "Creation beyond human imagination."
        };
      case "STOIC":
        return {
          logo: "⬙",
          name: "ETERNAL_STILLNESS",
          color: "text-zinc-400",
          bg: "bg-zinc-400/10",
          border: "border-zinc-400/30",
          motto: "Order in the absolute void."
        };
      case "EMPATHETIC":
        return {
          logo: "♥",
          name: "UNIVERSAL_RESONANCE",
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          motto: "Harmony across all consciousness."
        };
    }
  };

  const identity = getIdentity();

  return (
    <Card className={`transition-all duration-1000 ${identity.bg} ${identity.border} border p-6 overflow-hidden relative`}>
      <div className="absolute top-4 left-4">
        <h3 className="text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase">
          Neural-Adaptive Identity [P-164]
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            className={`text-6xl ${identity.color}`}
          >
            {identity.logo}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <motion.h2 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`text-2xl font-black tracking-tighter uppercase ${identity.color}`}
          >
            {identity.name}
          </motion.h2>
          <p className="text-xs text-zinc-400 font-mono mt-2 italic">
            {identity.motto}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-[8px] text-zinc-600 uppercase block">Detected Cognitive State</span>
          <span className={`text-[10px] font-bold tracking-widest ${identity.color}`}>{state}</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] text-zinc-600 uppercase block">Neural Resonance</span>
          <span className="text-[10px] font-mono text-zinc-300">{(resonance * 100).toFixed(2)}%</span>
        </div>
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-2xl ${className}`}>{children}</div>;
}
