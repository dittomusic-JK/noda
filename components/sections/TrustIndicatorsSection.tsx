'use client';

export const TrustIndicatorsSection = () => {
  return (
    <section className="trust-indicators-section scroll-section" data-waypoint-label="DIFFERENTIATORS">
      <div className="trust-indicators-grid">
        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="0">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
              <circle cx="24" cy="24" r="6" fill="currentColor"/>
            </svg>
          </div>
          <div className="indicator-label">Open</div>
          <div className="indicator-sublabel">Orchestrator</div>
          <p className="indicator-description">
            Platform-agnostic, collaborative, and open architecture. No vendor lock-in.
          </p>
        </div>

        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="100">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 8L40 24L24 40L8 24L24 8Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M24 16L32 24L24 32L16 24L24 16Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="indicator-label">Agnostic</div>
          <div className="indicator-sublabel">Platform</div>
          <p className="indicator-description">
            Works with any hardware or software. Integrate with existing systems seamlessly.
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
          <div className="indicator-label">Collaborative</div>
          <div className="indicator-sublabel">Effects</div>
          <p className="indicator-description">
            Enable operators to manage desired mission effects across distributed autonomous systems.
          </p>
        </div>

        <div className="trust-indicator-card" data-aos="fade-up" data-aos-delay="300">
          <div className="indicator-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L42 16V32L24 44L6 32V16L24 4Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="24" cy="24" r="8" fill="currentColor"/>
            </svg>
          </div>
          <div className="indicator-label">Defense</div>
          <div className="indicator-sublabel">Focused</div>
          <p className="indicator-description">
            Built specifically for defense missions. Deep commitment to national security.
          </p>
        </div>
      </div>
    </section>
  );
};
