'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITIES = [
  {
    number: '01',
    title: 'Agentic AI-Powered Orchestration',
    description: 'Adaptive decision-making across air, land, sea, and subsurface systems.',
    visual: '/gifs/coverage_animation.gif',
    align: 'left' // text left, visual right
  },
  {
    number: '02',
    title: 'Mixed-Fleet Collaboration',
    description: 'Autonomous teaming of heterogeneous UxVs in contested, dynamic environments.',
    visual: '/gifs/formation_control.gif',
    align: 'right' // text right, visual left
  },
  {
    number: '03',
    title: 'Zero-Friction Integration',
    description: 'No software or hardware modifications required on OEM platforms.',
    visual: '/gifs/relay_uav_animation.gif',
    align: 'left'
  },
  {
    number: '04',
    title: 'Vendor-Agnostic Architecture',
    description: 'Open orchestrator works with any platform. Best-in-class behaviors across all nodes.',
    visual: '/gifs/coverage_animation.gif',
    align: 'right'
  }
];

export const CoreCapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capabilities = document.querySelectorAll('.capability-item');
    
    capabilities.forEach((capability) => {
      // Reveal animation
      gsap.from(capability, {
        scrollTrigger: {
          trigger: capability,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        ease: 'power2.out',
      });

      // Parallax the visual
      const visual = capability.querySelector('.capability-visual');
      if (visual) {
        gsap.to(visual, {
          scrollTrigger: {
            trigger: capability,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -50,
          ease: 'none',
        });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="core-capabilities-section">
      {CAPABILITIES.map((capability, index) => (
        <div
          key={index}
          className={`capability-item capability-${capability.align}`}
        >
          {/* Text Content */}
          <div className="capability-content">
            <div className="capability-number">{capability.number}</div>
            <h2 className="capability-title">{capability.title}</h2>
            <p className="capability-description">{capability.description}</p>
          </div>

          {/* Visual */}
          <div className="capability-visual-wrapper">
            <div className="capability-visual">
              <img src={capability.visual} alt={capability.title} />
              <div className="visual-overlay" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
