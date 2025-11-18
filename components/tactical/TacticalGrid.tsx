'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TacticalGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepAngleRef = useRef(0);
  const scrollProgressRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Track scroll progress
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      }
    });
    
    const gridSize = 50;
    
    function drawGrid() {
      const scrollProgress = scrollProgressRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = '#0A1410';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid color shifts based on scroll
      const gridColor = `rgba(0, 255, ${229 - scrollProgress * 100}, ${0.15 + scrollProgress * 0.1})`;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      // Horizontal lines with perspective
      const horizon = canvas.height * 0.3;
      for (let i = 0; i < 30; i++) {
        const y = horizon + (i * gridSize);
        const perspective = 1 - (i / 30) * 0.7;
        const offset = Math.sin(scrollProgress * Math.PI * 2 + i * 0.2) * 20;
        
        const xStart = canvas.width * 0.5 - (canvas.width * 0.5 * perspective);
        const xEnd = canvas.width * 0.5 + (canvas.width * 0.5 * perspective);
        
        ctx.beginPath();
        ctx.moveTo(xStart, y + offset);
        ctx.lineTo(xEnd, y + offset);
        ctx.stroke();
      }
      
      // Vertical lines with perspective
      for (let i = 0; i < 24; i++) {
        const xPercent = (i - 12) / 12;
        const xStart = canvas.width * 0.5 + xPercent * canvas.width * 0.5;
        const yStart = horizon;
        const yEnd = canvas.height;
        
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xStart + xPercent * canvas.width * 0.15, yEnd);
        ctx.stroke();
      }
      
      // Radar sweep effect
      drawRadarSweep();
      
      // Hexagonal zones
      drawHexZones();
    }
    
    function drawRadarSweep() {
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.6;
      const radius = 300;
      
      sweepAngleRef.current += 0.02;
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(0, 255, 229, 0.3)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 229, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 255, 229, 0)');
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sweepAngleRef.current);
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, Math.PI / 3);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.restore();
    }
    
    function drawHexZones() {
      const zones = [
        { x: 0.3, y: 0.4, size: 60, color: 'rgba(107, 93, 84, 0.2)' },
        { x: 0.5, y: 0.6, size: 80, color: 'rgba(74, 95, 74, 0.2)' },
        { x: 0.7, y: 0.5, size: 70, color: 'rgba(42, 56, 48, 0.2)' },
      ];
      
      zones.forEach(zone => {
        const x = canvas.width * zone.x;
        const y = canvas.height * zone.y;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = x + zone.size * Math.cos(angle);
          const py = y + zone.size * Math.sin(angle);
          
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        ctx.fillStyle = zone.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 229, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
    
    function animate() {
      drawGrid();
      requestAnimationFrame(animate);
    }
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="tactical-grid-canvas"
    />
  );
};
