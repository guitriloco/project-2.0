'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './card';
import { motion, AnimatePresence } from 'framer-motion';

export const NectarVisualizer = () => {
  const [nectarLevel, setNectarLevel] = useState(78.4);
  const [roi, setRoi] = useState(12.4);
  const [events, setEvents] = useState<{ id: number; type: string; intensity: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNectarLevel(prev => prev + (Math.random() * 0.1 - 0.02));
      setRoi(prev => prev + (Math.random() * 0.05 - 0.025));

      if (Math.random() > 0.95) {
        const newEvent = {
          id: Date.now(),
          type: 'ABSOLUTE_NECTAR',
          intensity: Math.random() * 100
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 5));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-zinc-950/40 border-amber-900/30 p-8 backdrop-blur-2xl relative overflow-hidden group">
      {/* Background Nectar Flow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-amber-500/10 blur-3xl"
        />
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50 blur-sm" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xs font-black text-amber-500 tracking-[0.3em] uppercase mb-1">
              Yield Engine // Nectar Flow
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Substrate-Level Equity Generation
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
              ENGINE_STABLE: 99.98%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main ROI Display */}
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-6xl font-black tracking-tighter text-white">
                {nectarLevel.toFixed(2)}
              </span>
              <span className="text-amber-500 font-bold text-xl uppercase tracking-tighter">NCTR</span>
            </div>
            
            <div className="w-full bg-zinc-900/50 h-1.5 rounded-full overflow-hidden mb-6 border border-zinc-800/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(nectarLevel % 100)}%` }}
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 rounded-lg border border-zinc-900">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Current ROI</div>
                <div className="text-xl font-bold text-emerald-400">+{roi.toFixed(3)}%</div>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-zinc-900">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Projected 24h</div>
                <div className="text-xl font-bold text-amber-400">≈ {(nectarLevel * 0.08).toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Absolute Nectar Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Anomalies</h4>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            </div>
            <div className="space-y-2 h-[120px] overflow-hidden">
              <AnimatePresence mode="popLayout">
                {events.length > 0 ? (
                  events.map(event => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-amber-500/10 border border-amber-500/20 p-3 rounded flex justify-between items-center"
                    >
                      <div>
                        <div className="text-[10px] font-black text-amber-400 tracking-tighter">ABSOLUTE NECTAR</div>
                        <div className="text-[8px] text-amber-200/50 font-mono">{new Date(event.id).toLocaleTimeString()}</div>
                      </div>
                      <div className="text-xs font-bold text-white">+{event.intensity.toFixed(1)}%</div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-[10px] text-zinc-700 font-mono italic text-center pt-8">
                    Waiting for nectar spikes...
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sensory Pulse */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                animate={{
                  height: [4, Math.random() * 20 + 4, 4],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-amber-600 rounded-full"
              />
            ))}
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            SENSORY_HANDSHAKE: <span className="text-amber-500">OPTIMAL</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
