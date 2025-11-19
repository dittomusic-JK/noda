'use client';

export const TrustIndicatorsSection = () => {
  return (
    <section className="trust-indicators-section scroll-section" data-waypoint-label="DIFFERENTIATORS">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">Core <span className="gradient-text">Capabilities</span></h2>
        </div>
      </div>
      <div className="trust-indicators-grid">
        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="0">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
              <circle cx="24" cy="24" r="6" fill="currentColor"/>
            </svg>
          </div>
          <div className="indicator-label">Agentic AI-Powered</div>
          <div className="indicator-sublabel">Orchestration</div>
          <p className="indicator-description">
            Adaptive decision-making across air, land, sea, and subsurface systems.
          </p>
        </div>

        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="100">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 8L40 24L24 40L8 24L24 8Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M24 16L32 24L24 32L16 24L24 16Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="indicator-label">Mixed-Fleet</div>
          <div className="indicator-sublabel">Collaboration</div>
          <p className="indicator-description">
            Autonomous teaming of heterogeneous UxVs in contested, dynamic environments.
          </p>
        </div>

        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="200">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="12" r="4" fill="currentColor"/>
              <circle cx="12" cy="24" r="4" fill="currentColor"/>
              <circle cx="36" cy="24" r="4" fill="currentColor"/>
              <circle cx="24" cy="36" r="4" fill="currentColor"/>
              <line x1="24" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="2"/>
              <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="indicator-label">Zero-Friction</div>
          <div className="indicator-sublabel">Integration</div>
          <p className="indicator-description">
            No software or hardware modifications required on OEM platforms.
          </p>
        </div>

        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="300">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L42 16V32L24 44L6 32V16L24 4Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="24" cy="24" r="8" fill="currentColor"/>
            </svg>
          </div>
          <div className="indicator-label">Vendor-Agnostic</div>
          <div className="indicator-sublabel">Architecture</div>
          <p className="indicator-description">
            Open orchestrator works with any platform. Best-in-class behaviors across all nodes.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #53FEAA, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};
