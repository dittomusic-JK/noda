'use client';

import { useRef, useMemo, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicWrapperProps {
  children: ReactNode;
  intensity?: number;
  color?: string;
  pulseSpeed?: number;
}

// Wrap any 3D object to give it a holographic effect
export function HolographicWrapper({
  children,
  intensity = 0.5,
  color = '#00ffe5',
  pulseSpeed = 2,
}: HolographicWrapperProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Apply holographic effect to all meshes in the group
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        
        if (material.emissive) {
          // Pulse the emissive intensity
          const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.15 + 0.85;
          material.emissiveIntensity = intensity * pulse;
        }
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}

// Scanline overlay effect
interface ScanlineOverlayProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function ScanlineOverlay({
  position = [0, 0, 0],
  scale = 2,
  color = '#00ffe5',
}: ScanlineOverlayProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { vertexShader, fragmentShader } = useMemo(() => ({
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Horizontal scanlines
        float scanline = sin(vPosition.y * 50.0 + uTime * 5.0) * 0.5 + 0.5;
        scanline = smoothstep(0.4, 0.6, scanline);
        
        // Edge glow
        float edge = 1.0 - smoothstep(0.3, 0.5, length(vUv - 0.5));
        
        float alpha = scanline * 0.1 + edge * 0.05;
        
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
        }}
      />
    </mesh>
  );
}
