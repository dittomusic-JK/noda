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
import { StatsSection } from '@/components/sections/StatsSection';
import { initScrollAnimations } from '@/lib/animations';

export default function TacticalHomePage() {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="tactical-page">
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
        
        {/* By The Numbers - Stats */}
        <StatsSection />
        
        {/* Dark-to-light transition zone */}
        <ColorTransition />
        
        <WhyNodaSection />
        
        {/* Final CTA section */}
        <section className="final-cta-section">
          <div className="final-cta-wrapper">
            <div className="cta-tag">[DEPLOY THE ORCHESTRATOR]</div>
            <h2>See It In Action</h2>
            <p>Vendor-agnostic orchestration for unmanned systems. Integrates in under 30 minutes.</p>
            <div className="cta-buttons">
              <a href="/demo" className="btn btn-primary">Book Demo</a>
              <a href="/contact" className="btn btn-secondary">Contact Us</a>
            </div>
          </div>
        </section>
        
        <div className="spacer" style={{ height: '20vh' }} />
      </main>
    </div>
  );
}
