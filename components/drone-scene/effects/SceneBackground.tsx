'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  progress?: number;
}

export function SceneBackground({ progress = 0 }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
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
      uniform float uProgress;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      
      void main() {
        // Perspective grid
        vec2 gridUv = vUv * 40.0;
        gridUv.y += uTime * 0.5 + uProgress * 20.0; // Scroll with progress
        
        // Primary grid lines
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float line = min(grid.x, grid.y);
        float gridLine = 1.0 - min(line, 1.0);
        
        // Larger grid overlay
        vec2 gridUv2 = vUv * 8.0;
        gridUv2.y += uTime * 0.1 + uProgress * 5.0;
        vec2 grid2 = abs(fract(gridUv2 - 0.5) - 0.5) / fwidth(gridUv2);
        float line2 = min(grid2.x, grid2.y);
        float gridLine2 = 1.0 - min(line2, 1.0);
        
        // Vignette / radial fade
        float dist = length(vUv - 0.5) * 2.0;
        float vignette = 1.0 - smoothstep(0.3, 1.2, dist);
        
        // Horizon line emphasis
        float horizon = 1.0 - abs(vUv.y - 0.3) * 2.0;
        horizon = max(0.0, horizon);
        
        // Scanline sweep
        float sweep = sin(vUv.y * 100.0 - uTime * 3.0) * 0.5 + 0.5;
        sweep = smoothstep(0.48, 0.52, sweep) * 0.1;
        
        // Fade in grid based on progress (starts at 10%, fully visible by 40%)
        float fadeIn = smoothstep(0.1, 0.4, uProgress);
        
        // Combine
        float finalGrid = (gridLine * 0.4 + gridLine2 * 0.6) * vignette * fadeIn;
        finalGrid += sweep * vignette * fadeIn;
        finalGrid += horizon * 0.1 * fadeIn;
        
        // Base dark color with subtle gradient
        vec3 bgColor = vec3(0.02, 0.04, 0.03);
        bgColor += uColor * finalGrid * 0.12; // More transparent grid
        
        gl_FragColor = vec4(bgColor, 1.0);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uProgress.value = progress;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, -3, -5]} 
      rotation={[-Math.PI / 2.5, 0, 0]} // Angled like ground plane
      scale={[80, 60, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uColor: { value: new THREE.Color('#00ffe5') },
        }}
      />
    </mesh>
  );
}
