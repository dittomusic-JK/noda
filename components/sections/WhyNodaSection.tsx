'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const WhyNodaSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    // Trigger heading animation on scroll
    ScrollTrigger.create({
      trigger: '.why-noda-section',
      start: 'top 80%',
      onEnter: () => setAnimationTriggered(true),
    });
    
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
      label: 'Patriots Building',
      sublabel: 'For Patriots',
      description: 'Veterans from NASA, MIT, and DARPA. American-made defense technology.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 5L35 15V25L20 35L5 25V15L20 5Z" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="6" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Platform Agnostic',
      sublabel: 'Open Architecture',
      description: 'Zero vendor lock-in. Collaborate with any system.',
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
      sublabel: 'Not Platform Management',
      description: 'Define outcomes. AI orchestrates execution.',
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
      label: 'Defense First',
      sublabel: 'National Security',
      description: 'Deep commitment to national defense. Mission critical.',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 5L7 12V20C7 28 13 34 20 37C27 34 33 28 33 20V12L20 5Z" stroke="currentColor" strokeWidth="2" />
          <path d="M20 12L14 16V22L20 26L26 22V16L20 12Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  // Heading words for hero-style animation
  const headingWords = ['WHY', 'NODA AI'];
  
  return (
    <section className="why-noda-section scroll-section" data-waypoint-label="WHY NODA">
      <div className="why-noda-container">
        <h1 ref={headingRef} className={`why-noda-heading hero-reveal ${animationTriggered ? 'animate' : ''}`}>
          {headingWords.map((word, wordIndex) => {
            const charDelay = wordIndex === 0 ? 0 : 'WHY'.length * 50 + 100; // Gap between words
            return (
              <span key={wordIndex} className="word">
                {word.split('').map((char, charIndex) => (
                  <span 
                    key={charIndex} 
                    className="char"
                    style={{
                      animationDelay: animationTriggered ? `${charDelay + charIndex * 50}ms` : '0ms',
                      display: char === ' ' ? 'inline' : 'inline-block',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            );
          })}
        </h1>

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
