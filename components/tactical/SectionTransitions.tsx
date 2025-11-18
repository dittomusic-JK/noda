'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SectionTransitions = () => {
  useEffect(() => {
    const transitionContainer = document.createElement('div');
    transitionContainer.className = 'transition-shapes';
    document.body.appendChild(transitionContainer);
    
    const shapes: HTMLElement[] = [];
    for (let i = 0; i < 20; i++) {
      const shape = document.createElement('div');
      shape.className = `transition-shape shape-${i % 3}`;
      
      const shapeType = i % 3;
      const svgMap: { [key: number]: string } = {
        0: `<svg viewBox="0 0 20 20"><path d="M10 2 L18 18 L10 15 L2 18 Z" fill="currentColor"/></svg>`,
        1: `<svg viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" fill="currentColor"/></svg>`,
        2: `<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg>`
      };
      shape.innerHTML = svgMap[shapeType];
      
      transitionContainer.appendChild(shape);
      shapes.push(shape);
      
      gsap.set(shape, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0,
        opacity: 0,
        rotation: Math.random() * 360
      });
    }
    
    const sections = gsap.utils.toArray('.scroll-section') as HTMLElement[];
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        onEnter: () => {
          gsap.fromTo(shapes,
            {
              scale: 0,
              opacity: 0,
              x: () => Math.random() * window.innerWidth,
              y: () => Math.random() * window.innerHeight,
              rotation: () => Math.random() * 360 - 180
            },
            {
              scale: () => Math.random() * 1 + 0.5,
              opacity: () => Math.random() * 0.4 + 0.3,
              rotation: () => Math.random() * 360 - 180,
              duration: 1,
              stagger: 0.02,
              ease: 'power2.out',
              onComplete: function() {
                gsap.to(shapes, {
                  opacity: 0,
                  duration: 0.5,
                  delay: 0.5
                });
              }
            }
          );
        }
      });
    });
    
    return () => {
      transitionContainer.remove();
    };
  }, []);
  
  return null;
};
