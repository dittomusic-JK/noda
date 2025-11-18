'use client';

export const CapabilitiesSection = () => {
  return (
    <section className="capabilities-section scroll-section" data-waypoint-label="CAPABILITIES">
      <div className="section-intro">
        {/* Header removed to avoid duplication with waypoint label */}
      </div>
      
      {/* Evervault-style staggered card layout */}
      <div className="capabilities-staggered-grid">
        <div className="capability-card-large stagger-left" data-aos="fade-up">
          <div className="card-visual">
            <img src="/gifs/coverage_animation.gif" alt="Multi-domain swarm coordination" />
            <div className="tactical-overlay"></div>
          </div>
          <div className="card-content">
            <div className="card-tag">[SWARM INTELLIGENCE]</div>
            <h3>Multi-Domain Coordination</h3>
            <p>
              Coordinate autonomous swarms across air, land, sea, space, and cyber domains with distributed decision-making.
            </p>
            <a href="/use-cases/multi-domain-swarm-coordination" className="card-link">
              Learn More →
            </a>
          </div>
        </div>
        
        <div className="capability-card-large stagger-right" data-aos="fade-up" data-aos-delay="100">
          <div className="card-visual">
            <img src="/gifs/formation_control.gif" alt="Contested environment operations" />
            <div className="tactical-overlay"></div>
          </div>
          <div className="card-content">
            <div className="card-tag">[EDGE COMPUTING]</div>
            <h3>Contested Environment Ops</h3>
            <p>
              Maintain autonomous operations in degraded environments with edge-based intelligence and resilient communications.
            </p>
            <a href="/use-cases/contested-environment-operations" className="card-link">
              Learn More →
            </a>
          </div>
        </div>
        
        <div className="capability-card-large stagger-left" data-aos="fade-up" data-aos-delay="200">
          <div className="card-visual">
            <img src="/gifs/relay_uav_animation.gif" alt="Mission effects orchestration" />
            <div className="tactical-overlay"></div>
          </div>
          <div className="card-content">
            <div className="card-tag">[EFFECTS-BASED]</div>
            <h3>Mission Effects Orchestration</h3>
            <p>
              Define desired mission effects and let the orchestrator coordinate distributed platforms to achieve objectives.
            </p>
            <a href="/use-cases/mission-effects-orchestration" className="card-link">
              Learn More →
            </a>
          </div>
        </div>
        
        <div className="capability-card-large stagger-right" data-aos="fade-up" data-aos-delay="300">
          <div className="card-visual">
            <img src="/gifs/coverage_animation.gif" alt="Algorithmic warfare" />
            <div className="tactical-overlay"></div>
          </div>
          <div className="card-content">
            <div className="card-tag">[ALGORITHM REPOSITORY]</div>
            <h3>Algorithmic Warfare</h3>
            <p>
              Deploy proven defense algorithms from the world&apos;s deepest repository for autonomous coordination and tactical AI.
            </p>
            <a href="/use-cases/algorithmic-warfare" className="card-link">
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
