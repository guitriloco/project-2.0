'use client';

import React, { useState, useEffect } from 'react';

interface NectarSignal {
  id: string;
  source: 'YES' | 'ZENITH';
  type: string;
  payload: any;
  yield_roi?: number;
  timestamp: number;
}

export const NectarAggregator = () => {
  const [signals, setSignals] = useState<NectarSignal[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSignals = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/nectar/stream');
      const result = await response.json();
      if (result.status === 'SUCCESS') {
        setSignals(result.data);
      }
    } catch (error) {
      console.error('Error fetching nectar signals:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-slate-900/90 border border-amber-500/30 rounded-xl shadow-amber-500/5 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-amber-400 font-black text-xl tracking-tighter uppercase italic">Nectar Aggregator</h3>
          <p className="text-[10px] text-amber-500/60 font-mono">AETHERIS UNIFIED SIGNAL STREAM</p>
        </div>
        <button 
          onClick={fetchSignals}
          disabled={isRefreshing}
          className={`px-3 py-1 text-[10px] border border-amber-500/50 rounded hover:bg-amber-500/20 transition-all ${isRefreshing ? 'animate-pulse opacity-50' : ''}`}
        >
          {isRefreshing ? 'SYNCING...' : 'FORCE SYNC'}
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500/20">
        {signals.length === 0 && (
          <div className="text-center py-10 text-amber-500/30 italic text-sm">Waiting for high-yield signals...</div>
        )}
        {signals.map((signal) => (
          <div 
            key={signal.id} 
            className={`p-3 rounded border transition-all ${signal.yield_roi && signal.yield_roi > 0.98 ? 'bg-amber-500/10 border-amber-400' : 'bg-white/5 border-white/10'}`}
          >
            <div className="flex justify-between items-start">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${signal.source === 'YES' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {signal.source}
              </span>
              <span className="text-[9px] text-white/40 font-mono">
                {new Date(signal.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="mt-2 text-sm text-white/90 font-medium">{signal.type}</div>
            {signal.yield_roi && (
              <div className="mt-1 flex items-center gap-2">
                <div className="text-[10px] text-amber-400 uppercase font-bold">Yield ROI:</div>
                <div className="text-xs font-mono text-amber-200">{(signal.yield_roi * 100).toFixed(2)}%</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-2">
        <div className="text-center p-2 rounded bg-white/5 border border-white/10">
          <div className="text-[9px] text-white/40 uppercase">Global ROI</div>
          <div className="text-sm font-bold text-green-400">99.4%</div>
        </div>
        <div className="text-center p-2 rounded bg-white/5 border border-white/10">
          <div className="text-[9px] text-white/40 uppercase">Mesh Health</div>
          <div className="text-sm font-bold text-blue-400">OPTIMAL</div>
        </div>
        <div className="text-center p-2 rounded bg-white/5 border border-white/10">
          <div className="text-[9px] text-white/40 uppercase">Harvest Rate</div>
          <div className="text-sm font-bold text-amber-400">1.2AETH/s</div>
        </div>
      </div>
    </div>
  );
};
