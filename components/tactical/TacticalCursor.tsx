'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export const TacticalCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Smooth cursor follow
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
      
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
      
      // Arrow follows with delay
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Detect hoverable elements
    const updateHoverables = () => {
      const interactiveElements = document.querySelectorAll('a, button, .interactive');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    updateHoverables();
    
    // Re-check for new hoverable elements periodically
    const interval = setInterval(updateHoverables, 1000);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Center dot */}
      <div 
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
        style={{
          left: 0,
          top: 0,
        }}
      />
      
      {/* Tactical ring cursor */}
      <div 
        ref={cursorRef}
        className={`tactical-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: 0,
          top: 0,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="cursor-ring">
          {/* Crosshair lines */}
          <line x1="20" y1="0" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="28" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Corner brackets */}
          <path d="M8,8 L8,14 M8,8 L14,8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M32,8 L32,14 M32,8 L26,8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M8,32 L8,26 M8,32 L14,32" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M32,32 L32,26 M32,32 L26,32" stroke="currentColor" strokeWidth="1.5" fill="none" />
          
          {/* Center circle */}
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      
      {/* UAV Arrow */}
      <div 
        ref={arrowRef}
        className="cursor-arrow"
        style={{
          left: 0,
          top: 0,
        }}
      >
        <svg width="24" height="32" viewBox="0 0 24 32" className="arrow-svg">
          <path 
            d="M12 2 L22 22 L12 18 L2 22 Z" 
            fill="currentColor"
            opacity="0.8"
          />
          <line 
            x1="12" 
            y1="18" 
            x2="12" 
            y2="32" 
            stroke="currentColor" 
            strokeWidth="2"
            opacity="0.5"
          />
        </svg>
      </div>
    </>
  );
};
