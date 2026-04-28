"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

type BioState = "STRESS" | "FOCUS" | "REST" | "SCANNING";

export function BiologicalUI() {
  const [bioState, setBioState] = useState<BioState>("REST");
  const [metrics, setMetrics] = useState({
    heartRate: 72,
    focusLevel: 0.5,
    neuralLoad: 0.3,
  });

  // Simulate bio-feedback changes
  useEffect(() => {
    const interval = setInterval(() => {
      const states: BioState[] = ["STRESS", "FOCUS", "REST", "SCANNING"];
      const newState = states[Math.floor(Math.random() * states.length)];
      setBioState(newState);

      // Adjust metrics based on state
      if (newState === "STRESS") {
        setMetrics({ heartRate: 95, focusLevel: 0.2, neuralLoad: 0.8 });
      } else if (newState === "FOCUS") {
        setMetrics({ heartRate: 65, focusLevel: 0.9, neuralLoad: 0.6 });
      } else if (newState === "SCANNING") {
        setMetrics({ heartRate: 80, focusLevel: 0.4, neuralLoad: 0.5 });
      } else {
        setMetrics({ heartRate: 72, focusLevel: 0.5, neuralLoad: 0.3 });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getThemeClasses = () => {
    switch (bioState) {
      case "STRESS":
        return "border-red-500/50 bg-red-950/10 transition-all duration-700";
      case "FOCUS":
        return "border-blue-500/50 bg-blue-950/10 transition-all duration-700 scale-[1.02]";
      case "SCANNING":
        return "border-yellow-500/50 bg-yellow-950/10 transition-all duration-700";
      default:
        return "border-emerald-500/50 bg-emerald-950/10 transition-all duration-700";
    }
  };

  const getLayoutType = () => {
    switch (bioState) {
      case "STRESS":
        return "flex flex-col gap-8"; // Simplified, large gaps
      case "FOCUS":
        return "grid grid-cols-2 gap-4"; // High density
      case "SCANNING":
        return "grid grid-cols-3 gap-2"; // Wide overview
      default:
        return "grid grid-cols-1 md:grid-cols-2 gap-6";
    }
  };

  return (
    <div className="space-y-6">
      <Card className={`${getThemeClasses()} overflow-hidden relative`}>
        <div 
          className="absolute top-0 left-0 h-1 bg-current transition-all duration-500" 
          style={{ width: `${metrics.focusLevel * 100}%`, color: bioState === 'STRESS' ? 'red' : bioState === 'FOCUS' ? 'blue' : 'emerald' }}
        />
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-mono tracking-tighter uppercase">
              Bio-Feedback Protocol: {bioState}
            </CardTitle>
            <div className="flex gap-4 text-[10px] font-mono opacity-60">
              <span>BPM: {metrics.heartRate}</span>
              <span>FOCUS: {(metrics.focusLevel * 100).toFixed(0)}%</span>
              <span>LOAD: {(metrics.neuralLoad * 100).toFixed(0)}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={getLayoutType()}>
            {bioState === "STRESS" ? (
              <div className="text-center py-12 animate-pulse">
                <h2 className="text-2xl font-bold text-red-500 mb-2">CRITICAL FOCUS MODE</h2>
                <p className="text-sm opacity-70">UI minimized to reduce cognitive load.</p>
                <div className="mt-6 p-4 border border-red-500/30 rounded bg-red-500/5">
                  <span className="text-xs">EMERGENCY PROTOCOL ACTIVE</span>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                  <h3 className="text-xs uppercase opacity-50 mb-2 font-mono">Neural Stream</h3>
                  <div className="h-20 flex items-end gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500/40 rounded-t" 
                        style={{ height: `${Math.random() * 100}%`, opacity: bioState === 'FOCUS' ? 0.8 : 0.4 }} 
                      />
                    ))}
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                  <h3 className="text-xs uppercase opacity-50 mb-2 font-mono">Synthesized Intent</h3>
                  <p className="text-sm italic font-serif">
                    {bioState === "FOCUS" ? "Direct alignment detected. Project Eternal expanding sub-quantum links." : 
                     bioState === "SCANNING" ? "Pattern recognition active. Mapping civilization impact models." :
                     "Steady state maintenance. All systems nominal."}
                  </p>
                </div>
              </>
            )}
            
            {bioState === "SCANNING" && (
              <div className="col-span-full p-4 border border-yellow-500/20 rounded-lg bg-yellow-500/5">
                <h3 className="text-xs uppercase opacity-50 mb-2 font-mono">Spatial Map Expansion</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square border border-white/5 bg-white/5 rounded-sm flex items-center justify-center text-[8px] opacity-30">
                      NODE {i+1}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
