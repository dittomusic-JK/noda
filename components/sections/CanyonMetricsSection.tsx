'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const METRICS = [
  {
    label: 'Velocity',
    value: '~4',
    unit: 'Months',
    description: 'Pre-Seed to 1st Deal'
  },
  {
    label: 'B2B Adoption',
    value: '6',
    unit: 'OEM Manufacturers',
    description: 'Platform Contracts'
  },
  {
    label: 'Ecosystem',
    value: '~20',
    unit: 'Partner Integrations',
    description: 'Subsurface to Stratosphere'
  },
  {
    label: 'Integration',
    value: '<30',
    unit: 'Minutes',
    description: 'Average Time to Integrate New UxV'
  }
];

export const CanyonMetricsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    canyon: THREE.Group;
  } | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0A1410, 10, 100);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 0);
    camera.rotation.x = -0.1;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0A1410, 1);

    // Create wireframe canyon
    const canyon = new THREE.Group();
    
    // Generate organic terrain-like canyon with elevation changes
    const segments = 50;
    const spacing = 4;
    const widthVariation = 12;
    const baseWidth = 15;
    
    for (let i = 0; i < segments; i++) {
      const z = i * spacing;
      const progress = i / segments;
      
      // More organic canyon shape with multiple sine waves
      const leftOffset = 
        Math.sin(progress * Math.PI * 3) * widthVariation + 
        Math.sin(progress * Math.PI * 7) * 4 + 
        baseWidth;
      const rightOffset = 
        Math.cos(progress * Math.PI * 2.5) * widthVariation + 
        Math.sin(progress * Math.PI * 5) * 5 - 
        baseWidth;
      
      // Varied height like mountain ridges - more dramatic peaks
      const leftHeight = 12 + 
        Math.sin(progress * Math.PI * 6) * 10 + 
        Math.cos(progress * Math.PI * 12) * 5 + 
        Math.sin(progress * Math.PI * 20) * 3;
      const rightHeight = 14 + 
        Math.cos(progress * Math.PI * 5) * 12 + 
        Math.sin(progress * Math.PI * 10) * 4 + 
        Math.cos(progress * Math.PI * 18) * 3;
      
      // Create terrain-like wireframe walls with more subdivisions
      const leftGeometry = new THREE.PlaneGeometry(0.3, leftHeight, 1, 16);
      const leftMaterial = new THREE.MeshBasicMaterial({
        color: 0x8AA8C8,
        wireframe: true,
        transparent: true,
        opacity: 0.4 - (progress * 0.2)
      });
      const leftWall = new THREE.Mesh(leftGeometry, leftMaterial);
      leftWall.position.set(-leftOffset, leftHeight / 2, -z);
      leftWall.rotation.y = Math.PI / 2 + Math.sin(progress * Math.PI * 8) * 0.15;
      canyon.add(leftWall);
      
      const rightGeometry = new THREE.PlaneGeometry(0.3, rightHeight, 1, 16);
      const rightMaterial = new THREE.MeshBasicMaterial({
        color: 0x8AA8C8,
        wireframe: true,
        transparent: true,
        opacity: 0.4 - (progress * 0.2)
      });
      const rightWall = new THREE.Mesh(rightGeometry, rightMaterial);
      rightWall.position.set(-rightOffset, rightHeight / 2, -z);
      rightWall.rotation.y = -Math.PI / 2 + Math.cos(progress * Math.PI * 8) * 0.15;
      canyon.add(rightWall);
      
      // Add ridge lines at peak
      if (i % 2 === 0) {
        const ridgeGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-leftOffset, leftHeight, -z),
          new THREE.Vector3(-rightOffset, rightHeight, -z)
        ]);
        const ridgeMaterial = new THREE.LineBasicMaterial({
          color: 0x6BB0FF,
          transparent: true,
          opacity: 0.35 - (progress * 0.2)
        });
        const ridge = new THREE.Line(ridgeGeometry, ridgeMaterial);
        canyon.add(ridge);
      }
      
      // Contour lines on walls for topographic effect - more frequent
      for (let h = 2; h < Math.max(leftHeight, rightHeight); h += 2) {
        const contourGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-leftOffset, h, -z),
          new THREE.Vector3(-rightOffset, h, -z)
        ]);
        const contourMaterial = new THREE.LineBasicMaterial({
          color: 0x7A9ABE,
          transparent: true,
          opacity: 0.2 - (progress * 0.1)
        });
        const contour = new THREE.Line(contourGeometry, contourMaterial);
        canyon.add(contour);
      }
      
      // Varied floor elevation (valley floor) - deeper valleys
      const floorY = -3 + Math.sin(progress * Math.PI * 4) * 2;
      if (i % 2 === 0) {
        const floorGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-leftOffset, floorY, -z),
          new THREE.Vector3(-rightOffset, floorY, -z)
        ]);
        const floorMaterial = new THREE.LineBasicMaterial({
          color: 0x6A8AAE,
          transparent: true,
          opacity: 0.25 - (progress * 0.12)
        });
        const floor = new THREE.Line(floorGeometry, floorMaterial);
        canyon.add(floor);
      }
    }
    
    scene.add(canyon);

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = -Math.random() * 200;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6BB0FF,
      size: 0.15,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, canyon };

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  // Animate canyon based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !sceneRef.current || !canvas) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility and fade (smooth fade in/out at edges)
      const fadeDistance = windowHeight * 0.3; // 30% of screen for fade
      let opacity = 1;
      
      if (rect.top > 0) {
        // Fading in from top
        opacity = Math.max(0, 1 - (rect.top / fadeDistance));
      } else if (rect.bottom < windowHeight * 1.5) {
        // Fading out earlier - start when 150% of viewport from bottom
        opacity = Math.max(0, rect.bottom / (fadeDistance * 1.8));
      }
      
      canvas.style.opacity = String(opacity);
      
      // Calculate progress through section (0 to 1)
      const sectionHeight = rect.height;
      const scrolled = Math.max(0, -rect.top);
      const scrollableDistance = sectionHeight - windowHeight;
      const progress = scrollableDistance > 0 ? Math.min(1, scrolled / scrollableDistance) : 0;
      
      // Map progress to metrics (0 to 3)
      const metricProgress = progress * (METRICS.length - 1);
      setCurrentMetric(metricProgress);
      setScrollProgress(progress);
      
      // Update camera position based on progress
      const { camera } = sceneRef.current;
      camera.position.z = -metricProgress * 30;
      camera.position.y = 1 + Math.sin(metricProgress * 0.5) * 1.5;
      camera.rotation.x = -0.08 + Math.sin(metricProgress * 0.3) * 0.06;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track when section is in viewport
  useEffect(() => {
    const checkVisibility = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const windowHeight = window.innerHeight;
      const visible = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(visible);
    };
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  const activeIndex = Math.floor(currentMetric);

  return (
    <section ref={containerRef} className="canyon-metrics-section">
      <canvas ref={canvasRef} className="canyon-canvas" style={{ display: isInView ? 'block' : 'none' }} />
      
      <div className="metrics-overlay">
        {/* Header */}
        <div className="metrics-header">
          <div className="overline">
            <span className="bracket">[</span>
            BY THE NUMBERS
            <span className="bracket">]</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Proven at <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-xl text-white/60">
            From pre-seed to production in record time
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {METRICS.map((metric, index) => {
            const isActive = activeIndex === index;
            const isPassed = index < activeIndex;
            const state = isActive ? 'active' : (isPassed ? 'passed' : 'upcoming');
            
            return (
              <div
                key={metric.label}
                className="metric-card"
                data-state={state}
              >
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-unit">{metric.unit}</div>
                <div className="metric-description">{metric.description}</div>
              </div>
            );
          })}
        </div>

        {/* Award Badge */}
        <div className="award-badge">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>CDAO Phase 1 SBIR Winner</span>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-track">
            <div className="scroll-thumb" style={{ height: `${(scrollProgress * 100)}%` }} />
          </div>
          <span className="scroll-text">SCROLL</span>
        </div>
      </div>

      <style jsx>{`
        .canyon-metrics-section {
          position: relative;
          min-height: 300vh;
          padding: 0;
        }

        .canyon-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 10;
          pointer-events: none;
          opacity: 0;
          transition: opacity 200ms ease-out;
        }

        .metrics-overlay {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20;
          pointer-events: none;
          padding: 48px;
          background: radial-gradient(circle at center, rgba(10, 20, 16, 0.4) 0%, transparent 70%);
        }

        .metrics-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .overline {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #53FEAA;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .bracket {
          color: rgba(83, 254, 170, 0.5);
        }

        .gradient-text {
          background: linear-gradient(135deg, #53FEAA, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          max-width: 1400px;
          width: 100%;
        }

        .metric-card {
          position: relative;
          display: block;
          background: rgba(10, 20, 16, 0.8);
          backdrop-filter: blur(20px);
          border-style: solid;
          border-color: rgba(83, 254, 170, 0.1);
          border-width: 2px;
          border-radius: 2px;
          padding: 48px 32px;
          text-align: center;
          opacity: 0.4;
          box-shadow: none;
          pointer-events: auto;
          transition: all 0.5s ease-out;
        }

        .metric-card * {
          transition: none !important;
          transform: none !important;
        }

        .metric-card[data-state="active"] {
          opacity: 1;
          border-color: rgba(255, 255, 255, 0.4);
          border-width: 3px;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.05);
          background: rgba(20, 25, 30, 0.95);
        }

        .metric-card[data-state="passed"] {
          opacity: 0.6;
          border-color: rgba(83, 254, 170, 0.15);
          border-width: 2px;
          box-shadow: none;
        }

        .metric-card[data-state="upcoming"] {
          opacity: 0.4;
          border-color: rgba(83, 254, 170, 0.1);
          border-width: 2px;
          box-shadow: none;
        }

        .metric-label {
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          color: rgba(255, 255, 255, 0.6) !important;
          margin-bottom: 24px !important;
          text-align: center !important;
          line-height: 1.4 !important;
        }

        .metric-value {
          font-family: var(--font-mono) !important;
          font-size: clamp(64px, 8vw, 80px) !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          color: rgba(255, 255, 255, 0.95) !important;
          margin-bottom: 16px !important;
          text-align: center !important;
        }

        .metric-unit {
          font-family: inherit !important;
          font-size: 18px !important;
          font-weight: 600 !important;
          color: rgba(255, 255, 255, 0.9) !important;
          margin-bottom: 16px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          text-align: center !important;
          line-height: 1.4 !important;
        }

        .metric-description {
          font-family: inherit !important;
          font-size: 15px !important;
          font-weight: 400 !important;
          color: rgba(255, 255, 255, 0.6) !important;
          line-height: 1.6 !important;
          text-align: center !important;
          margin: 0 !important;
        }

        .award-badge {
          margin-top: 48px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          px: 24px;
          padding: 12px 24px;
          border-radius: 999px;
          background: rgba(10, 20, 16, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(83, 254, 170, 0.3);
          color: #53FEAA;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          pointer-events: auto;
        }

        .scroll-indicator {
          position: fixed;
          right: 48px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          opacity: 0.5;
        }

        .scroll-track {
          width: 2px;
          height: 120px;
          background: rgba(83, 254, 170, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .scroll-thumb {
          width: 100%;
          background: linear-gradient(180deg, #53FEAA, #10B981);
          border-radius: 2px;
          transition: height 0.3s ease;
        }

        .scroll-text {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #53FEAA;
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .metrics-overlay {
            padding: 24px;
          }

          .metrics-header {
            margin-bottom: 32px;
          }

          .scroll-indicator {
            right: 24px;
          }
        }
      `}</style>
    </section>
  );
};
