'use client';

import { useEffect } from 'react';
import { TacticalCursor } from '@/components/tactical/TacticalCursor';
import { TacticalGrid } from '@/components/tactical/TacticalGrid';
import { FloatingFormation } from '@/components/tactical/FloatingFormation';
import { SectionTransitions } from '@/components/tactical/SectionTransitions';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustIndicatorsSection } from '@/components/sections/TrustIndicatorsSection';
import { MetricsSection } from '@/components/sections/MetricsSection';
import { StatementSection } from '@/components/sections/StatementSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { WhyNodaSection } from '@/components/sections/WhyNodaSection';
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
      <FloatingFormation />
      <SectionTransitions />
      
      {/* Main content */}
      <main className="site-main minimalist scroll-snap-container">
        <HeroSection />
        
        <TrustIndicatorsSection />
        
        <div className="spacer" style={{ height: '20vh' }} />
        
        <MetricsSection />
        
        <div className="spacer" style={{ height: '30vh' }} />
        
        <StatementSection />
        
        <div className="spacer" style={{ height: '40vh' }} />
        
        <CapabilitiesSection />
        
        <div className="spacer" style={{ height: '50vh' }} />
        
        <WhyNodaSection />
        
        <div className="spacer" style={{ height: '50vh' }} />
        
        {/* Final CTA section */}
        <section className="final-cta-section">
          <div className="final-cta-wrapper">
            <div className="cta-tag">[MISSION READY]</div>
            <h2>Deploy intelligent orchestration</h2>
            <p>See how NODA enables coordinated autonomous operations for defense missions.</p>
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
