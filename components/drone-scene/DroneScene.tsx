'use client';

import { Suspense, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, useProgress } from '@react-three/drei';
import { DroneFleet } from './DroneFleet';
import { useScrollProgress } from './hooks/useScrollProgress';

// Error Boundary for 3D scene
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DroneScene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="drone-scene-error">
          <p>Failed to load 3D scene</p>
          <small>{this.state.error?.message}</small>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading indicator component
function LoadingIndicator() {
  const { progress, active } = useProgress();
  
  if (!active) return null;
  
  return (
    <div className="drone-scene-loader">
      <div className="loader-bar">
        <div 
          className="loader-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="loader-text">Loading assets... {progress.toFixed(0)}%</span>
    </div>
  );
}

// Inner component that uses R3F hooks
function DroneSceneContent() {
  const progress = useScrollProgress('.drone-journey-container');
  
  return (
    <>
      {/* Low ambient for dramatic holographic look */}
      <ambientLight intensity={0.15} />
      
      {/* Main light - cool cyan tint for holographic feel */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.8}
        color="#aaffee"
      />
      
      {/* Fill light from below - subtle */}
      <directionalLight 
        position={[-3, -5, 2]} 
        intensity={0.3}
        color="#00ffe5"
      />
      
      {/* Rim light from behind */}
      <directionalLight 
        position={[0, 3, -8]} 
        intensity={0.5}
        color="#00ffaa"
      />
      
      {/* Environment - dark with cyan tint */}
      <hemisphereLight 
        args={['#00221a', '#000000', 0.4]} 
      />
      
      {/* Add fog for depth */}
      <fog attach="fog" args={['#0a1410', 15, 40]} />
      
      <Suspense fallback={null}>
        <DroneFleet progress={progress} />
        <Preload all />
      </Suspense>
    </>
  );
}

interface DroneSceneProps {
  className?: string;
}

export function DroneScene({ className = '' }: DroneSceneProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Don't render on server
  if (!isMounted) {
    return (
      <div className={`drone-scene-wrapper ${className}`}>
        <div className="drone-scene-placeholder" />
      </div>
    );
  }
  
  // Mobile fallback - could be a static image or simplified version
  if (isMobile) {
    return (
      <div className={`drone-scene-wrapper drone-scene-mobile ${className}`}>
        <div className="drone-scene-mobile-content">
          {/* Could add a video or static image fallback here */}
          <p className="mobile-message">3D experience optimized for desktop</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`drone-scene-wrapper ${className}`}>
      <LoadingIndicator />
      <SceneErrorBoundary>
        <Canvas
          camera={{ 
            position: [0, 0, 6], 
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            console.log('Canvas created successfully');
          }}
        >
          <DroneSceneContent />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

// Export for barrel file
export default DroneScene;
