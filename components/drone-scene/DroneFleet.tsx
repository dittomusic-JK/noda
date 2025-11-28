'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import * as THREE from 'three';

import { FixedWingDrone } from './models/FixedWingDrone';
import { Quadcopter } from './models/Quadcopter';
import { Rover } from './models/Rover';
import { RobotDog } from './models/RobotDog';
import { ScanPulse } from './effects/ScanPulse';
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
  
  // Lead drone - barely moves in section 1, just "thinking"
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
      // Section 4: Stay in view, gentle drift - don't exit too much
      const t = easeInOutCubic(mapRange(progress, 0.75, 1));
      return [0, t * 0.3, -2 - t * 2];
    }
  }, [progress, section1Progress]);
  
  // Rotation for models based on progress (gentle rotation as they move)
  const leadRotationY = useMemo(() => {
    if (progress < 0.25) return 0;
    if (progress < 0.5) return mapRange(progress, 0.25, 0.5) * 0.2;
    if (progress < 0.75) return 0.2 + mapRange(progress, 0.5, 0.75) * 0.3;
    return 0.5 + mapRange(progress, 0.75, 1) * 0.5; // Full rotation by end
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
    const entryX = -8 + wingmenEntryProgress * 6; // -8 to -2
    const formationX = progress >= 0.5 ? -2 - mapRange(progress, 0.75, 1) * 1 : -2;
    const z = progress < 0.5 ? 0.5 : 0.5 - mapRange(progress, 0.5, 0.75) * 1.5;
    const exitZ = progress >= 0.75 ? z - easeInOutCubic(mapRange(progress, 0.75, 1)) * 2 : z;
    
    return [
      progress < 0.5 ? entryX : formationX,
      0,
      progress < 0.75 ? z : exitZ
    ];
  }, [progress, wingmenEntryProgress]);
  
  // Wingmen rotate counter to lead for visual interest
  const wingmanRotationY = useMemo(() => {
    if (progress < 0.25) return 0;
    return -leadRotationY * 0.5 + Math.sin(progress * Math.PI * 2) * 0.15;
  }, [progress, leadRotationY]);

  const rightWingmanPos: [number, number, number] = useMemo(() => {
    const entryX = 8 - wingmenEntryProgress * 6; // 8 to 2
    const formationX = progress >= 0.5 ? 2 + mapRange(progress, 0.75, 1) * 1 : 2;
    const z = progress < 0.5 ? 0.5 : 0.5 - mapRange(progress, 0.5, 0.75) * 1.5;
    const exitZ = progress >= 0.75 ? z - easeInOutCubic(mapRange(progress, 0.75, 1)) * 2 : z;
    
    return [
      progress < 0.5 ? entryX : formationX,
      0,
      progress < 0.75 ? z : exitZ
    ];
  }, [progress, wingmenEntryProgress]);

  // Quadcopter appears at 35%, descends 35-50%
  const showQuadcopter = progress >= 0.35;
  const quadcopterEntryProgress = easeOutQuart(mapRange(progress, 0.35, 0.50));
  
  const quadcopterPos: [number, number, number] = useMemo(() => {
    const entryY = 6 - quadcopterEntryProgress * 6.5; // 6 to -0.5
    const formationY = -0.5;
    const z = progress < 0.5 ? 1 : 1 - mapRange(progress, 0.5, 0.75) * 1.5;
    const exitZ = progress >= 0.75 ? z - easeInOutCubic(mapRange(progress, 0.75, 1)) * 2 : z;
    const exitY = progress >= 0.75 ? formationY + mapRange(progress, 0.75, 1) * 0.5 : formationY;
    
    return [
      0,
      progress < 0.5 ? entryY : exitY,
      progress < 0.75 ? z : exitZ
    ];
  }, [progress, quadcopterEntryProgress]);
  
  // Quadcopter spins slowly
  const quadcopterRotationY = useMemo(() => {
    return progress * Math.PI * 0.5; // Quarter turn through entire sequence
  }, [progress]);

  // Data links appear when formation is complete (40%+)
  const showDataLinks = progress >= 0.40 && progress < 0.75;

  // ============================================
  // SECTION 03: ZERO-FRICTION INTEGRATION (50% - 75%)
  // Ground vehicles sync with aerial fleet
  // Story: "Instant interoperability"
  // ============================================
  const showGroundVehicles = progress >= 0.50;
  const groundEntryProgress = easeOutQuart(mapRange(progress, 0.50, 0.65));
  
  const roverPos: [number, number, number] = useMemo(() => {
    // Enter from bottom-left
    const entryX = -6 + groundEntryProgress * 4.5; // -6 to -1.5
    const entryY = -5 + groundEntryProgress * 3.5; // -5 to -1.5
    const z = progress < 0.75 
      ? 2 - mapRange(progress, 0.5, 0.75) * 2.5 
      : -0.5 - easeInOutCubic(mapRange(progress, 0.75, 1)) * 1.5;
    const exitX = progress >= 0.75 ? -1.5 - mapRange(progress, 0.75, 1) * 0.5 : -1.5;
    
    return [
      progress < 0.65 ? entryX : exitX,
      progress < 0.65 ? entryY : -1.5,
      z
    ];
  }, [progress, groundEntryProgress]);
  
  // Ground vehicles rotate to face camera then away
  const roverRotationY = useMemo(() => {
    if (progress < 0.5) return 0;
    return Math.sin(mapRange(progress, 0.5, 1) * Math.PI) * 0.4;
  }, [progress]);

  const robotDogPos: [number, number, number] = useMemo(() => {
    // Enter from bottom-right
    const entryX = 6 - groundEntryProgress * 4.5; // 6 to 1.5
    const entryY = -5 + groundEntryProgress * 3.5; // -5 to -1.5
    const z = progress < 0.75 
      ? 2 - mapRange(progress, 0.5, 0.75) * 2.5 
      : -0.5 - easeInOutCubic(mapRange(progress, 0.75, 1)) * 1.5;
    const exitX = progress >= 0.75 ? 1.5 + mapRange(progress, 0.75, 1) * 0.5 : 1.5;
    
    return [
      progress < 0.65 ? entryX : exitX,
      progress < 0.65 ? entryY : -1.5,
      z
    ];
  }, [progress, groundEntryProgress]);
  
  const robotDogRotationY = useMemo(() => {
    if (progress < 0.5) return 0;
    return -Math.sin(mapRange(progress, 0.5, 1) * Math.PI) * 0.4;
  }, [progress]);

  // Air-to-ground data links (65%+)
  const showGroundLinks = progress >= 0.65 && progress < 0.85;

  // ============================================
  // SECTION 04: VENDOR-AGNOSTIC ARCHITECTURE (75% - 100%)
  // Sequential highlights, then coordinated exit
  // Story: "Any platform, one system"
  // ============================================
  const section4Active = progress >= 0.75;
  const section4Progress = mapRange(progress, 0.75, 1);
  
  // Sequential highlight: each unit gets ~15% of section 4's first 90%
  const highlightIndex = useMemo(() => {
    if (!section4Active || section4Progress > 0.9) return -1;
    const highlightProgress = section4Progress / 0.9;
    return Math.floor(highlightProgress * 6);
  }, [section4Active, section4Progress]);

  // Grid appears at 75%, fades in
  const showGrid = progress >= 0.75;
  const gridOpacity = mapRange(progress, 0.75, 0.85) * 0.4;

  // ============================================
  // CAMERA MOVEMENT
  // ============================================
  useFrame(() => {
    let targetPos: [number, number, number];
    let targetLookAt: [number, number, number];
    
    if (progress < 0.25) {
      // Section 1: Close-up, intimate with lead drone
      targetPos = [0, 0.5, 5];
      targetLookAt = [0, 0, 0];
    } else if (progress < 0.5) {
      // Section 2: Pull back smoothly to reveal formation
      const t = easeInOutCubic(mapRange(progress, 0.25, 0.5));
      targetPos = [0, 0.5 + t * 1, 5 + t * 4];
      targetLookAt = [0, 0, -t * 0.5];
    } else if (progress < 0.75) {
      // Section 3: Rise up to show ground + air together
      const t = easeInOutCubic(mapRange(progress, 0.5, 0.75));
      targetPos = [0, 1.5 + t * 1.5, 9 + t * 1];
      targetLookAt = [0, -0.3 - t * 0.3, -0.5 - t * 1];
    } else {
      // Section 4: Stay close, orbit slightly
      const t = easeInOutCubic(section4Progress);
      targetPos = [Math.sin(t * 0.5) * 1.5, 3 - t * 1, 10 - t * 2];
      targetLookAt = [0, -0.5, -1.5 - t * 1];
    }
    
    // Smooth camera interpolation
    camera.position.x += (targetPos[0] - camera.position.x) * 0.04;
    camera.position.y += (targetPos[1] - camera.position.y) * 0.04;
    camera.position.z += (targetPos[2] - camera.position.z) * 0.04;
    
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
      
      {/* ===== AIR-TO-AIR DATA LINKS ===== */}
      {showDataLinks && (
        <>
          <SimpleDataLink from={leadDronePos} to={leftWingmanPos} active={true} />
          <SimpleDataLink from={leadDronePos} to={rightWingmanPos} active={true} />
          <SimpleDataLink from={leadDronePos} to={quadcopterPos} active={true} />
        </>
      )}
      
      {/* ===== GROUND VEHICLES (Section 3+) ===== */}
      {showGroundVehicles && (
        <>
          <Rover 
            position={roverPos}
            highlight={highlightIndex === 4}
            scale={0.5}
            rotationY={roverRotationY}
          />
          <RobotDog 
            position={robotDogPos}
            walking={progress >= 0.5 && progress < 0.75}
            highlight={highlightIndex === 5}
            scale={0.4}
            rotationY={robotDogRotationY}
          />
        </>
      )}
      
      {/* ===== AIR-TO-GROUND DATA LINKS ===== */}
      {showGroundLinks && (
        <>
          <SimpleDataLink from={quadcopterPos} to={roverPos} active={true} />
          <SimpleDataLink from={quadcopterPos} to={robotDogPos} active={true} />
        </>
      )}
      
      {/* ===== BACKGROUND GRID (Section 4) ===== */}
      <GridMesh visible={showGrid} opacity={gridOpacity} />
    </group>
  );
}
