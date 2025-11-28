'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ColorTransition = () => {
  const transitionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    // Animate the light section sliding up
    gsap.to(transitionRef.current, {
      scrollTrigger: {
        trigger: transitionRef.current,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          // Update the ::after pseudo-element transform
          const progress = self.progress;
          const translateY = 100 - (progress * 100);
          if (transitionRef.current) {
            transitionRef.current.style.setProperty('--slide-progress', `${translateY}%`);
          }
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === transitionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={transitionRef} 
      aria-hidden 
      className="color-transition-zone"
      style={{ '--slide-progress': '100%' } as React.CSSProperties}
    />
  );
};
