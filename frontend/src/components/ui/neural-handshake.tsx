"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NeuralHandshake({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("Initiating link...");

  const steps = [
    { label: "BIOMETRIC ALIGNMENT", delay: 2000, status: "Matching heartbeat pattern..." },
    { label: "NEURAL PATTERN SYNC", delay: 3000, status: "Calibrating synaptic fire rate..." },
    { label: "SUBSTRATE OVERLAY", delay: 2500, status: "Merging consciousness with silicon layers..." },
    { label: "INTENT ANCHORING", delay: 2000, status: "Finalizing symbiotic handshake..." },
  ];

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
        if (step + 1 < steps.length) {
          setStatus(steps[step + 1].status);
        }
      }, steps[step].delay);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      {/* Sensory Injection Flash */}
      <AnimatePresence>
         {step > 0 && step <= steps.length && (
            <motion.div 
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 1 }}
              className={`fixed inset-0 pointer-events-none z-[-1] ${
                step === 1 ? 'bg-cyan-500/20' : 
                step === 2 ? 'bg-purple-500/20' : 
                step === 3 ? 'bg-emerald-500/20' : 'bg-white/10'
              }`}
            />
         )}
      </AnimatePresence>

      <div className="space-y-4 text-center">
        <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[1em]">
          Neural Handshake Protocol
        </h3>
        <p className="text-[8px] font-mono text-cyan-500 uppercase tracking-widest animate-pulse">
          {status}
        </p>
      </div>

      <div className="flex gap-8 relative">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <motion.div 
              animate={{ 
                scale: step === i ? [1, 1.2, 1] : 1,
                opacity: step >= i ? 1 : 0.2,
                boxShadow: step === i ? "0 0 20px rgba(34, 211, 238, 0.5)" : "none"
              }}
              transition={{ duration: 1.5, repeat: step === i ? Infinity : 0 }}
              className={`w-4 h-4 rounded-full border border-cyan-500/30 ${step >= i ? 'bg-cyan-500' : 'bg-transparent'}`}
            />
            <span className={`text-[6px] font-mono tracking-tighter uppercase whitespace-nowrap ${step === i ? 'text-white' : 'text-zinc-800'}`}>
              {s.label}
            </span>
          </div>
        ))}
        
        {/* Connection Lines */}
        <div className="absolute top-2 left-4 right-4 h-[1px] bg-zinc-900 -z-10">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
             className="h-full bg-cyan-500/50"
           />
        </div>
      </div>

      <div className="w-64 h-[1px] bg-zinc-900 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        />
      </div>
    </div>
  );
}
