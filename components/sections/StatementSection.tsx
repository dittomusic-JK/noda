'use client';

import { useEffect, useRef, useState } from 'react';

export const StatementSection = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowTypewriter(true);
            // Trigger formation change to "coordinated team" pattern
            window.dispatchEvent(new CustomEvent('formation-change', { detail: 'team' }));
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="statement-section" ref={sectionRef} data-waypoint-label="COORDINATION">
      <div className="statement-wrapper">
        <h2 className="statement-text">
          Coordinate Like Teams,<br />
          <span className={`typewriter-line ${showTypewriter ? 'active' : ''}`}>
            Not Isolated Platforms
          </span>
        </h2>
      </div>
    </section>
  );
};
