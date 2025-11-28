'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Neon green for that glowy look
const NEON_GREEN = '#39FF14';

interface Props {
  visible?: boolean;
  targetPosition?: [number, number, number];
}

// Targeting reticle that follows the lead drone
export function TargetingReticle({
  visible = true,
  targetPosition = [0, 0, 0],
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Position at target
    groupRef.current.position.set(...targetPosition);
    groupRef.current.position.z += 0.5; // Slightly in front
    
    // Rotate outer ring
    if (outerRef.current) {
      outerRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
    
    // Pulse inner ring
    if (innerRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* Outer rotating ring - thin */}
      <mesh ref={outerRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.82, 0.84, 4]} />
        <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner pulsing ring - thin */}
      <mesh ref={innerRef}>
        <ringGeometry args={[0.42, 0.44, 64]} />
        <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Crosshairs - thinner */}
      <group>
        {/* Top */}
        <mesh position={[0, 0.6, 0]}>
          <planeGeometry args={[0.01, 0.12]} />
          <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Bottom */}
        <mesh position={[0, -0.6, 0]}>
          <planeGeometry args={[0.01, 0.12]} />
          <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Left */}
        <mesh position={[-0.6, 0, 0]}>
          <planeGeometry args={[0.12, 0.01]} />
          <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        {/* Right */}
        <mesh position={[0.6, 0, 0]}>
          <planeGeometry args={[0.12, 0.01]} />
          <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// Corner brackets for framing
export function FrameBrackets({ visible = true }: { visible?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle breathing animation
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    groupRef.current.scale.setScalar(scale);
  });

  if (!visible) return null;

  const bracketSize = 0.25;
  const bracketThickness = 0.01;
  const offset = 1.2;

  const Bracket = ({ x, y, rotZ }: { x: number; y: number; rotZ: number }) => (
    <group position={[x, y, 0]} rotation={[0, 0, rotZ]}>
      <mesh position={[bracketSize / 2, 0, 0]}>
        <planeGeometry args={[bracketSize, bracketThickness]} />
        <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, bracketSize / 2, 0]}>
        <planeGeometry args={[bracketThickness, bracketSize]} />
        <meshBasicMaterial color={NEON_GREEN} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, 0, 0.5]}>
      <Bracket x={-offset} y={offset} rotZ={0} />
      <Bracket x={offset} y={offset} rotZ={Math.PI / 2} />
      <Bracket x={offset} y={-offset} rotZ={Math.PI} />
      <Bracket x={-offset} y={-offset} rotZ={-Math.PI / 2} />
    </group>
  );
}
