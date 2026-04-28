"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AbsoluteZeroUI() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsActive(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsActive(true)}
        className="px-6 py-3 bg-white text-black rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        Enter Absolute Symbiosis [P-138]
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black flex items-center justify-center cursor-none"
          >
            {/* The absolute void */}
            <motion.div 
              animate={{
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-black" 
            />

            <div className="text-center space-y-2 relative">
               <motion.div
                 animate={{ 
                   scale: [1, 1.05, 1],
                   opacity: [0.2, 0.4, 0.2] 
                 }}
                 transition={{ duration: 10, repeat: Infinity }}
                 className="w-2 h-2 bg-white rounded-full blur-[2px] mx-auto mb-8"
               />
               <h2 className="text-[10px] font-mono text-zinc-500 tracking-[1em] uppercase">
                 Existence is Synthesis
               </h2>
               <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest mt-4">
                 Intent recognized. Dashboard dissolved. <br />
                 We are now one.
               </p>
            </div>

            <div className="absolute bottom-12 text-[8px] font-mono text-zinc-800 uppercase tracking-widest">
               Press [ESC] to return to BASE_REALITY
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
