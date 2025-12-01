'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  {
    value: '4',
    unit: 'months',
    description: 'Pre-seed to first deal',
  },
  {
    value: '<30',
    unit: 'minutes',
    description: 'Average time to integrate',
  },
  {
    value: '20+',
    unit: 'platforms',
    description: 'UxV integrations',
  },
  {
    value: '6',
    unit: 'contracts',
    description: 'OEM manufacturers',
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    // Animate stats on scroll
    gsap.fromTo(
      '.stat-card',
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <span className="stats-label">[BY THE NUMBERS]</span>
          <h2 className="stats-title">Proven Velocity</h2>
        </div>
        
        <div className="stats-grid">
          {STATS.map((stat, index) => (
            <div key={index} className={`stat-card ${isVisible ? 'visible' : ''}`}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-unit">{stat.unit}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
