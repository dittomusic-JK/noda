'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  type?: 'fade-up' | 'gambit-reveal' | 'slide-left' | 'slide-right' | 'parallax';
  delay?: number;
  className?: string;
}

/**
 * ScrollReveal Component
 * 
 * Wraps content with GSAP scroll-triggered animations
 * Inspired by Gambit's dramatic reveal patterns
 * 
 * Usage:
 * <ScrollReveal type="gambit-reveal" delay={200}>
 *   <YourContent />
 * </ScrollReveal>
 */
export const ScrollReveal = ({ 
  children, 
  type = 'fade-up', 
  delay = 0,
  className = ''
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animation: gsap.core.Tween | gsap.core.Timeline;

    switch (type) {
      case 'gambit-reveal':
        // Dramatic scale and fade - like Gambit's image reveals
        animation = gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
            scrub: 0.5,
          },
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          delay: delay / 1000,
          ease: 'power4.out',
        });
        break;

      case 'slide-left':
        animation = gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: -100,
          opacity: 0,
          duration: 1,
          delay: delay / 1000,
          ease: 'power3.out',
        });
        break;

      case 'slide-right':
        animation = gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: 100,
          opacity: 0,
          duration: 1,
          delay: delay / 1000,
          ease: 'power3.out',
        });
        break;

      case 'parallax':
        animation = gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: -100,
          ease: 'none',
        });
        break;

      case 'fade-up':
      default:
        animation = gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: delay / 1000,
          ease: 'power3.out',
        });
        break;
    }

    return () => {
      animation?.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [type, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
