'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const WhyNodaSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    // Staggered float-in animation
    gsap.fromTo(
      cards,
      {
        y: 100,
        opacity: 0,
        rotateX: 15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-noda-section',
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Continuous subtle float
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: '+=10',
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  const values = [
    {
      label: 'Built by Veterans',
      sublabel: 'Scientists, and AI Practitioners',
      description: 'From NASA, MIT, DARPA, and GTRI. Patriots focused on defense innovation.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 5L35 15V25L20 35L5 25V15L20 5Z" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="6" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Agnostic & Open',
      sublabel: 'Platform-agnostic',
      description: 'Collaborative and open architecture. No vendor lock-in.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="5" width="30" height="30" stroke="currentColor" strokeWidth="2" />
          <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="2" />
          <rect x="15" y="15" width="10" height="10" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Mission Effects',
      sublabel: 'Effects-based approach',
      description: 'Focus on desired mission effects, not individual system management.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="5" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="28" x2="20" y2="35" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: 'Country First',
      sublabel: 'Defense commitment',
      description: 'Deep and genuine commitment to national defense. Patriots building for patriots.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 5L7 12V20C7 28 13 34 20 37C27 34 33 28 33 20V12L20 5Z" stroke="currentColor" strokeWidth="2" />
          <path d="M20 12L14 16V22L20 26L26 22V16L20 12Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section className="why-noda-section scroll-section" data-waypoint-label="WHY NODA">
      <div className="why-noda-container">
        <div className="section-header-minimal">
          <h2>Why NODA AI</h2>
        </div>

        <div className="floating-cards-grid">
          {values.map((value, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="floating-card"
            >
              <div className="floating-card-glow" />
              <div className="floating-card-content">
                <div className="floating-card-icon">{value.icon}</div>
                <h3 className="floating-card-label">{value.label}</h3>
                <p className="floating-card-sublabel">{value.sublabel}</p>
                <p className="floating-card-description">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
