'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FloatingFormation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const shapes = shapesRef.current.filter(Boolean);
    
    const formations = {
      v_formation: [
        { x: 50, y: 20 },
        { x: 40, y: 30 },
        { x: 60, y: 30 },
        { x: 30, y: 40 },
        { x: 70, y: 40 },
        { x: 20, y: 50 },
        { x: 80, y: 50 },
      ],
      team_formation: [
        // Tight coordinated diamond pattern
        { x: 50, y: 30 },
        { x: 40, y: 45 },
        { x: 60, y: 45 },
        { x: 50, y: 60 },
        { x: 35, y: 60 },
        { x: 65, y: 60 },
        { x: 50, y: 75 },
      ],
      line_formation: [
        { x: 20, y: 50 },
        { x: 30, y: 50 },
        { x: 40, y: 50 },
        { x: 50, y: 50 },
        { x: 60, y: 50 },
        { x: 70, y: 50 },
        { x: 80, y: 50 },
      ],
      circle_formation: [
        { x: 50, y: 20 },
        { x: 70, y: 30 },
        { x: 80, y: 50 },
        { x: 70, y: 70 },
        { x: 50, y: 80 },
        { x: 30, y: 70 },
        { x: 20, y: 50 },
      ],
      scattered: [
        { x: 15, y: 25 },
        { x: 45, y: 15 },
        { x: 75, y: 30 },
        { x: 25, y: 55 },
        { x: 85, y: 60 },
        { x: 55, y: 75 },
        { x: 35, y: 85 },
      ]
    };
    
    function animateToFormation(formation: { x: number; y: number }[]) {
      shapes.forEach((shape, i) => {
        if (shape && formation[i]) {
          gsap.to(shape, {
            left: `${formation[i].x}%`,
            top: `${formation[i].y}%`,
            duration: 1.5,
            ease: 'power2.inOut',
            delay: i * 0.05
          });
        }
      });
    }
    
    // Set initial formation
    animateToFormation(formations.v_formation);
    
    // Listen for custom formation events
    const handleFormationChange = (e: CustomEvent) => {
      if (e.detail === 'team') {
        animateToFormation(formations.team_formation);
      }
    };
    
    window.addEventListener('formation-change', handleFormationChange as EventListener);
    
    // Hero section - V formation with subtle movement
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        shapes.forEach((shape, i) => {
          if (shape) {
            gsap.to(shape, {
              y: `${progress * 50 * (i % 2 === 0 ? 1 : -1)}px`,
              duration: 0.5
            });
          }
        });
      },
      onLeave: () => animateToFormation(formations.scattered)
    });
    
    // Trust section - scatter formation
    ScrollTrigger.create({
      trigger: '.trust-section',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => animateToFormation(formations.scattered),
      onLeaveBack: () => animateToFormation(formations.v_formation)
    });
    
    // Statement section - team formation
    ScrollTrigger.create({
      trigger: '.statement-section',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => animateToFormation(formations.team_formation),
      onLeaveBack: () => animateToFormation(formations.scattered)
    });
    
    // Capabilities section - line formation with movement
    ScrollTrigger.create({
      trigger: '.capabilities-section',
      start: 'top center',
      end: 'bottom center',
      scrub: 2,
      onEnter: () => animateToFormation(formations.line_formation),
      onUpdate: (self) => {
        const progress = self.progress;
        shapes.forEach((shape, i) => {
          if (shape) {
            gsap.to(shape, {
              x: `${Math.sin(progress * Math.PI + i) * 20}px`,
              duration: 0.3
            });
          }
        });
      },
      onLeaveBack: () => animateToFormation(formations.team_formation)
    });
    
    // Why NODA section - circle formation
    ScrollTrigger.create({
      trigger: '.why-noda-section',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => animateToFormation(formations.circle_formation),
      onLeaveBack: () => animateToFormation(formations.line_formation)
    });
    
    return () => {
      window.removeEventListener('formation-change', handleFormationChange as EventListener);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="floating-formation">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          ref={el => { shapesRef.current[i] = el; }}
          className="formation-shape"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path 
              d="M8 2 L14 14 L8 12 L2 14 Z" 
              fill="#6BB0FF"
              opacity="0.9"
            />
          </svg>
          <div className="shape-pulse" />
        </div>
      ))}
    </div>
  );
};
