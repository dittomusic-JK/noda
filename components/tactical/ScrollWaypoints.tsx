'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollWaypoints = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray('.scroll-section') as HTMLElement[];
    const waypoints: HTMLElement[] = [];
    
    sections.forEach((section, i) => {
      const waypoint = document.createElement('div');
      waypoint.className = 'waypoint-marker';
      waypoint.innerHTML = `
        <div class="waypoint-inner">
          <div class="waypoint-diamond"></div>
          <div class="waypoint-label">${section.dataset.waypointLabel || `WP-${i + 1}`}</div>
        </div>
      `;
      document.body.appendChild(waypoint);
      waypoints.push(waypoint);
      
      gsap.set(waypoint, {
        position: 'fixed',
        right: '40px',
        top: '50%',
        opacity: 0,
        scale: 0.8
      });
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(waypoint, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          });
        },
        onLeave: () => {
          gsap.to(waypoint, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3
          });
        },
        onEnterBack: () => {
          gsap.to(waypoint, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(2)'
          });
        },
        onLeaveBack: () => {
          gsap.to(waypoint, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3
          });
        }
      });
    });
    
    return () => {
      waypoints.forEach(wp => wp.remove());
    };
  }, []);
  
  return null;
};
