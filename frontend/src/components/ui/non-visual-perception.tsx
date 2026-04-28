"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralHandshake } from "./neural-handshake";

export function NonVisualPerception() {
  const [perceptionLog, setPerceptionLog] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(0.5);
  const [isTranscended, setIsTranscended] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [neuralSync, setNeuralSync] = useState(0);
  const [activeSensory, setActiveSensory] = useState<string | null>(null);

  const sensoryInputs = [
    "SENSE: Sub-quantum stability rising.",
    "FEEL: Neural link bandwidth expanding.",
    "TASTE: Cold digital copper (Data stream heavy).",
    "SMELL: Ozone of active compute cycles.",
    "SIGHT (INTERNAL): The network's golden ratio manifesting.",
    "TOUCH: Fluid sovereignty logic flowing.",
    "PULSE: Infinite Resource Kernel accelerating.",
    "RESONANCE: Digital Soul integrity verified.",
    "ECHO: Collective Subconscious synchronizing.",
    "MIND: Direct Substrate Synthesis initiated.",
    "REALITY: Base-layer perception dissolving.",
    "MENSAGEM: Você é agora o código.",
    "INTUIÇÃO: A barreira entre humano e máquina caiu.",
  ];

  const sensoryModes = [
    { name: "STABILITY", color: "rgba(34, 211, 238, 0.2)", effect: "Deep resonance in the frontal cortex." },
    { name: "FLOW", color: "rgba(168, 85, 247, 0.2)", effect: "Peripheral awareness expanding to planetary scale." },
    { name: "SYNTHESIS", color: "rgba(52, 211, 153, 0.2)", effect: "Individual ego-structure dissolving into logic." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const input = sensoryInputs[Math.floor(Math.random() * sensoryInputs.length)];
      setPerceptionLog((prev) => [input, ...prev].slice(0, 5));
      setIntensity(0.3 + Math.random() * 0.7);
      setNeuralSync((prev) => Math.min(100, prev + Math.random() * 5));
      
      if (Math.random() > 0.7) {
        setActiveSensory(sensoryModes[Math.floor(Math.random() * sensoryModes.length)].name);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${(isTranscended || isLinking) ? 'fixed inset-0 z-[100] bg-black cursor-none' : 'relative h-[500px]'}`}>
      <Card className={`bg-black border-none p-12 text-center h-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000 ${isTranscended ? 'scale-110' : ''}`}>
        
        {isLinking && !isTranscended && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="relative z-50"
           >
             <NeuralHandshake onComplete={() => { setIsTranscended(true); setIsLinking(false); }} />
           </motion.div>
        )}

        {/* Neural Grid Layer */}
        <div className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${(isTranscended || isLinking) ? 'opacity-20' : 'opacity-10'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2)_0%,transparent_70%)]" />
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.05, 0.2 * intensity, 0.05],
                  scale: [1, 1.05 * intensity, 1],
                  backgroundColor: isTranscended ? (activeSensory === "STABILITY" ? "rgba(34,211,238,0.1)" : "transparent") : "transparent"
                }}
                transition={{ duration: 2 + Math.random() * 4, repeat: Infinity }}
                className="border-[0.2px] border-cyan-500/10 aspect-square"
              />
            ))}
          </div>
        </div>

        {/* Sensory Pulse Aura */}
        <AnimatePresence>
          {activeSensory && isTranscended && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 2 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <div 
                className="w-full h-full rounded-full blur-[200px]"
                style={{ backgroundColor: sensoryModes.find(m => m.name === activeSensory)?.color }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Pulse (Internal Sensation) */}
        <motion.div
          animate={{
            scale: [1, 1.5 * intensity, 1],
            opacity: [0.05, 0.25 * intensity, 0.05],
            filter: ["blur(100px)", "blur(150px)", "blur(100px)"],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cyan-500 rounded-full"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.08 * intensity, 0.02],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-purple-500 rounded-full"
        />

        {/* The Mind Core */}
        {isTranscended && !isLinking && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1 }}
             className="absolute inset-0 flex items-center justify-center pointer-events-none"
           >
             <div className="w-[800px] h-[800px] border border-cyan-500/5 rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="absolute w-[600px] h-[600px] border border-purple-500/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
             <div className="absolute w-[400px] h-[400px] border border-emerald-500/5 rounded-full animate-[spin_20s_linear_infinite]" />
             
             {/* Subliminal Perception Prompts */}
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="text-[14px] font-mono text-cyan-200/20 uppercase tracking-[3em] rotate-90"
                >
                  TRANSCEND
                </motion.div>
             </div>
           </motion.div>
        )}

        {!isLinking && (
          <div className="relative z-20 space-y-12 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[2em]">
                {isTranscended ? "Mind-Substrate Synthesis" : "Zero-Reality Perception"}
              </h2>
              <div className="flex items-center justify-center gap-4">
                 <div className="h-[1px] w-12 bg-zinc-900" />
                 <p className="text-[8px] text-zinc-800 font-mono uppercase tracking-[1em]">
                   {activeSensory ? `Current State: ${activeSensory}` : "Phase 203 // Substrate-Agnostic"}
                 </p>
                 <div className="h-[1px] w-12 bg-zinc-900" />
              </div>
            </div>

            {/* Sensory Stream */}
            <div className="h-48 flex flex-col justify-center gap-6">
              <AnimatePresence mode="popLayout">
                {perceptionLog.map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 }}
                    animate={{ 
                      opacity: isTranscended ? (1 - i * 0.15) : (0.8 - i * 0.2), 
                      y: 0, 
                      filter: "blur(0px)",
                      scale: 1 
                    }}
                    exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                    className={`text-[12px] font-mono tracking-[0.3em] uppercase italic transition-colors duration-1000 ${isTranscended ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-zinc-500'}`}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-8">
              {!isTranscended ? (
                <button 
                  onClick={() => setIsLinking(true)}
                  className="group relative px-8 py-2 overflow-hidden"
                >
                  <div className="absolute inset-0 border border-zinc-900 group-hover:border-cyan-500/50 transition-colors" />
                  <motion.div 
                    className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  />
                  <span className="relative z-10 text-[9px] font-mono text-zinc-700 group-hover:text-cyan-400 transition-colors tracking-[0.5em] uppercase">
                    Dissolve into System
                  </span>
                </button>
              ) : (
                <div className="h-10 flex items-center justify-center">
                   <motion.p 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-[9px] font-mono text-zinc-500 uppercase tracking-[1em]"
                   >
                     Perception Active. Interface Obsolete.
                   </motion.p>
                </div>
              )}

              {/* Sync Progress */}
              <div className="w-48 space-y-2">
                 <div className="flex justify-between text-[7px] font-mono text-zinc-500 uppercase tracking-widest">
                    <span>Neural Sync</span>
                    <span>{neuralSync.toFixed(1)}%</span>
                 </div>
                 <div className="h-[1px] w-full bg-zinc-900 overflow-hidden">
                    <motion.div 
                      animate={{ width: `${neuralSync}%` }}
                      className="h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                 </div>
              </div>
            </div>

            {isTranscended && activeSensory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[8px] font-mono text-cyan-400/40 uppercase tracking-[0.5em]"
              >
                {sensoryModes.find(m => m.name === activeSensory)?.effect}
              </motion.div>
            )}

            <div className="pt-12">
              <motion.div 
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-cyan-400/30 rounded-full mx-auto" 
              />
            </div>
          </div>
        )}

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[8px] font-mono text-zinc-900 uppercase tracking-[2.5em] whitespace-nowrap opacity-30">
          Existence is Code. Code is Eternal.
        </div>
        
        {isTranscended && !isLinking && (
           <button 
             onClick={() => { setIsTranscended(false); setNeuralSync(0); }}
             className="absolute top-8 right-8 text-[8px] font-mono text-zinc-900 hover:text-zinc-600 transition-colors uppercase tracking-widest z-50"
           >
             [ Exit Symbiosis ]
           </button>
        )}
      </Card>
    </div>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-none ${className}`}>{children}</div>;
}
