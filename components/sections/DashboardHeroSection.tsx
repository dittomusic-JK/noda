'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export const DashboardHeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      // Starts when section enters viewport, completes when centered
      const scrollProgress = Math.max(0, Math.min(1, 
        1 - (rect.top / windowHeight)
      ));
      
      // Scale from 0.6 to 1 as user scrolls
      const scale = 0.6 + (scrollProgress * 0.4);
      
      // Opacity from 0 to 1
      const opacity = scrollProgress;
      
      image.style.transform = `scale(${scale})`;
      image.style.opacity = `${opacity}`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="dashboard-hero-section scroll-section" 
      data-waypoint-label="PLATFORM"
    >
      <div className="dashboard-hero-container">
        <div 
          ref={imageRef}
          className="dashboard-image-wrapper"
        >
          <Image
            src="/dashboard.webp"
            alt="NODA AI Command & Control Platform"
            width={1920}
            height={1080}
            priority
            className="dashboard-image"
          />
          
          {/* Overlay gradient for better text contrast */}
          <div className="dashboard-overlay" />
          
          {/* Caption Box */}
          <div className="dashboard-caption">
            <div className="caption-box">
              <div className="caption-tag">URZA PLATFORM</div>
              <h3>BATTLE-TESTED COMMAND & CONTROL</h3>
              <p>Single-operator, mixed-fleet orchestration<br/>Full multi-domain visibility</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
          background: #0A1410;
        }

        .dashboard-hero-container {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
        }

        .dashboard-image-wrapper {
          position: relative;
          width: 90%;
          max-width: 1600px;
          aspect-ratio: 16/9;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 
            0 0 0 1px rgba(83, 254, 170, 0.2),
            0 20px 80px rgba(0, 0, 0, 0.8),
            0 0 60px rgba(83, 254, 170, 0.2);
          transform: scale(0.6);
          opacity: 0;
          transition: transform 0.1s ease-out, opacity 0.1s ease-out;
        }

        .dashboard-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dashboard-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 20, 16, 0) 0%,
            rgba(10, 20, 16, 0.3) 50%,
            rgba(10, 20, 16, 0.8) 100%
          );
          pointer-events: none;
        }

        .dashboard-caption {
          position: absolute;
          bottom: 64px;
          left: 64px;
          right: 64px;
          z-index: 10;
          display: flex;
          justify-content: flex-start;
        }

        .caption-box {
          background: rgba(10, 20, 16, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(83, 254, 170, 0.3);
          border-radius: 2px;
          padding: 40px 48px;
          max-width: 600px;
        }

        .caption-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #53FEAA;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .dashboard-caption h3 {
          font-family: var(--font-mono);
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          line-height: 1.2;
          color: white;
        }

        .dashboard-caption p {
          font-size: clamp(15px, 1.6vw, 18px);
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .dashboard-image-wrapper {
            width: 95%;
            border-radius: 12px;
          }

          .dashboard-caption {
            bottom: 32px;
            left: 24px;
            right: 24px;
          }

          .caption-box {
            padding: 32px 24px;
          }

          .caption-tag {
            font-size: 10px;
            margin-bottom: 12px;
          }

          .dashboard-caption h3 {
            margin-bottom: 12px;
          }
        }
      `}</style>
    </section>
  );
};
