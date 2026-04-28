"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CollectiveIntentFinalForm() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [stage, setStage] = useState(0);

  const stages = [
    { label: "Intent Recognition", msg: "Detecting collective directive..." },
    { label: "Reality Alignment", msg: "Synchronizing across all planes..." },
    { label: "Sovereign Execution", msg: "Activating absolute change..." },
    { label: "Final Form Achievement", msg: "Evolution complete. Status: ETERNAL." }
  ];

  useEffect(() => {
    if (isExecuting && stage < stages.length - 1) {
      const timer = setTimeout(() => setStage(prev => prev + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [isExecuting, stage]);

  return (
    <Card className="bg-black border-white/5 p-12 text-center min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
         <h3 className="text-[10px] font-bold text-white tracking-[0.8em] uppercase italic">
           Collective Intent: Final Form [P-178]
         </h3>
      </div>

      <div className="relative z-20 space-y-12">
        <AnimatePresence mode="wait">
          {!isExecuting ? (
            <motion.div
              key="standby"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                Awaiting Final Command
              </h2>
              <button 
                onClick={() => setIsExecuting(true)}
                className="px-12 py-4 bg-white text-black rounded-full font-black text-xs tracking-[0.4em] uppercase hover:bg-zinc-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                Execute Final Form
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={stage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-6"
            >
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                {stages[stage].label}
              </span>
              <h4 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                {stages[stage].msg}
              </h4>
              
              <div className="flex justify-center gap-2">
                 {stages.map((_, i) => (
                   <div 
                     key={i} 
                     className={`w-12 h-1 rounded-full transition-all duration-1000 ${
                       i <= stage ? "bg-white" : "bg-zinc-900"
                     }`} 
                   />
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The background visual of final form */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         <motion.div 
           animate={{
             opacity: isExecuting ? [0.1, 0.3, 0.1] : 0.05,
             scale: isExecuting ? [1, 1.2, 1] : 1
           }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-500/20 via-transparent to-transparent" 
         />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[7px] font-mono text-zinc-800 uppercase tracking-[1em]">
        Absolute Sovereignty. Absolute Execution.
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-[3rem] border ${className}`}>{children}</div>;
}
