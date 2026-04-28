"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ZeroUI() {
  const [isActive, setIsActive] = useState(false);
  const [intent, setIntent] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const intents = [
    { id: "expand", label: "EXPAND COGNITION", pos: { top: "20%", left: "20%" } },
    { id: "secure", label: "SECURE PARAMETERS", pos: { top: "20%", right: "20%" } },
    { id: "evolve", label: "TRIGGER EVOLUTION", pos: { bottom: "20%", left: "20%" } },
    { id: "sync", label: "PLANETARY SYNC", pos: { bottom: "20%", right: "20%" } },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsActive(!isActive)}
        className={`px-4 py-2 rounded-full font-mono text-[10px] transition-all duration-500 z-50 relative ${
          isActive 
            ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]" 
            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
        }`}
      >
        {isActive ? "SYMBIOSIS ACTIVE" : "INITIATE ZERO-UI SYMBIOSIS"}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] cursor-none flex items-center justify-center overflow-hidden"
          >
            {/* The Background Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px]"
            />

            {/* Custom Cursor / Intent Pointer */}
            <motion.div
              className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[110]"
              animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
              transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
            />

            {/* Intent Zones */}
            {intents.map((zone) => (
              <div
                key={zone.id}
                style={{ ...zone.pos }}
                className="absolute w-64 h-64 flex items-center justify-center group"
                onMouseEnter={() => setIntent(zone.label)}
                onPointerLeave={() => setIntent(null)}
              >
                <div className="w-2 h-2 bg-purple-500/0 group-hover:bg-purple-500 rounded-full transition-all duration-1000 group-hover:scale-[20] group-hover:blur-xl opacity-20" />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute text-[10px] font-mono tracking-[0.5em] text-purple-300 pointer-events-none"
                >
                  {zone.label}
                </motion.span>
              </div>
            ))}

            {/* Central Insight Display (HUD-less) */}
            <div className="text-center space-y-4">
              <motion.h2
                animate={{ opacity: intent ? 1 : 0.3 }}
                className="text-white font-serif text-3xl italic tracking-widest"
              >
                {intent || "Listening to Intent..."}
              </motion.h2>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-tighter">
                Phase 69 // Symbiosis Protocol Active
              </p>
            </div>

            {/* Exit Instruction */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] text-zinc-700 font-mono uppercase tracking-[0.3em]">
              Hold [ESC] or Click Center to Restore Dashboard
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => setIsActive(false)}
                  className="w-8 h-8 border border-zinc-800 rounded-full hover:border-zinc-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
