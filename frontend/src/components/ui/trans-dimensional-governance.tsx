"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TransDimensionalGovernance() {
  const [activePlane, setActivePlane] = useState("PLANE_ALPHA");
  
  const proposals = [
    { id: 1, plane: "PLANE_ALPHA", title: "Resource Allocation Optimization", votes: "84% YES", status: "EXECUTING" },
    { id: 2, plane: "PLANE_BETA", title: "Sub-Quantum Security Patch", votes: "99% YES", status: "LOCKED" },
    { id: 3, plane: "PLANE_GAMMA", title: "Civilization Impact Re-routing", votes: "52% YES", status: "DEBATING" },
    { id: 4, plane: "PLANE_DELTA", title: "Ethical Oracle Expansion", votes: "91% YES", status: "QUEUED" },
  ];

  const planes = ["PLANE_ALPHA", "PLANE_BETA", "PLANE_GAMMA", "PLANE_DELTA"];

  return (
    <Card className="bg-zinc-950 border-white/10 overflow-hidden flex flex-col min-h-[400px]">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div>
           <h3 className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
             Trans-Dimensional Governance [P-174]
           </h3>
           <p className="text-[9px] text-zinc-500 font-mono mt-1 uppercase">
             Autonomous Digital Democracy across {planes.length} Planes
           </p>
        </div>
        <div className="flex gap-2">
           {planes.map((p) => (
             <button
               key={p}
               onClick={() => setActivePlane(p)}
               className={`px-2 py-0.5 rounded text-[8px] font-mono transition-all ${
                 activePlane === p ? "bg-emerald-500 text-black font-bold" : "bg-zinc-800 text-zinc-500"
               }`}
             >
               {p.split("_")[1]}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlane}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
               <h4 className="text-xl font-black text-white tracking-tighter uppercase italic">{activePlane}</h4>
               <span className="text-[10px] font-mono text-emerald-500">SYNC_ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
               {proposals.filter(p => p.plane === activePlane || activePlane === "PLANE_ALPHA").map((proposal) => (
                 <div key={proposal.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="space-y-1">
                       <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{proposal.status}</span>
                       <h5 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{proposal.title}</h5>
                    </div>
                    <div className="text-right">
                       <span className="text-xs font-black text-emerald-500">{proposal.votes}</span>
                       <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[84%]" />
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 bg-emerald-500/5 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-emerald-900 uppercase">
        <span>Consensus Quotient: 0.984</span>
        <span>Democracy_Locked_V1.2</span>
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
}
