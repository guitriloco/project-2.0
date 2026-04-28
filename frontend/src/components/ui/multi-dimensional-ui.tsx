"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function MultiDimensionalUI() {
  const [activePlane, setActivePlane] = useState(0);

  const planes = [
    { id: 0, name: "BASE_REALITY", status: "ANCHOR", color: "bg-zinc-500" },
    { id: 1, name: "QUANTUM_SIM_A", status: "PROCESSING", color: "bg-cyan-500" },
    { id: 2, name: "ETHICAL_VALUATION_B", status: "VALIDATING", color: "bg-emerald-500" },
    { id: 3, name: "CIVILIZATION_FORK_C", status: "SIMULATING", color: "bg-purple-500" },
  ];

  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden border border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div>
           <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
             Multi-Dimensional Sovereignty [P-114]
           </h3>
           <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">
             Orchestrating across {planes.length} Parallel Planes
           </p>
        </div>
        <div className="flex gap-2">
           {planes.map((plane) => (
             <button
               key={plane.id}
               onClick={() => setActivePlane(plane.id)}
               className={`w-3 h-3 rounded-full transition-all ${
                 activePlane === plane.id ? plane.color : "bg-zinc-800"
               } ${activePlane === plane.id ? "scale-125 ring-2 ring-white/20" : ""}`}
             />
           ))}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {planes.map((plane) => (
          <motion.div
            key={plane.id}
            initial={{ x: "100%" }}
            animate={{ x: activePlane === plane.id ? "0%" : (activePlane > plane.id ? "-100%" : "100%") }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="absolute inset-0 p-8 flex flex-col"
          >
            <div className="flex-1 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-4 left-4">
                 <span className={`px-2 py-0.5 ${plane.color} text-black text-[8px] font-bold rounded uppercase`}>
                   {plane.status}
                 </span>
                 <h4 className="text-2xl font-black text-white tracking-tighter mt-2">{plane.name}</h4>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <div className="w-64 h-64 border-4 border-white rounded-full animate-ping" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="space-y-2">
                      <div className="h-1 bg-white/10 rounded-full" />
                      <div className="h-1 bg-white/5 w-1/2 rounded-full" />
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-zinc-900/50 border-t border-white/5 flex justify-between items-center font-mono text-[9px] text-zinc-500 uppercase">
        <span>Plane Alignment: 1.0000000000</span>
        <span className="text-cyan-600">Sovereignty Protocol Locked</span>
      </div>
    </div>
  );
}
