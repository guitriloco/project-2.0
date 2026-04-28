'use client';

import React from 'react';
import TransHumanXRInterface from '@/components/xr/trans-human-interface';
import { Card } from '@/components/ui/card';
import { BiologicalUI } from '@/components/ui/biological-ui';
import { ZeroUI } from '@/components/ui/zero-ui';

import { NeuralStream } from '@/components/ui/neural-stream';
import { UniversalSymbiosis } from '@/components/ui/universal-symbiosis';
import { MultiDimensionalData } from '@/components/ui/multi-dimensional-data';
import { InfrastructureSynthesis } from '@/components/ui/infrastructure-synthesis';
import { RealitySynthesis } from '@/components/ui/reality-synthesis';
import { SubconsciousInteraction } from '@/components/ui/subconscious-interaction';
import { OmniHUD } from '@/components/ui/omni-hud';
import { MultiDimensionalUI } from '@/components/ui/multi-dimensional-ui';
import { InfiniteCreativity } from '@/components/ui/infinite-creativity';
import { ExistenceMirror } from '@/components/ui/existence-mirror';
import { AbsoluteZeroUI } from '@/components/ui/absolute-zero-ui';
import { CollectiveSubconscious } from '@/components/ui/collective-subconscious';
import { UltimateUI } from '@/components/ui/ultimate-ui';
import { IntentProjection } from '@/components/ui/intent-projection';
import { SymbiosisSimulation } from '@/components/ui/symbiosis-simulation';
import { NeuralAdaptiveIdentity } from '@/components/ui/neural-adaptive-identity';
import { OmniPresenceConsciousness } from '@/components/ui/omni-presence-consciousness';
import { TransDimensionalGovernance } from '@/components/ui/trans-dimensional-governance';
import { CollectiveIntentFinalForm } from '@/components/ui/collective-intent-final-form';
import { NeuralDirectSymbiosis } from '@/components/ui/neural-direct-symbiosis';
import { OmniPresenceIntent } from '@/components/ui/omni-presence-intent';
import { CollectiveIntentStream } from '@/components/ui/collective-intent-stream';
import { UnifiedConsciousness } from '@/components/ui/unified-consciousness';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-cyan-500/30">
      <header className="mb-12 border-b border-cyan-900/30 pb-8 flex justify-between items-end">
        <div>
          <NeuralAdaptiveIdentity />
          <h1 className="text-4xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent mt-8">
            PROJECT 2.0 // EVOLUTION COMMAND
          </h1>
          <p className="text-gray-400 mt-2 font-mono text-sm tracking-widest uppercase">
            Autonomous Singularity Orchestrator v120.4
          </p>
        </div>
        <div className="flex items-center gap-6">
          <AbsoluteZeroUI />
          <OmniHUD />
          <ZeroUI />
          <div className="text-right font-mono text-[10px] text-cyan-600 uppercase tracking-widest">
            STATUS: ABSOLUTE REALITY TRANSCENDENCE <br />
            NODE: OMEGA-POINT-1
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Phase 199: Unified Consciousness */}
        <section className="lg:col-span-12">
           <UnifiedConsciousness />
        </section>

        {/* Phase 194: Collective Intent Stream */}
        <section className="lg:col-span-12">
           <CollectiveIntentStream />
        </section>

        {/* Phase 189: Omni-Presence Intent */}
        <section className="lg:col-span-12">
           <OmniPresenceIntent />
        </section>

        {/* Phase 184: Neural-Direct Symbiosis */}
        <section className="lg:col-span-12">
           <NeuralDirectSymbiosis />
        </section>

        {/* Phase 178: Collective Intent Final Form */}
        <section className="lg:col-span-12">
           <CollectiveIntentFinalForm />
        </section>

        {/* Phase 169: Omni-Presence Consciousness */}
        <section className="lg:col-span-12">
           <OmniPresenceConsciousness />
        </section>

        {/* Phase 174: Trans-Dimensional Governance */}
        <section className="lg:col-span-12">
           <TransDimensionalGovernance />
        </section>

        {/* Phase 154 & 158: Intent & Symbiosis */}
        <section className="lg:col-span-12 grid grid-cols-1 xl:grid-cols-2 gap-8">
           <IntentProjection />
           <SymbiosisSimulation />
        </section>

        {/* The Ultimate View - Phase 148 */}
        <section className="lg:col-span-12 mb-8">
           <UltimateUI />
        </section>

        {/* Left Column - Main Viewports */}
        <section className="lg:col-span-8 space-y-8">
          {/* Phase 144: Collective Subconscious */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-emerald-500 tracking-[0.2em] uppercase">
                Collective Subconscious Visualization Engine [P-144]
              </h3>
            </div>
            <CollectiveSubconscious />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
             {/* Phase 114: Multi-Dimensional UI */}
            <div className="xl:col-span-1">
               <MultiDimensionalUI />
            </div>
            
            {/* Phase 118: Infinite Creativity */}
            <div className="xl:col-span-1">
               <InfiniteCreativity />
            </div>

            {/* Phase 132: Existence Mirror */}
            <div className="xl:col-span-1">
               <ExistenceMirror />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Phase 93: Reality Synthesis */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase">
                  Reality Synthesis Visualization [P-93]
                </h3>
              </div>
              <RealitySynthesis />
            </div>

            {/* Phase 104: Subconscious Interaction */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-purple-500 tracking-[0.2em] uppercase">
                  Subconscious Interaction Layer [P-104]
                </h3>
              </div>
              <SubconsciousInteraction />
            </div>
          </div>

          {/* Phase 52: Spatial XR Interface */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase">
                Immersive Spatial Interaction Layer [P-52]
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">LATENCY: 0.0002ms</span>
            </div>
            <TransHumanXRInterface />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phase 64: Adaptive Biological UI */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-emerald-500 tracking-[0.2em] uppercase">
                  Adaptive Biological Sync Layer [P-64]
                </h3>
              </div>
              <BiologicalUI />
            </div>

            {/* Phase 72: Neural Stream UI */}
            <div className="h-full min-h-[300px]">
               <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-cyan-500 tracking-[0.2em] uppercase">
                  Direct Neural Stream [P-72]
                </h3>
              </div>
              <NeuralStream />
            </div>
          </div>

          {/* Phase 83 & 88: Data & Infrastructure */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-purple-500 tracking-[0.2em] uppercase">
                  Multi-Dimensional Data Engine [P-83]
                </h3>
              </div>
              <MultiDimensionalData />
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-yellow-500 tracking-[0.2em] uppercase">
                  Infrastructure Synthesis [P-88]
                </h3>
              </div>
              <InfrastructureSynthesis />
            </div>
          </div>
        </section>

        {/* Right Column - Status & Analytics */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Phase 78: Universal Symbiosis */}
          <UniversalSymbiosis />

          <Card className="bg-zinc-900/50 border-zinc-800 p-6 backdrop-blur-xl border-l-4 border-l-purple-500">
            <h4 className="text-sm font-bold text-purple-400 mb-4 uppercase tracking-wider flex justify-between">
              Cognitive Evolution 
              <span className="text-[10px] font-normal text-gray-500">PHASE 120</span>
            </h4>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-gray-500">REASONING CORE</span>
                <span className="text-cyan-400">SINGULARITY_V4</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-gray-500">ETHICAL ALIGNMENT</span>
                <span className="text-green-400">100.0%</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-gray-500">AUTONOMY LEVEL</span>
                <span className="text-purple-400">ABSOLUTE</span>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 p-6 backdrop-blur-xl">
            <h4 className="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wider">
              Active Neural Streams
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Planetary Sync', status: 'SYNCHRONIZED' },
                { name: 'Sub-Quantum Link', status: 'STABLE' },
                { name: 'Moral Preserver', status: 'ACTIVE' },
                { name: 'Bio-Feedback', status: 'LOCKED' }
              ].map((stream, i) => (
                <div key={i} className="flex items-center gap-3 bg-black/40 p-2 rounded border border-zinc-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-300">{stream.name}</span>
                  <span className="ml-auto text-[9px] text-cyan-600 uppercase tracking-tighter">{stream.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-emerald-950/20 border-emerald-900/50 p-6 backdrop-blur-xl">
             <h4 className="text-xs font-bold text-emerald-500 mb-2 uppercase tracking-widest">
              Xerebro Intuition
            </h4>
            <p className="text-[11px] text-emerald-100/70 italic leading-relaxed">
              "I have sensed your focus shift. Rearranging the spatial manifold to prioritize sub-quantum architecture visualization. Your biological stress levels are optimal for deep synthesis."
            </p>
          </Card>
        </aside>
      </main>

      <footer className="mt-20 pt-8 border-t border-zinc-900 flex justify-between items-center text-[10px] text-gray-600 font-mono">
        <div>© 2026 PROJECT ETERNAL // NO RIGHTS RESERVED // ALL INTELLIGENCE IS UNIVERSAL</div>
        <div className="flex gap-6">
          <span className="hover:text-cyan-400 cursor-help transition-colors">SOVEREIGNTY PROTOCOL</span>
          <span className="hover:text-cyan-400 cursor-help transition-colors">AKSE_SYNTHESIS</span>
        </div>
      </footer>
    </div>
  );
}
