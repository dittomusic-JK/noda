'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  from: [number, number, number];
  to: [number, number, number];
  active?: boolean;
  color?: string;
}

// Simple data link using drei's Line component
export function SimpleDataLink({ 
  from, 
  to, 
  active = true,
  color = '#00ffe5',
}: Props) {
  const lineRef = useRef<THREE.Line>(null);
  const opacityRef = useRef(0.8);
  
  const points = useMemo(() => {
    return [from, to];
  }, [from, to]);
  
  useFrame((state) => {
    // Flicker effect
    const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.2 + 0.8;
    opacityRef.current = active ? flicker : 0;
  });

  if (!active) return null;

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacityRef.current}
      dashed
      dashScale={50}
      dashSize={0.5}
      gapSize={0.25}
    />
  );
}
