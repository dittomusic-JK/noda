'use client';

export const HeroSection = () => {
  return (
    <section className="hero-section scroll-section" data-waypoint-label="COMMAND">
      <div className="hero-content-wrapper">
        {/* Overline */}
        <div className="overline" data-aos="fade-up">
          <span className="bracket">[</span>
          CROSS-PLATFORM ALGORITHMIC WARFARE
          <span className="bracket">]</span>
        </div>
        
        {/* Main headline */}
        <h1 className="hero-headline" data-aos="fade-up" data-aos-delay="100">
          Building the Best<br/>
          <span className="gradient-text">Chess Player</span><br/>
          Not the Chess Pieces
        </h1>
        
        {/* Subheadline */}
        <p className="hero-subhead" data-aos="fade-up" data-aos-delay="200">
          Vendor-agnostic orchestration software that enables unmanned systems<br/>
          to act collaboratively and autonomously. Zero-friction integration.<br/>
          <strong>No software or hardware modifications required.</strong>
        </p>
        
        
        {/* CTAs */}
        <div className="hero-ctas" data-aos="fade-up" data-aos-delay="300">
          <a href="/demo" className="btn-primary">
            <span>BOOK A DEMO</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/solutions" className="btn-secondary">
            <span>OUR PLATFORM</span>
          </a>
        </div>
        
        {/* Partner Logos */}
        <div className="partner-logos-container" data-aos="fade-up" data-aos-delay="500">
          <p className="partner-logos-label">Built by veterans, scientists, and AI practitioners from:</p>
          <div className="partner-logos-strip">
            <img src="/nasa-logo.svg" alt="NASA" className="partner-logo partner-logo-nasa" />
            <img src="/MIT_logo.svg" alt="MIT" className="partner-logo" />
            <img src="/DARPA_logo.png" alt="DARPA" className="partner-logo" />
            <img src="/georgia_tech.webp" alt="Georgia Tech" className="partner-logo" />
          </div>
        </div>
      </div>
    </section>
  );
};
