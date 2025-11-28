'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  count?: number;
  speed?: number;
  color?: string;
  size?: number;
  depth?: number;
}

export function ParticleField({
  count = 200,
  speed = 0.5,
  color = '#00ffe5',
  size = 0.03,
  depth = 30,
}: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a cylinder around the scene
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15; // 5-20 units from center
      
      positions[i * 3] = Math.cos(angle) * radius;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y (-5 to 5)
      positions[i * 3 + 2] = Math.random() * depth - depth / 2; // z
      
      velocities[i] = 0.5 + Math.random() * 0.5; // Speed variation
    }
    
    return { positions, velocities };
  }, [count, depth]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    return geo;
  }, [particles]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Move particles forward (negative z)
      positions[i * 3 + 2] -= delta * speed * particles.velocities[i];
      
      // Reset particles that go past the camera
      if (positions[i * 3 + 2] < -depth / 2) {
        positions[i * 3 + 2] = depth / 2;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
