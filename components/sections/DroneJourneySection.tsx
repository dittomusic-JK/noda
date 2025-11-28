'use client';

import { DroneScene } from '@/components/drone-scene';

const CAPABILITIES = [
  {
    number: '01',
    title: 'Agentic AI-Powered Orchestration',
    description: 'Adaptive decision-making across air, land, sea, and subsurface systems.',
    align: 'left'
  },
  {
    number: '02',
    title: 'Mixed-Fleet Collaboration',
    description: 'Autonomous teaming of heterogeneous UxVs in contested, dynamic environments.',
    align: 'right'
  },
  {
    number: '03',
    title: 'Zero-Friction Integration',
    description: 'No software or hardware modifications required on OEM platforms.',
    align: 'left'
  },
  {
    number: '04',
    title: 'Vendor-Agnostic Architecture',
    description: 'Open orchestrator works with any platform. Best-in-class behaviors across all nodes.',
    align: 'right'
  }
];

export function DroneJourneySection() {
  return (
    <section className="drone-journey-container capabilities-section">
      {/* Sticky 3D canvas */}
      <div className="drone-journey-canvas-wrapper">
        <DroneScene />
      </div>
      
      {/* Scrollable capability sections */}
      <div className="drone-journey-sections">
        {CAPABILITIES.map((capability, index) => (
          <div 
            key={index} 
            className={`drone-journey-section capability-${capability.align}`}
          >
            <div className="capability-content">
              <div className="capability-number">{capability.number}</div>
              <h2 className="capability-title">{capability.title}</h2>
              <p className="capability-description">{capability.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
