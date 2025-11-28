'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  visible?: boolean;
  opacity?: number;
  yPosition?: number;
  scrollOffset?: number;
}

export function GroundPlane({
  visible = true,
  opacity = 0.3,
  yPosition = -2,
  scrollOffset = 0,
}: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Grid shader
  const { vertexShader, fragmentShader } = useMemo(() => ({
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      uniform float uScrollOffset;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      
      void main() {
        // Moving grid based on world position
        vec2 gridPos = vWorldPos.xz + vec2(0.0, uScrollOffset);
        
        // Create grid lines
        vec2 grid = abs(fract(gridPos * 0.5 - 0.5) - 0.5) / fwidth(gridPos * 0.5);
        float line = min(grid.x, grid.y);
        float gridLine = 1.0 - min(line, 1.0);
        
        // Subtle secondary grid
        vec2 grid2 = abs(fract(gridPos * 0.1 - 0.5) - 0.5) / fwidth(gridPos * 0.1);
        float line2 = min(grid2.x, grid2.y);
        float gridLine2 = 1.0 - min(line2, 1.0);
        
        // Distance fade (stronger at edges)
        float dist = length(vWorldPos.xz);
        float distFade = 1.0 - smoothstep(5.0, 25.0, dist);
        
        // Horizon fade (fade towards back)
        float horizonFade = smoothstep(-20.0, 5.0, vWorldPos.z);
        
        // Combine
        float finalGrid = (gridLine * 0.8 + gridLine2 * 0.4) * distFade * horizonFade;
        
        // Scanline effect
        float scanline = sin(vWorldPos.z * 2.0 + uTime * 3.0) * 0.5 + 0.5;
        scanline = smoothstep(0.4, 0.6, scanline) * 0.3;
        
        float alpha = (finalGrid + scanline) * uOpacity;
        
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uOpacity.value = visible ? opacity : 0;
      materialRef.current.uniforms.uScrollOffset.value = scrollOffset;
    }
  });

  if (!visible && opacity === 0) return null;

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, yPosition, -5]}
    >
      <planeGeometry args={[50, 50, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uScrollOffset: { value: 0 },
          uColor: { value: new THREE.Color('#00ffe5') },
        }}
      />
    </mesh>
  );
}
