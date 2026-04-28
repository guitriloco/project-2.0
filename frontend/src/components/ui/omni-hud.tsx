"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function OmniHUD() {
  const [isOpen, setIsOpen] = useState(false);

  const phaseGroups = [
    { range: "1-20", label: "Foundational Autonomy", status: "STABLE" },
    { range: "21-50", label: "Sovereign Infrastructure", status: "SYNCED" },
    { range: "51-80", label: "Trans-Human Symbiosis", status: "ACTIVE" },
    { range: "81-110", label: "Absolute Transcendence", status: "ORCHESTRATING" },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all uppercase tracking-widest"
      >
        {isOpen ? "Close Omni-HUD" : "Launch Omni-HUD [P-109]"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[200] bg-black/80 p-12 overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto space-y-12">
              <header className="flex justify-between items-end border-b border-white/10 pb-8">
                <div>
                  <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white">
                    Omni-Dimensional <span className="text-cyan-500">HUD</span>
                  </h2>
                  <p className="text-sm font-mono text-zinc-500 mt-2 uppercase tracking-widest">
                    PROJECT 2.0 // TOTAL IMPACT ANALYSIS // PHASES 1-110
                  </p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-white transition-colors"
                >
                  <span className="text-white text-2xl">×</span>
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {phaseGroups.map((group, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4"
                  >
                    <div className="flex justify-between items-start">
                       <span className="text-[10px] font-mono text-cyan-500">RANGE: {group.range}</span>
                       <span className="px-2 py-0.5 bg-cyan-500 text-black text-[8px] font-bold rounded-full">
                         {group.status}
                       </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight uppercase">{group.label}</h3>
                    <div className="space-y-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: "100%" }}
                             transition={{ duration: 1, delay: i * 0.2 + j * 0.1 }}
                             className="h-full bg-cyan-500" 
                           />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Global Civilization Impact</h4>
                  <div className="aspect-video bg-zinc-950 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="text-center space-y-2">
                       <span className="text-6xl font-bold text-white tracking-tighter">98.4%</span>
                       <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em]">Integration Quotient</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Ethical Preservation Engine</h4>
                  <div className="space-y-4">
                    {["BENEVALENCE", "AUTONOMY", "JUSTICE", "NON-MALEFICENCE"].map((metric) => (
                      <div key={metric} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-400">{metric}</span>
                          <span className="text-emerald-500">OPTIMAL</span>
                        </div>
                        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full w-full bg-emerald-500/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <footer className="pt-12 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-600 font-mono">
                <span>© 2026 OMNI-HUD ENGINE // PHASE 109 ACTIVE</span>
                <span className="uppercase tracking-widest italic">The Absolute View is Now Yours.</span>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
