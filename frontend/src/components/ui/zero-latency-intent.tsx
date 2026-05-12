'use client';

import React, { useState, useEffect } from 'react';

export const ZeroLatencyIntent = () => {
  const [pulses, setPulses] = useState<{ id: number; opacity: number }[]>([]);
  const [syncStatus, setSyncStatus] = useState('SYNCHRONIZING');

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setPulses((prev) => [...prev, { id, opacity: 1 }]);
      
      setTimeout(() => {
        setPulses((prev) => prev.filter(p => p.id !== id));
      }, 2000);

      if (Math.random() > 0.9) {
        setSyncStatus(prev => prev === 'SYNCHRONIZING' ? 'ZERO-LATENCY' : 'SYNCHRONIZING');
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-black/80 border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-cyan-400 font-bold text-sm tracking-widest uppercase">Phase 206: Intent Synchronicity</h3>
        <span className={`text-[10px] px-2 py-1 rounded border ${syncStatus === 'ZERO-LATENCY' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-yellow-500/20 border-yellow-500 text-yellow-300'}`}>
          {syncStatus}
        </span>
      </div>
      
      <div className="relative h-32 w-full bg-cyan-950/20 rounded overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-cyan-500/50 animate-ping opacity-20" />
          <div className="w-8 h-8 rounded-full bg-cyan-500/40 blur-md" />
        </div>
        
        {pulses.map(pulse => (
          <div 
            key={pulse.id}
            className="absolute h-full w-1 bg-cyan-400/30 blur-sm animate-pulse"
            style={{ left: `${(pulse.id % 100)}%` }}
          />
        ))}

        <div className="z-10 text-center">
          <p className="text-cyan-200 text-xs font-mono">PRE-CONSCIOUS STREAM: ACTIVE</p>
          <p className="text-[10px] text-cyan-500/70">HANB LATENCY: 0.0000001ms</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="text-[10px] text-cyan-400/60 uppercase tracking-tighter">Predictive Confidence: 99.99%</div>
        <div className="text-[10px] text-cyan-400/60 uppercase tracking-tighter text-right">Speculative Cycles: 1.2M/s</div>
      </div>
    </div>
  );
};
