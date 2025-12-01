'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

import { FixedWingDrone } from './models/FixedWingDrone';
import { Quadcopter } from './models/Quadcopter';
import { Rover } from './models/Rover';
import { ScanPulse } from './effects/ScanPulse';
import { SyncPulse } from './effects/SyncPulse';
import { SimpleDataLink } from './effects/DataLink';
import { GridMesh } from './effects/GridMesh';
import { TargetingReticle, FrameBrackets } from './effects/HUDElements';
import { SceneBackground } from './effects/SceneBackground';

interface DroneFleetProps {
  progress: number; // 0-1 scroll progress
}

// Easing functions
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Map a value from one range to 0-1 (with clamping)
function mapRange(value: number, inMin: number, inMax: number): number {
  return clamp((value - inMin) / (inMax - inMin), 0, 1);
}

export function DroneFleet({ progress }: DroneFleetProps) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  
  // ============================================
  // SECTION 01: AGENTIC AI (0% - 25%)
  // Single drone holds position, scanning
  // Story: "One mind, many considerations"
  // ============================================
  const section1Active = progress < 0.25;
  const section1Progress = mapRange(progress, 0, 0.25);
  
  // Section 4 transition and orbit angle for formation around target
  const section4TransitionProgress = useMemo(() => {
    // Smooth transition into section 4 (first 20% of section 4)
    if (progress < 0.75) return 0;
    return easeInOutCubic(mapRange(progress, 0.75, 0.80));
  }, [progress]);
  
  const section4OrbitAngle = useMemo(() => {
    if (progress < 0.80) return 0; // Start orbiting after transition
    return mapRange(progress, 0.80, 1) * Math.PI * 0.8; // Slower ~144° orbit
  }, [progress]);

  // Target Z position (needed for orbital calculations)
  const targetZ = useMemo(() => {
    if (progress < 0.75) {
      return 1 - mapRange(progress, 0.5, 0.75) * 2;
    }
    return -1 - easeInOutCubic(mapRange(progress, 0.75, 1)) * 1;
  }, [progress]);

  // Lead drone - barely moves in section 1, orbits target in section 4
  const leadDronePos: [number, number, number] = useMemo(() => {
    if (progress < 0.25) {
      // Section 1: Hold steady, very slight drift forward
      return [0, 0, -section1Progress * 0.3];
    } else if (progress < 0.5) {
      // Section 2: Move to formation lead position
      const t = mapRange(progress, 0.25, 0.5);
      return [0, 0, -0.3 - t * 0.7];
    } else if (progress < 0.75) {
      // Section 3: Formation moves forward together
      const t = mapRange(progress, 0.5, 0.75);
      return [0, 0, -1 - t * 1];
    } else {
      // Section 4: Transition then orbit around target
      const orbitRadius = 5; // Wider orbit
      const baseAngle = section4OrbitAngle;
      const orbitX = Math.sin(baseAngle) * orbitRadius;
      const orbitZ = targetZ + Math.cos(baseAngle) * orbitRadius;
      // Blend from section 3 end position to orbit
      const section3EndX = 0;
      const section3EndZ = -2;
      return [
        section3EndX + (orbitX - section3EndX) * section4TransitionProgress,
        0.5 + 0.5 * section4TransitionProgress,
        section3EndZ + (orbitZ - section3EndZ) * section4TransitionProgress
      ];
    }
  }, [progress, section1Progress, section4OrbitAngle, targetZ, section4TransitionProgress]);
  
  // Rotation for models based on progress (gentle rotation as they move)
  const leadRotationY = useMemo(() => {
    if (progress < 0.25) return 0;
    if (progress < 0.5) return mapRange(progress, 0.25, 0.5) * 0.2;
    if (progress < 0.75) return 0.2 + mapRange(progress, 0.5, 0.75) * 0.3;
    return 0.5 + mapRange(progress, 0.75, 1) * 0.5;
  }, [progress]);

  // ============================================
  // SECTION 02: MIXED-FLEET COLLABORATION (25% - 50%)
  // Wingmen fly in, quadcopter descends
  // Story: "Heterogeneous assets, unified purpose"
  // ============================================
  const section2Active = progress >= 0.25 && progress < 0.5;
  const section2Progress = mapRange(progress, 0.25, 0.5);
  
  // Wingmen appear at 25%, fly in during 25-40%, hold formation 40-50%
  const showWingmen = progress >= 0.25;
  const wingmenEntryProgress = easeOutQuart(mapRange(progress, 0.25, 0.40));
  
  const leftWingmanPos: [number, number, number] = useMemo(() => {
    if (progress < 0.5) {
      // Section 2: Fly in from left
      const entryX = -8 + wingmenEntryProgress * 6; // -8 to -2
      return [entryX, 0, 0.5];
    } else if (progress < 0.75) {
      // Section 3: Move to pre-orbital position (already spread out)
      const t = mapRange(progress, 0.5, 0.75);
      const startX = -2;
      const endX = -4; // Pre-orbital position
      const startZ = 0.5;
      const endZ = -1;
      return [
        startX + (endX - startX) * t,
        0.3 * t,
        startZ + (endZ - startZ) * t
      ];
    } else {
      // Section 4: Smooth orbit from pre-orbital position
      const orbitRadius = 5;
      const baseAngle = section4OrbitAngle + (Math.PI * 2 / 3); // 120° offset
      const orbitX = Math.sin(baseAngle) * orbitRadius;
      const orbitZ = targetZ + Math.cos(baseAngle) * orbitRadius;
      // Blend from section 3 end position
      const section3EndX = -4;
      const section3EndZ = -1;
      return [
        section3EndX + (orbitX - section3EndX) * section4TransitionProgress,
        0.3 + 0.3 * section4TransitionProgress,
        section3EndZ + (orbitZ - section3EndZ) * section4TransitionProgress
      ];
    }
  }, [progress, wingmenEntryProgress, section4OrbitAngle, targetZ, section4TransitionProgress]);
  
  // Wingmen rotate counter to lead for visual interest
  const wingmanRotationY = useMemo(() => {
    if (progress < 0.25) return 0;
    return -leadRotationY * 0.5 + Math.sin(progress * Math.PI * 2) * 0.15;
  }, [progress, leadRotationY]);

  const rightWingmanPos: [number, number, number] = useMemo(() => {
    if (progress < 0.5) {
      // Section 2: Fly in from right
      const entryX = 8 - wingmenEntryProgress * 6; // 8 to 2
      return [entryX, 0, 0.5];
    } else if (progress < 0.75) {
      // Section 3: Move to pre-orbital position (already spread out)
      const t = mapRange(progress, 0.5, 0.75);
      const startX = 2;
      const endX = 4; // Pre-orbital position
      const startZ = 0.5;
      const endZ = -1;
      return [
        startX + (endX - startX) * t,
        0.3 * t,
        startZ + (endZ - startZ) * t
      ];
    } else {
      // Section 4: Smooth orbit from pre-orbital position
      const orbitRadius = 5;
      const baseAngle = section4OrbitAngle + (Math.PI * 4 / 3); // 240° offset
      const orbitX = Math.sin(baseAngle) * orbitRadius;
      const orbitZ = targetZ + Math.cos(baseAngle) * orbitRadius;
      // Blend from section 3 end position
      const section3EndX = 4;
      const section3EndZ = -1;
      return [
        section3EndX + (orbitX - section3EndX) * section4TransitionProgress,
        0.3 + 0.3 * section4TransitionProgress,
        section3EndZ + (orbitZ - section3EndZ) * section4TransitionProgress
      ];
    }
  }, [progress, wingmenEntryProgress, section4OrbitAngle, targetZ, section4TransitionProgress]);

  // Quadcopter appears at 35%, descends 35-50%
  const showQuadcopter = progress >= 0.35;
  const quadcopterEntryProgress = easeOutQuart(mapRange(progress, 0.35, 0.50));
  
  const quadcopterPos: [number, number, number] = useMemo(() => {
    if (progress < 0.5) {
      // Section 2: Descend into formation
      const entryY = 6 - quadcopterEntryProgress * 6.5; // 6 to -0.5
      return [0, entryY, 1];
    } else if (progress < 0.75) {
      // Section 3: Rise to pre-orbital position above center
      const t = mapRange(progress, 0.5, 0.75);
      return [
        0,
        -0.5 + t * 1.5, // Rise from -0.5 to 1.0
        1 - t * 1.5 // Move forward
      ];
    } else {
      // Section 4: Orbit at inner radius, counter-rotating
      const innerRadius = 2.5; // Slightly wider inner orbit
      const counterAngle = -section4OrbitAngle * 1.2; // Slower counter-rotation
      const orbitX = Math.sin(counterAngle) * innerRadius;
      const orbitZ = targetZ + Math.cos(counterAngle) * innerRadius;
      // Blend from section 3 end position
      const section3EndZ = -0.5;
      return [
        orbitX * section4TransitionProgress,
        -0.5 + 2.5 * section4TransitionProgress, // Rise to 2.0
        section3EndZ + (orbitZ - section3EndZ) * section4TransitionProgress
      ];
    }
  }, [progress, quadcopterEntryProgress, targetZ, section4OrbitAngle, section4TransitionProgress]);
  
  // Quadcopter spins slowly
  const quadcopterRotationY = useMemo(() => {
    return progress * Math.PI * 0.5; // Quarter turn through entire sequence
  }, [progress]);

  // Data links appear when formation is complete (40%+)
  const showDataLinks = progress >= 0.40 && progress < 0.75;

  // ============================================
  // SECTION 03: ZERO-FRICTION INTEGRATION (50% - 75%)
  // Show sync pulse - instant integration to all drones
  // ============================================
  const section3Active = progress >= 0.5 && progress < 0.75;
  const section3Progress = mapRange(progress, 0.5, 0.75);
  
  // Center point for sync pulse (between all drones)
  const syncCenter: [number, number, number] = [0, 0, 0];
  
  // ============================================
  // SECTION 04: Target vehicle enters with road
  // Story: "Coordinated surveillance"
  // ============================================
  const showTarget = progress >= 0.75; // Only show in section 4
  const targetEntryProgress = easeOutQuart(mapRange(progress, 0.75, 0.90)); // Enter during section 4
  
  // Target rover - drives in from bottom of screen in section 4
  const roverPos: [number, number, number] = useMemo(() => {
    // Enter from below screen during section 4
    const entryY = -6 + targetEntryProgress * 4.5; // -6 to -1.5
    
    // Gentle S-curve movement while driving
    const t = mapRange(progress, 0.75, 1);
    const xOffset = Math.sin(t * Math.PI * 2) * 0.3;
    
    return [
      xOffset,
      entryY,
      targetZ
    ];
  }, [progress, targetEntryProgress, targetZ]);
  
  // Target faces along the road (into the scene) and turns slightly with S-curve
  const roverRotationY = useMemo(() => {
    if (progress < 0.75) {
      // Before section 4: face camera
      return 0;
    }
    // Section 4: rotate 90° to face along the road + slight turn with S-curve
    const t = mapRange(progress, 0.75, 1);
    const sCurveTurn = Math.cos(t * Math.PI * 2) * 0.15; // Turn into the curves
    return -Math.PI / 2 + sCurveTurn; // -90° to face along road
  }, [progress]);

  // Surveillance lines from drones to target (section 4)
  const showSurveillanceLines = progress >= 0.75;

  // ============================================
  // SECTION 04: VENDOR-AGNOSTIC ARCHITECTURE (75% - 100%)
  // Sequential highlights, then coordinated exit
  // Story: "Any platform, one system"
  // ============================================
  const section4Active = progress >= 0.75;
  const section4Progress = mapRange(progress, 0.75, 1);
  
  // Sequential highlight: each unit gets ~20% of section 4's first 90%
  const highlightIndex = useMemo(() => {
    if (!section4Active || section4Progress > 0.9) return -1;
    const highlightProgress = section4Progress / 0.9;
    return Math.floor(highlightProgress * 5); // 5 units now (no robot dog)
  }, [section4Active, section4Progress]);

  // Grid appears at 75%, fades in
  const showGrid = progress >= 0.75;
  const gridOpacity = mapRange(progress, 0.75, 0.85) * 0.4;

  // ============================================
  // CAMERA MOVEMENT - Cinematic panning and zooming
  // ============================================
  useFrame(() => {
    let targetPos: [number, number, number];
    let targetLookAt: [number, number, number];
    
    if (progress < 0.25) {
      // Section 1: Orbit around lead drone while zooming in
      const t = easeInOutCubic(section1Progress);
      const orbitAngle = t * Math.PI * 0.6; // ~108° orbit
      const orbitRadius = 5 - t * 1.5; // Zoom in from 5 to 3.5
      targetPos = [
        Math.sin(orbitAngle) * orbitRadius,
        0.5 + Math.sin(t * Math.PI) * 0.8, // Rise then fall
        Math.cos(orbitAngle) * orbitRadius
      ];
      targetLookAt = [0, 0, 0];
    } else if (progress < 0.5) {
      // Section 2: Pan right while pulling back to reveal formation
      const t = easeInOutCubic(mapRange(progress, 0.25, 0.5));
      targetPos = [
        Math.sin(Math.PI * 0.6) * 3.5 - t * 2, // Pan from right toward center-left
        0.5 + t * 1.5, // Rise up
        Math.cos(Math.PI * 0.6) * 3.5 + t * 5 // Pull back
      ];
      targetLookAt = [t * -0.5, 0, -t * 0.5];
    } else if (progress < 0.75) {
      // Section 3: Dramatic crane up + dolly, sweep across fleet
      const t = easeInOutCubic(mapRange(progress, 0.5, 0.75));
      targetPos = [
        -2 + t * 4, // Sweep from left to right
        2 + t * 2, // Continue rising
        7 + t * 2 // Slight pull back
      ];
      targetLookAt = [
        Math.sin(t * Math.PI * 0.5) * 1, // Pan across
        -0.5,
        -1 - t * 0.5
      ];
    } else {
      // Section 4: Slow orbit + zoom out for grand finale
      const t = easeInOutCubic(section4Progress);
      const finalOrbit = t * Math.PI * 0.4; // Gentle orbit
      targetPos = [
        2 + Math.sin(finalOrbit) * 2,
        4 - t * 1,
        9 + Math.cos(finalOrbit) * 1 - t * 1
      ];
      targetLookAt = [
        Math.sin(t * 0.5) * 0.5,
        -0.5 - t * 0.3,
        -1.5 - t * 1
      ];
    }
    
    // Smooth camera interpolation - slightly faster for more responsive feel
    camera.position.x += (targetPos[0] - camera.position.x) * 0.05;
    camera.position.y += (targetPos[1] - camera.position.y) * 0.05;
    camera.position.z += (targetPos[2] - camera.position.z) * 0.05;
    
    camera.lookAt(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
  });

  return (
    <group ref={groupRef}>
      {/* ===== BACKGROUND ===== */}
      <SceneBackground progress={progress} />
      
      {/* ===== LEAD DRONE (always visible) ===== */}
      <FixedWingDrone 
        position={leadDronePos} 
        hover={section1Active}
        highlight={highlightIndex === 0}
        scale={0.6}
        rotationY={leadRotationY}
      />
      
      {/* ===== HUD ELEMENTS (Section 1 only) ===== */}
      {section1Active && (
        <>
          <TargetingReticle 
            visible={true}
            targetPosition={leadDronePos}
          />
          <FrameBrackets visible={true} />
        </>
      )}
      
      {/* ===== SCAN PULSE (Section 1 only) ===== */}
      {section1Active && (
        <ScanPulse 
          position={[leadDronePos[0], leadDronePos[1] - 0.2, leadDronePos[2] + 0.3]} 
          active={true}
        />
      )}
      
      {/* ===== WINGMEN (Section 2+) ===== */}
      {showWingmen && (
        <>
          <FixedWingDrone 
            position={leftWingmanPos} 
            hover={true}
            highlight={highlightIndex === 1}
            scale={0.55}
            rotationY={wingmanRotationY}
          />
          <FixedWingDrone 
            position={rightWingmanPos} 
            hover={true}
            highlight={highlightIndex === 2}
            scale={0.55}
            rotationY={-wingmanRotationY}
          />
        </>
      )}
      
      {/* ===== QUADCOPTER (Section 2+ after delay) ===== */}
      {showQuadcopter && (
        <Quadcopter 
          position={quadcopterPos}
          hover={true}
          highlight={highlightIndex === 3}
          scale={0.5}
          rotationY={quadcopterRotationY}
        />
      )}
      
      {/* ===== AIR-TO-AIR DATA LINKS (Section 2) ===== */}
      {showDataLinks && !section3Active && (
        <>
          <SimpleDataLink from={leadDronePos} to={leftWingmanPos} active={true} />
          <SimpleDataLink from={leadDronePos} to={rightWingmanPos} active={true} />
          <SimpleDataLink from={leadDronePos} to={quadcopterPos} active={true} />
        </>
      )}
      
      {/* ===== SYNC PULSE (Section 3) - Zero-Friction Integration ===== */}
      {section3Active && (
        <SyncPulse
          center={syncCenter}
          targets={[leadDronePos, leftWingmanPos, rightWingmanPos, quadcopterPos]}
          progress={section3Progress}
          active={true}
        />
      )}
      
      {/* ===== TARGET VEHICLE (Section 3+) ===== */}
      {showTarget && (
        <Rover 
          position={roverPos}
          highlight={highlightIndex === 4}
          scale={0.5}
          rotationY={roverRotationY}
        />
      )}
      
      {/* ===== TARGET RETICLE ON ROVER (Section 4) ===== */}
      {showSurveillanceLines && (
        <TargetingReticle 
          visible={true}
          targetPosition={[roverPos[0], roverPos[1] + 0.3, roverPos[2]]}
        />
      )}
      
      {/* ===== SURVEILLANCE LINES (Section 4) ===== */}
      {showSurveillanceLines && (
        <>
          <SimpleDataLink from={leadDronePos} to={roverPos} active={true} />
          <SimpleDataLink from={leftWingmanPos} to={roverPos} active={true} />
          <SimpleDataLink from={rightWingmanPos} to={roverPos} active={true} />
          <SimpleDataLink from={quadcopterPos} to={roverPos} active={true} />
        </>
      )}
      
      {/* ===== BACKGROUND GRID (Section 4) ===== */}
      <GridMesh visible={showGrid} opacity={gridOpacity} />
    </group>
  );
}
