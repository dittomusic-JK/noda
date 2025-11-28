'use client';

import { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollProgress(triggerSelector: string) {
  const [progress, setProgress] = useState(0);

  const handleUpdate = useCallback((self: ScrollTrigger) => {
    setProgress(self.progress);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trigger = ScrollTrigger.create({
      trigger: triggerSelector,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: handleUpdate,
    });

    return () => {
      trigger.kill();
    };
  }, [triggerSelector, handleUpdate]);

  return progress;
}
