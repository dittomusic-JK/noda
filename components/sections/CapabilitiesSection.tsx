'use client';

const CAPABILITIES = [
  {
    tag: 'MULTI-DOMAIN',
    title: 'Unified Swarm Intelligence',
    description: 'Coordinate autonomous swarms across all domains. Distributed decision-making. Real-time adaptation.',
    gif: '/gifs/coverage_animation.gif',
    link: '/use-cases/multi-domain-swarm-coordination'
  },
  {
    tag: 'CONTESTED OPS',
    title: 'Edge Autonomy',
    description: 'Operate in degraded environments. Edge intelligence. Zero cloud dependency.',
    gif: '/gifs/formation_control.gif',
    link: '/use-cases/contested-environment-operations'
  },
  {
    tag: 'EFFECTS-BASED',
    title: 'Mission Orchestration',
    description: 'Define mission effects. AI coordinates platforms. Minimal operator input.',
    gif: '/gifs/relay_uav_animation.gif',
    link: '/use-cases/mission-effects-orchestration'
  }
];

export const CapabilitiesSection = () => {
  const [firstCapability, ...restCapabilities] = CAPABILITIES;

  return (
    <section className="capabilities-section scroll-section" data-waypoint-label="CAPABILITIES">
      <div className="container">
        {/* First capability - Full width */}
        <div className="capability-box capability-full">
          <div className="box-content">
            <div className="content-text">
              <div className="content-tag">{firstCapability.tag}</div>
              <h3>{firstCapability.title}</h3>
              <p>{firstCapability.description}</p>
              <a href={firstCapability.link} className="learn-more">
                Learn More →
              </a>
            </div>
            <div className="content-visual">
              <img src={firstCapability.gif} alt={firstCapability.title} />
            </div>
          </div>
        </div>

        {/* Two half-width capabilities */}
        <div className="capability-grid">
          {restCapabilities.map((capability, index) => (
            <div key={index} className="capability-box capability-half">
              <div className="box-content">
                <div className="content-visual">
                  <img src={capability.gif} alt={capability.title} />
                </div>
                <div className="content-text">
                  <div className="content-tag">{capability.tag}</div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <a href={capability.link} className="learn-more">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .capabilities-section {
          position: relative;
          padding: 120px 0;
          background: #0A1410;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 64px;
        }

        /* Capability boxes */
        .capability-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .capability-box:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* Full width capability */
        .capability-full {
          margin-bottom: 40px;
        }

        .capability-full .box-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: start;
          min-height: 500px;
        }

        .capability-full .content-text {
          padding: 64px;
          align-self: start;
        }

        .capability-full .content-visual {
          height: 500px;
          padding: 0;
        }

        /* Two half-width capabilities */
        .capability-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .capability-half .box-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .capability-half .content-visual {
          padding: 0;
          flex-shrink: 0;
          height: 340px;
        }

        .capability-half .content-text {
          padding: 32px 48px 48px 48px;
          flex-grow: 1;
        }

        .content-visual {
          position: relative;
        }

        .content-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 0;
        }

        .content-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .content-text h3 {
          font-family: var(--font-inter);
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 16px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .capability-full .content-text h3 {
          font-size: clamp(28px, 3.5vw, 38px);
          font-weight: 700;
        }

        .content-text p {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 24px;
        }

        .capability-full .content-text p {
          font-size: 16px;
          line-height: 1.6;
        }

        .learn-more {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .learn-more:hover {
          color: rgba(255, 255, 255, 1);
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .container {
            padding: 0 48px;
          }

          .capability-row {
            gap: 48px;
            margin-bottom: 120px;
          }
        }

        @media (max-width: 768px) {
          .capabilities-section {
            padding: 80px 0;
          }

          .container {
            padding: 0 24px;
          }

          .capability-full .box-content {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .capability-full .content-text {
            padding: 40px 32px;
          }

          .capability-full .content-visual {
            padding: 0;
          }

          .capability-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .capability-half .content-visual {
            padding: 0;
          }

          .capability-half .content-text {
            padding: 24px 32px 32px 32px;
          }
        }
      `}</style>
    </section>
  );
};
