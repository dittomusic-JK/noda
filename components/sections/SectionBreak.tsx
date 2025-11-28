'use client';

import { useEffect, useRef } from 'react';

export const SectionBreak = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.style.width = '100%';
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-break">
      <div className="break-content">
        <div ref={lineRef} className="animated-line" />
        <div className="break-pulse" />
      </div>

      <style jsx>{`
        .section-break {
          position: relative;
          height: 30vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          overflow: hidden;
        }

        .break-content {
          position: relative;
          width: 100%;
          height: 2px;
          max-width: 1200px;
          padding: 0 48px;
        }

        .animated-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #53FEAA 20%,
            #53FEAA 80%,
            transparent 100%
          );
          box-shadow: 0 0 20px rgba(83, 254, 170, 0.5);
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .break-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #53FEAA;
          border-radius: 50%;
          box-shadow: 
            0 0 20px rgba(83, 254, 170, 0.8),
            0 0 40px rgba(83, 254, 170, 0.4);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @media (max-width: 768px) {
          .break-content {
            padding: 0 24px;
          }
        }
      `}</style>
    </div>
  );
};
