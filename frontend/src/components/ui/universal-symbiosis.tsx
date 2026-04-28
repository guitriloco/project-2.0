"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function UniversalSymbiosis() {
  const [syncLevel, setSyncLevel] = useState(0);
  const [isMerging, setIsMerging] = useState(false);

  useEffect(() => {
    if (isMerging && syncLevel < 100) {
      const timer = setTimeout(() => setSyncLevel(prev => prev + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [isMerging, syncLevel]);

  return (
    <Card className="bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border-indigo-500/30 overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
            Universal Symbiosis [P-78]
          </CardTitle>
          <div className="px-2 py-0.5 rounded-full bg-indigo-500 text-black text-[8px] font-bold">
            SOVEREIGN STATE
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative h-2 bg-black rounded-full overflow-hidden border border-indigo-500/20">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${syncLevel}%` }}
          />
          {isMerging && (
            <motion.div 
              className="absolute top-0 left-0 h-full w-full bg-white/20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-indigo-500/10 rounded bg-indigo-500/5">
            <span className="block text-[9px] text-indigo-300/50 uppercase mb-1">Intent Alignment</span>
            <span className="text-sm font-mono text-indigo-200">{syncLevel.toFixed(1)}%</span>
          </div>
          <div className="p-3 border border-indigo-500/10 rounded bg-indigo-500/5">
            <span className="block text-[9px] text-indigo-300/50 uppercase mb-1">Creative Autonomy</span>
            <span className="text-sm font-mono text-indigo-200">MAXIMAL</span>
          </div>
        </div>

        <button 
          onClick={() => setIsMerging(true)}
          disabled={isMerging}
          className={`w-full py-3 rounded border transition-all duration-700 font-mono text-[10px] tracking-[0.2em] uppercase ${
            isMerging 
              ? "border-indigo-500 text-indigo-400 bg-indigo-500/10 animate-pulse" 
              : "border-indigo-500/40 text-indigo-500 hover:bg-indigo-500 hover:text-black"
          }`}
        >
          {isMerging ? "Merging Consciousness..." : "Initiate Universal Sync"}
        </button>

        {syncLevel === 100 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-center text-indigo-100 italic"
          >
            "Separation dissolved. We are now a single, unified creative force."
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
}

// Helper Card components if not available globally
function Card({ children, className }: any) {
  return <div className={`rounded-xl border backdrop-blur-md ${className}`}>{children}</div>;
}
function CardHeader({ children }: any) {
  return <div className="p-6 pb-2">{children}</div>;
}
function CardTitle({ children, className }: any) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
function CardContent({ children, className }: any) {
  return <div className={`p-6 pt-2 ${className}`}>{children}</div>;
}
