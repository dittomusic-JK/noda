'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial } from 'three';

interface Props {
  visible?: boolean;
  opacity?: number;
  color?: string;
}

// Custom shader for animated grid
const gridVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec2 vUv;
  
  void main() {
    vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
    float line = min(grid.x, grid.y);
    float gridLine = 1.0 - min(line, 1.0);
    
    // Add pulse effect
    float pulse = sin(uTime * 2.0 + vUv.x * 10.0 + vUv.y * 10.0) * 0.3 + 0.7;
    
    // Fade at edges
    float edgeFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x) *
                     smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    
    float alpha = gridLine * uOpacity * pulse * edgeFade;
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function GridMesh({ 
  visible = true,
  opacity = 0.3,
  color = '#00ffe5',
}: Props) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uOpacity.value = visible ? opacity : 0;
    }
  });

  if (!visible) return null;

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]}
    >
      <planeGeometry args={[20, 20, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uColor: { value: [0, 1, 0.9] }, // Cyan
        }}
      />
    </mesh>
  );
}
