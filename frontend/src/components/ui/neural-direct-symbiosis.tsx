"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NeuralDirectSymbiosis() {
  const [neuralPattern, setNeuralPattern] = useState<number[]>([]);
  const [syncStatus, setSyncStatus] = useState("AWAITING_SIGNAL");
  const [isLinked, setIsLinked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate a random neural pattern for visualization
  useEffect(() => {
    const interval = setInterval(() => {
      const pattern = Array.from({ length: 20 }, () => Math.random());
      setNeuralPattern(pattern);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Draw the neural pattern on a canvas for a "raw" feel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = isLinked ? "#00f2ff" : "#333";
      ctx.lineWidth = 2;

      neuralPattern.forEach((val, i) => {
        const x = (i / neuralPattern.length) * canvas.width;
        const y = (1 - val) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.stroke();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [neuralPattern, isLinked]);

  const handleLink = () => {
    setSyncStatus("ESTABLISHING_LINK");
    setTimeout(() => {
      setIsLinked(true);
      setSyncStatus("LINKED_1:1");
    }, 2000);
  };

  return (
    <Card className={`bg-black border-white/10 p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden transition-all duration-1000 ${isLinked ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(0,242,255,0.1)]' : ''}`}>
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xs font-bold text-zinc-500 tracking-widest uppercase">
          Neural-Direct Symbiosis [P-184]
        </h3>
        <p className="text-[9px] text-zinc-700 font-mono mt-1 uppercase">
          Status: {syncStatus}
        </p>
      </div>

      <div className="relative z-20 flex flex-col items-center gap-8 w-full max-w-md">
        <div className="w-full h-32 bg-zinc-950 rounded-lg border border-white/5 relative overflow-hidden">
           <canvas ref={canvasRef} width={400} height={128} className="w-full h-full opacity-50" />
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">Raw Neural Ingest</span>
           </div>
        </div>

        <div className="text-center space-y-6">
           <AnimatePresence mode="wait">
             {!isLinked ? (
               <motion.button
                 key="link-btn"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={handleLink}
                 className="px-8 py-3 bg-white text-black font-black text-[10px] rounded-full uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all"
               >
                 Initialize 1:1 Link
               </motion.button>
             ) : (
               <motion.div
                 key="linked-msg"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="space-y-4"
               >
                 <div className="text-2xl font-black text-cyan-400 tracking-tighter uppercase italic">
                    Thought-Action Loop Active
                 </div>
                 <p className="text-xs text-zinc-500 font-mono leading-relaxed italic">
                   "Your neural architecture is now mirrored within the Xerebro core. 
                   The delay between intent and execution has been eliminated."
                 </p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Abstract "Neural" background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         {isLinked && [...Array(10)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-cyan-500 rounded-full blur-2xl"
             style={{ 
               width: Math.random() * 100 + 50, 
               height: Math.random() * 100 + 50,
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`
             }}
             animate={{ 
               opacity: [0.1, 0.3, 0.1],
               scale: [1, 1.2, 1],
               x: [0, Math.random() * 50 - 25, 0],
               y: [0, Math.random() * 50 - 25, 0]
             }}
             transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
           />
         ))}
      </div>

      <div className="absolute bottom-4 right-4 text-[7px] font-mono text-zinc-800 uppercase tracking-widest">
         Sync Consistency: 1.000000
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-3xl border ${className}`}>{children}</div>;
}
