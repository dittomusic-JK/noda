'use client';

import { useEffect, useState, useRef } from 'react';

export const HeroSection = () => {
  const [systemsCount, setSystemsCount] = useState(34);
  const [missionTime, setMissionTime] = useState('00:00:47');
  const heroRef = useRef<HTMLElement>(null);

  // Dynamic counter - like Gambit's AGL counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemsCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return Math.max(28, Math.min(52, newVal));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Mission timer
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setMissionTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="hero-section-immersive scroll-section" data-waypoint-label="COMMAND">
      {/* Full-screen background drone video */}
      <div className="hero-visual-layer">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-background-visual"
        >
          <source src="/drone Linked Comp 01.mp4" type="video/mp4" />
        </video>
        <div className="hero-visual-overlay" />
      </div>

      {/* Tactical HUD Elements - Top Right */}
      <div className="tactical-hud">
        <div className="hud-item">
          <span className="hud-label">SYSTEMS COORDINATED</span>
          <span className="hud-value">{systemsCount}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">MISSION TIME</span>
          <span className="hud-value">{missionTime}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">STATUS</span>
          <span className="hud-value hud-active">OPERATIONAL</span>
        </div>
      </div>

      {/* Main content - Left aligned */}
      <div className="hero-content-immersive">
        <h1 className="hero-headline-massive hero-reveal">
          {['BUILDING THE', 'MASTER', 'ORCHESTRATOR'].map((word, wordIndex) => {
            // Calculate delay based on previous words
            let charDelay = 0;
            if (wordIndex === 1) charDelay = 'BUILDING THE'.length * 50;
            if (wordIndex === 2) charDelay = ('BUILDING THE'.length + 'MASTER'.length) * 50;
            
            return (
              <span key={wordIndex} className="word">
                {word.split('').map((char, charIndex) => (
                  <span 
                    key={charIndex} 
                    className="char"
                    style={{
                      animationDelay: `${charDelay + charIndex * 50}ms`,
                      display: char === ' ' ? 'inline' : 'inline-block'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            );
          })}
        </h1>
        
        <p className="hero-subtitle-minimal">
          The world builds better drones—the chess pieces.<br />
          We&apos;re building the best Chess Player.
        </p>

        <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
          <a href="/demo" className="btn-hero-primary">
            BOOK DEMO
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 3L15 10L7 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
            </svg>
          </a>
        </div>

        {/* Credentials with logos */}
        <div className="hero-credentials" data-aos="fade-up" data-aos-delay="400">
          <span className="credential-label">PATRIOTS BUILDING FOR PATRIOTS</span>
          <div className="credential-logos">
            <img src="/nasa-logo.svg" alt="NASA" className="credential-logo" />
            <img src="/MIT_logo.svg" alt="MIT" className="credential-logo" />
            <img src="/DARPA_logo.png" alt="DARPA" className="credential-logo" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="600">
        <span className="scroll-text">EXPLORE</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="scroll-arrow">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
        </svg>
      </div>
    </section>
  );
};
