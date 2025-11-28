'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroTransition = () => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    // Fade out hero as you scroll past it
    gsap.to('.hero-section-immersive', {
      scrollTrigger: {
        trigger: '.hero-section-immersive',
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0.3,
      ease: 'power2.inOut',
    });
  }, []);

  return null;
};
