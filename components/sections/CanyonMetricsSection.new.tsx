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
  const [scrollProgress, setScrollProgress] = useState(0);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
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
    
    const segments = 50;
    const spacing = 4;
    const widthVariation = 12;
    const baseWidth = 15;
    
    for (let i = 0; i < segments; i++) {
      const z = i * spacing;
      const progress = i / segments;
      
      const leftOffset = 
        Math.sin(progress * Math.PI * 3) * widthVariation + 
        Math.sin(progress * Math.PI * 7) * 4 + 
        baseWidth;
      const rightOffset = 
        Math.cos(progress * Math.PI * 2.5) * widthVariation + 
        Math.sin(progress * Math.PI * 5) * 5 - 
        baseWidth;
      
      const leftHeight = 8 + 
        Math.sin(progress * Math.PI * 6) * 6 + 
        Math.cos(progress * Math.PI * 12) * 3;
      const rightHeight = 10 + 
        Math.cos(progress * Math.PI * 5) * 7 + 
        Math.sin(progress * Math.PI * 10) * 2;
      
      const leftGeometry = new THREE.PlaneGeometry(0.3, leftHeight, 1, 16);
      const leftMaterial = new THREE.MeshBasicMaterial({
        color: 0x53FEAA,
        wireframe: true,
        transparent: true,
        opacity: 0.35 - (progress * 0.25)
      });
      const leftWall = new THREE.Mesh(leftGeometry, leftMaterial);
      leftWall.position.set(-leftOffset, leftHeight / 2, -z);
      leftWall.rotation.y = Math.PI / 2 + Math.sin(progress * Math.PI * 8) * 0.15;
      canyon.add(leftWall);
      
      const rightGeometry = new THREE.PlaneGeometry(0.3, rightHeight, 1, 16);
      const rightMaterial = new THREE.MeshBasicMaterial({
        color: 0x53FEAA,
        wireframe: true,
        transparent: true,
        opacity: 0.35 - (progress * 0.25)
      });
      const rightWall = new THREE.Mesh(rightGeometry, rightMaterial);
      rightWall.position.set(-rightOffset, rightHeight / 2, -z);
      rightWall.rotation.y = -Math.PI / 2 + Math.cos(progress * Math.PI * 8) * 0.15;
      canyon.add(rightWall);
      
      if (i % 2 === 0) {
        const ridgeGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-leftOffset, leftHeight, -z),
          new THREE.Vector3(-rightOffset, rightHeight, -z)
        ]);
        const ridgeMaterial = new THREE.LineBasicMaterial({
          color: 0x53FEAA,
          transparent: true,
          opacity: 0.25 - (progress * 0.2)
        });
        const ridge = new THREE.Line(ridgeGeometry, ridgeMaterial);
        canyon.add(ridge);
      }
      
      for (let h = 2; h < Math.min(leftHeight, rightHeight); h += 3) {
        const contourGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-leftOffset, h, -z),
          new THREE.Vector3(-rightOffset, h, -z)
        ]);
        const contourMaterial = new THREE.LineBasicMaterial({
          color: 0x10B981,
          transparent: true,
          opacity: 0.12 - (progress * 0.08)
        });
        const contour = new THREE.Line(contourGeometry, contourMaterial);
        canyon.add(contour);
      }
      
      const floorY = -2 + Math.sin(progress * Math.PI * 4) * 1.5;
      if (i % 2 === 0) {
        const floorGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-leftOffset, floorY, -z),
          new THREE.Vector3(-rightOffset, floorY, -z)
        ]);
        const floorMaterial = new THREE.LineBasicMaterial({
          color: 0x10B981,
          transparent: true,
          opacity: 0.2 - (progress * 0.15)
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
      color: 0x53FEAA,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer };

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

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

  // Animate based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || !sceneRef.current) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1)
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - windowHeight)));
      
      setScrollProgress(progress);
      
      // Update camera
      const metricProgress = progress * (METRICS.length - 1);
      const { camera } = sceneRef.current;
      camera.position.z = -metricProgress * 30;
      camera.position.y = 1 + Math.sin(metricProgress * 0.5) * 1.5;
      camera.rotation.x = -0.08 + Math.sin(metricProgress * 0.3) * 0.06;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="canyon-section">
      <canvas ref={canvasRef} className="canyon-canvas" />
      
      {/* Header */}
      <div className="canyon-header">
        <div className="overline-text">
          <span className="bracket-char">[</span>
          BY THE NUMBERS
          <span className="bracket-char">]</span>
        </div>
        <h2 className="header-title">
          Proven at <span className="gradient-text">Scale</span>
        </h2>
        <p className="header-subtitle">
          From pre-seed to production in record time
        </p>
      </div>

      {/* Individual metric screens */}
      {METRICS.map((metric, index) => (
        <div key={index} className="metric-screen">
          <div className="metric-content">
            <div className="metric-label-text">{metric.label}</div>
            <div className="metric-value-text">{metric.value}</div>
            <div className="metric-unit-text">{metric.unit}</div>
            <div className="metric-desc-text">{metric.description}</div>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="canyon-footer">
        <div className="award-badge-text">
          <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>CDAO Phase 1 SBIR Winner</span>
        </div>
      </div>

      <style jsx>{`
        .canyon-section {
          position: relative;
          background: #0A1410;
        }

        .canyon-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
          pointer-events: none;
        }

        .canyon-header {
          position: relative;
          z-index: 10;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px;
        }

        .overline-text {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #53FEAA;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .bracket-char {
          color: rgba(83, 254, 170, 0.5);
        }

        .header-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 700;
          margin-bottom: 24px;
          color: white;
        }

        .gradient-text {
          background: linear-gradient(135deg, #53FEAA, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: clamp(18px, 2vw, 24px);
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
        }

        .metric-screen {
          position: relative;
          z-index: 10;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }

        .metric-content {
          text-align: center;
          max-width: 800px;
        }

        .metric-label-text {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #53FEAA;
          margin-bottom: 32px;
        }

        .metric-value-text {
          font-family: var(--font-mono);
          font-size: clamp(80px, 15vw, 160px);
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #53FEAA, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
        }

        .metric-unit-text {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 24px;
        }

        .metric-desc-text {
          font-size: clamp(16px, 2vw, 20px);
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .canyon-footer {
          position: relative;
          z-index: 10;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .award-badge-text {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 999px;
          background: rgba(10, 20, 16, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(83, 254, 170, 0.3);
          color: #53FEAA;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .badge-icon {
          width: 24px;
          height: 24px;
        }

        @media (max-width: 768px) {
          .canyon-header,
          .metric-screen,
          .canyon-footer {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};
