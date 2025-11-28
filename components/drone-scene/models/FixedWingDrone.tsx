'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  hover?: boolean;
  highlight?: boolean;
  rotationY?: number; // Additional Y rotation from scroll
}

const HOLO_COLOR = new THREE.Color('#00ffe5');

export function FixedWingDrone({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  hover = false,
  highlight = false,
  rotationY = 0,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/Drone_3d_models/fixed_wing_drone_optimized.glb');
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    // Apply holographic material to all meshes
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const oldMaterial = mesh.material as THREE.MeshStandardMaterial;
        
        // Create holographic material
        const holoMaterial = new THREE.MeshStandardMaterial({
          color: oldMaterial.color || new THREE.Color('#333333'),
          emissive: HOLO_COLOR,
          emissiveIntensity: 0.15,
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9,
        });
        
        mesh.material = holoMaterial;
      }
    });
    
    return clone;
  }, [scene]);

  // Update emissive intensity for highlight/pulse effect
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Hover bobbing
    if (hover) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
    
    // Pulse emissive for holographic effect
    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9;
    const highlightBoost = highlight ? 0.3 : 0;
    
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (material.emissive) {
          material.emissiveIntensity = (0.15 + highlightBoost) * pulse;
        }
      }
    });
  });

  const finalRotation: [number, number, number] = [
    rotation[0],
    rotation[1] + rotationY,
    rotation[2],
  ];

  return (
    <group ref={groupRef} position={position} rotation={finalRotation} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}
