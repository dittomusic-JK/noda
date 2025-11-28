'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial } from 'three';

interface Props {
  position?: [number, number, number];
  active?: boolean;
  color?: string;
}

// Neon green color
const NEON_GREEN = '#39FF14';

export function ScanPulse({ 
  position = [0, 0, 0], 
  active = true,
  color = NEON_GREEN,
}: Props) {
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (!active) return;
    
    const rings = [ring1Ref.current, ring2Ref.current, ring3Ref.current];
    const offsets = [0, 0.33, 0.66]; // Stagger the pulses
    
    rings.forEach((ring, i) => {
      if (!ring) return;
      
      const time = (state.clock.elapsedTime + offsets[i] * 2) % 2;
      const progress = time / 2; // 0 to 1 over 2 seconds
      
      // Scale up
      const scale = 1 + progress * 3;
      ring.scale.set(scale, scale, 1);
      
      // Fade out
      const material = ring.material as MeshBasicMaterial;
      material.opacity = (1 - progress) * 0.8;
    });
  });

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Multiple staggered thin rings */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.32, 0.34, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.32, 0.34, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring3Ref}>
        <ringGeometry args={[0.32, 0.34, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
