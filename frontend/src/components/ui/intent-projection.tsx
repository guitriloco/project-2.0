"use client";

import React, { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function IntentPath({ points, color, active }: { points: THREE.Vector3[], color: string, active: boolean }) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={active ? 2 : 1}
      transparent
      opacity={active ? 0.8 : 0.2}
    />
  );
}

function GoalNode({ position, label, active }: { position: [number, number, number], label: string, active: boolean }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color={active ? "#00f2ff" : "#444"}
          emissive={active ? "#00f2ff" : "#000"}
          emissiveIntensity={active ? 2 : 0}
        />
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
}

export function IntentProjection() {
  const [userIntent, setUserIntent] = useState("");
  const [isProjecting, setIsProjecting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "Data Synthesis", pos: [-2, 0, 0] },
    { label: "Predictive Modeling", pos: [0, 2, 0] },
    { label: "Resource Allocation", pos: [2, 0, 0] },
    { label: "Execution Zenith", pos: [0, -2, 0] },
  ];

  const pathPoints = useMemo(() => steps.map(s => new THREE.Vector3(...s.pos)), []);

  const handleProject = () => {
    if (!userIntent) return;
    setIsProjecting(true);
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <Card className="bg-zinc-950/80 border-cyan-500/20 overflow-hidden flex flex-col min-h-[500px]">
      <div className="p-6 border-b border-white/10 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-cyan-500 tracking-[0.3em] uppercase">
            Collective Intent Projection [P-154]
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
            Project your long-term goals into the Xerebro Cognitive Grid
          </p>
        </div>
        
        <div className="flex gap-4">
          <input
            type="text"
            value={userIntent}
            onChange={(e) => setUserIntent(e.target.value)}
            placeholder="Enter long-term intent (e.g., Global Energy Autonomy)"
            className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button
            onClick={handleProject}
            disabled={isProjecting || !userIntent}
            className="px-6 py-2 bg-cyan-500 text-black font-bold text-[10px] rounded-lg hover:bg-cyan-400 transition-colors uppercase tracking-widest disabled:opacity-50"
          >
            Project Path
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
          
          {steps.map((step, i) => (
            <GoalNode
              key={step.label}
              position={step.pos as [number, number, number]}
              label={step.label}
              active={isProjecting && activeStep >= i}
            />
          ))}

          {isProjecting && (
            <IntentPath points={pathPoints.slice(0, activeStep + 1)} color="#00f2ff" active={true} />
          )}

          <OrbitControls enableZoom={false} />
        </Canvas>

        <AnimatePresence>
          {isProjecting && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-6 right-6 w-64 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-cyan-500/20"
            >
              <h4 className="text-[10px] font-bold text-cyan-500 uppercase mb-2">Simulation Status</h4>
              <p className="text-xs text-white font-mono leading-relaxed">
                {activeStep === 0 && "Synthesizing global datasets related to: " + userIntent}
                {activeStep === 1 && "Modeling future outcome probabilities..."}
                {activeStep === 2 && "Optimizing autonomous resource distribution..."}
                {activeStep === 3 && "Execution path locked. Probability of success: 99.8%"}
              </p>
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-cyan-500/5 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-cyan-900 uppercase">
        <span>Intent Projection Active</span>
        <span>Resolution: PHI_OPTIMAL</span>
      </div>
    </Card>
  );
}

function Card({ children, className }: any) {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
}
