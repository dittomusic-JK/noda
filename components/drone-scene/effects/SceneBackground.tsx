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
  const terrainRef = useRef<THREE.ShaderMaterial>(null);
  
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

  // Terrain shader for section 4
  const { terrainVert, terrainFrag } = useMemo(() => ({
    terrainVert: `
      varying vec2 vUv;
      varying float vElevation;
      uniform float uTime;
      uniform float uProgress;
      
      // Simple noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      void main() {
        vUv = uv;
        
        vec3 pos = position;
        
        // Create mountain terrain on the sides
        float distFromCenter = abs(uv.x - 0.5) * 2.0; // 0 at center, 1 at edges
        float roadMask = smoothstep(0.15, 0.25, distFromCenter); // Road is in center
        
        // Mountain height based on distance from center road
        float mountainHeight = roadMask * 0.8;
        
        // Add noise for rocky terrain
        vec2 noiseCoord = uv * 8.0;
        noiseCoord.y += uTime * 0.3 + uProgress * 10.0; // Scroll terrain
        float n = noise(noiseCoord) * 0.5 + noise(noiseCoord * 2.0) * 0.25;
        
        pos.z += mountainHeight * n * 2.0;
        vElevation = pos.z;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    terrainFrag: `
      uniform float uTime;
      uniform float uProgress;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying float vElevation;
      
      void main() {
        // Road in center
        float distFromCenter = abs(vUv.x - 0.5) * 2.0;
        float road = 1.0 - smoothstep(0.1, 0.2, distFromCenter);
        
        // Road markings - thinner dashes
        float roadLine = step(0.7, mod(vUv.y * 40.0 + uTime * 2.0 + uProgress * 30.0, 1.0));
        roadLine *= step(distFromCenter, 0.015); // Thinner center line
        
        // Terrain color based on elevation
        vec3 lowColor = vec3(0.02, 0.05, 0.03);
        vec3 highColor = uColor * 0.3;
        vec3 terrainColor = mix(lowColor, highColor, vElevation * 0.5);
        
        // Road color
        vec3 roadColor = vec3(0.08, 0.08, 0.08);
        roadColor += uColor * roadLine * 0.5;
        
        // Wireframe effect on terrain
        vec2 gridUv = vUv * 30.0;
        gridUv.y += uTime * 0.5 + uProgress * 15.0;
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float gridLine = 1.0 - min(min(grid.x, grid.y), 1.0);
        terrainColor += uColor * gridLine * 0.15 * (1.0 - road);
        
        // Final mix
        vec3 finalColor = mix(terrainColor, roadColor, road);
        
        // Fade based on distance (fog effect)
        float fog = smoothstep(0.0, 0.7, vUv.y);
        finalColor = mix(vec3(0.01, 0.02, 0.02), finalColor, fog);
        
        // Fade in during section 4
        float section4 = smoothstep(0.7, 0.8, uProgress);
        finalColor *= section4;
        
        gl_FragColor = vec4(finalColor, section4);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uProgress.value = progress;
    }
    if (terrainRef.current) {
      terrainRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      terrainRef.current.uniforms.uProgress.value = progress;
    }
  });

  return (
    <group>
      {/* Base grid background */}
      <mesh 
        ref={meshRef} 
        position={[0, -3, -5]} 
        rotation={[-Math.PI / 2.5, 0, 0]}
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
      
      {/* Terrain with road (section 4) */}
      <mesh 
        position={[0, -1.8, -4]} 
        rotation={[-Math.PI / 2.3, 0, 0]}
        scale={[25, 50, 1]}
      >
        <planeGeometry args={[1, 1, 64, 64]} />
        <shaderMaterial
          ref={terrainRef}
          vertexShader={terrainVert}
          fragmentShader={terrainFrag}
          uniforms={{
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uColor: { value: new THREE.Color('#00ffe5') },
          }}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
