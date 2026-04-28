'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const NeuralLinkNode = ({ position, label, active, onClick }: any) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        position={position}
        ref={mesh}
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color={active ? '#00f2ff' : hovered ? '#7000ff' : '#444'}
          speed={active ? 4 : 2}
          distort={0.4}
          radius={1}
        />
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
};

const ConnectionLine = ({ start, end, active }: any) => {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={active ? '#00f2ff' : '#222'} linewidth={1} transparent opacity={0.5} />
    </line>
  );
};

export default function TransHumanXRInterface() {
  const [activeNode, setActiveNode] = useState('Core');

  const nodes = [
    { id: 'Core', label: 'Xerebro Core', pos: [0, 0, 0] },
    { id: 'Visual', label: 'Visual Cortex', pos: [2, 1, -1] },
    { id: 'Logic', label: 'Logic Processor', pos: [-2, 1, 1] },
    { id: 'Memory', label: 'Synaptic Storage', pos: [0, -2, 2] },
    { id: 'Action', label: 'Execution Motor', pos: [1, 2, 2] },
  ];

  return (
    <div className="w-full h-[600px] bg-black rounded-xl overflow-hidden relative border border-cyan-900/30">
      <div className="absolute top-6 left-6 z-10 space-y-2 pointer-events-none">
        <h2 className="text-2xl font-bold text-cyan-400 tracking-tighter uppercase italic">
          Trans-Human interaction Layer
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs text-cyan-300 font-mono">NEURAL LINK ACTIVE: {activeNode}</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 max-w-xs bg-black/60 backdrop-blur-md p-4 rounded-lg border border-cyan-500/20 text-cyan-100 text-sm font-mono">
        <p>SYSTEM STATUS: IMMERSIVE CONTEXT SYNCED</p>
        <p className="mt-2 text-gray-400 italic">
          Spatial computing active. Interact with nodes to modulate cognitive focus.
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {nodes.map((node) => (
          <NeuralLinkNode
            key={node.id}
            position={node.pos}
            label={node.label}
            active={activeNode === node.id}
            onClick={() => setActiveNode(node.id)}
          />
        ))}

        {nodes.slice(1).map((node, i) => (
          <ConnectionLine
            key={`line-${i}`}
            start={nodes[0].pos}
            end={node.pos}
            active={activeNode === node.id || activeNode === 'Core'}
          />
        ))}

        <OrbitControls enablePan={false} enableZoom={true} minDistance={5} maxDistance={15} />
      </Canvas>
    </div>
  );
}
