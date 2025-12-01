'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SyncPulseProps {
  center: [number, number, number];
  targets: [number, number, number][];
  progress: number; // 0-1 within section 3
  active: boolean;
}

// Expanding ring that pulses outward from center
function PulseRing({ 
  center, 
  pulseProgress 
}: { 
  center: [number, number, number]; 
  pulseProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const scale = pulseProgress * 8; // Expand to radius 8
  const opacity = Math.max(0, 1 - pulseProgress);
  
  return (
    <mesh 
      ref={meshRef} 
      position={center} 
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[scale, scale, 1]}
    >
      <ringGeometry args={[0.95, 1, 64]} />
      <meshBasicMaterial 
        color="#00ffe5" 
        transparent 
        opacity={opacity * 0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Data stream line from center to target
function DataStream({
  from,
  to,
  active,
}: {
  from: [number, number, number];
  to: [number, number, number];
  streamProgress: number;
  active: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  // Create geometry with points along the line
  const geometry = useMemo(() => {
    const segments = 20;
    const positions = new Float32Array(segments * 3);
    
    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1);
      positions[i * 3] = from[0] + (to[0] - from[0]) * t;
      positions[i * 3 + 1] = from[1] + (to[1] - from[1]) * t;
      positions[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [from, to]);
  
  if (!active) return null;
  
  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
      color: '#00ffe5', 
      transparent: true, 
      opacity: 0.6 
    }))} />
  );
}

// Flash effect on drone when it receives the sync
export function DroneFlash({
  position,
  active,
  intensity,
}: {
  position: [number, number, number];
  active: boolean;
  intensity: number;
}) {
  if (!active || intensity <= 0) return null;
  
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.3 + intensity * 0.3, 16, 16]} />
      <meshBasicMaterial
        color="#00ffe5"
        transparent
        opacity={intensity * 0.5}
      />
    </mesh>
  );
}

export function SyncPulse({ center, targets, progress, active }: SyncPulseProps) {
  // Create multiple pulse waves
  const pulseCount = 3;
  const pulses = useMemo(() => {
    return Array.from({ length: pulseCount }, (_, i) => {
      const offset = i / pulseCount;
      const pulseProgress = (progress * 2 + offset) % 1;
      return { id: i, progress: pulseProgress };
    });
  }, [progress]);
  
  if (!active) return null;
  
  return (
    <group>
      {/* Expanding pulse rings */}
      {pulses.map((pulse) => (
        <PulseRing 
          key={pulse.id} 
          center={center} 
          pulseProgress={pulse.progress} 
        />
      ))}
      
      {/* Data streams to each target */}
      {targets.map((target, i) => {
        // Staggered activation
        const streamStart = i * 0.15;
        const streamProgress = Math.max(0, (progress - streamStart) / (1 - streamStart));
        return (
          <DataStream
            key={i}
            from={center}
            to={target}
            streamProgress={progress}
            active={progress > streamStart}
          />
        );
      })}
      
      {/* Center glow */}
      <mesh position={center}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#00ffe5"
          transparent
          opacity={0.4 + Math.sin(progress * Math.PI * 8) * 0.2}
        />
      </mesh>
    </group>
  );
}
