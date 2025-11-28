'use client';

import { useEffect } from 'react';
import { TacticalCursor } from '@/components/tactical/TacticalCursor';
import { TacticalGrid } from '@/components/tactical/TacticalGrid';
import { SectionTransitions } from '@/components/tactical/SectionTransitions';
import { HeroSection } from '@/components/sections/HeroSection';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ColorTransition } from '@/components/sections/ColorTransition';
import { WhyNodaSection } from '@/components/sections/WhyNodaSection';
import { DroneJourneySection } from '@/components/sections/DroneJourneySection';
import { initScrollAnimations } from '@/lib/animations';

export default function TacticalHomePage() {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <>
      {/* Tactical overlays */}
      <TacticalCursor />
      <TacticalGrid />
      <SectionTransitions />
      
      {/* Main content */}
      <main className="site-main minimalist scroll-snap-container">
        <HeroSection />
        
        <HeroTransition />
        
        {/* 3D Drone Journey - capabilities with scroll-driven animation */}
        <DroneJourneySection />
        
        {/* Dark-to-light transition zone */}
        <ColorTransition />
        
        <WhyNodaSection />
        
        {/* Final CTA section */}
        <section className="final-cta-section">
          <div className="final-cta-wrapper">
            <div className="cta-tag">[MISSION READY]</div>
            <h2>Deploy Now</h2>
            <p>Coordinated autonomous operations for defense missions.</p>
            <div className="cta-buttons">
              <a href="/demo" className="btn btn-primary">Request Demo</a>
              <a href="/use-cases" className="btn btn-secondary">View Use Cases</a>
            </div>
          </div>
        </section>
        
        <div className="spacer" style={{ height: '30vh' }} />
      </main>
    </>
  );
}
