'use client';

export const MetricsSection = () => {
  return (
    <section className="metrics-section scroll-section" data-waypoint-label="METRICS">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="overline mb-4">
            <span className="bracket">[</span>
            BY THE NUMBERS
            <span className="bracket">]</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Proven at <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From pre-seed to production in record time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Velocity */}
          <div className="metric-card" data-aos="fade-up" data-aos-delay="0">
            <div className="metric-label">Velocity</div>
            <div className="metric-value">~4</div>
            <div className="metric-unit">Months</div>
            <div className="metric-description">
              Pre-Seed to 1st Deal
            </div>
          </div>

          {/* B2B Adoption */}
          <div className="metric-card" data-aos="fade-up" data-aos-delay="100">
            <div className="metric-label">B2B Adoption</div>
            <div className="metric-value">6</div>
            <div className="metric-unit">OEM Manufacturers</div>
            <div className="metric-description">
              Platform Contracts
            </div>
          </div>

          {/* Ecosystem */}
          <div className="metric-card" data-aos="fade-up" data-aos-delay="200">
            <div className="metric-label">Ecosystem</div>
            <div className="metric-value">~20</div>
            <div className="metric-unit">Partner Integrations</div>
            <div className="metric-description">
              Subsurface to Stratosphere
            </div>
          </div>

          {/* Integration Speed */}
          <div className="metric-card" data-aos="fade-up" data-aos-delay="300">
            <div className="metric-label">Integration</div>
            <div className="metric-value">&lt;30</div>
            <div className="metric-unit">Minutes</div>
            <div className="metric-description">
              Average Time to Integrate New UxV
            </div>
          </div>
        </div>

        {/* Award Badge */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-cyan-bright/30">
            <svg className="w-6 h-6 text-cyan-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium uppercase tracking-wider">
              CDAO Phase 1 SBIR Winner
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .metrics-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(
            180deg,
            #1A2820 0%,
            #1E3028 50%,
            #1A2820 100%
          );
        }

        .metric-card {
          background: linear-gradient(135deg, rgba(30, 48, 40, 0.6), rgba(20, 35, 28, 0.6));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(83, 254, 170, 0.3);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          border-color: rgba(83, 254, 170, 0.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(83, 254, 170, 0.1);
        }

        .metric-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 16px;
        }

        .metric-value {
          font-size: 56px;
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #53FEAA, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .metric-unit {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 12px;
        }

        .metric-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.4;
        }

        .gradient-text {
          background: linear-gradient(135deg, #53FEAA, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .overline {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: rgba(83, 254, 170, 0.9);
        }

        .bracket {
          color: rgba(83, 254, 170, 0.5);
        }
      `}</style>
    </section>
  );
};
