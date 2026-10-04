import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Procedural French Quarter Villa ---
const FrenchColonialVilla: React.FC<{ position?: [number, number, number]; rotation?: [number, number, number] }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const windowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFDF5'),
        roughness: 0.3,
        metalness: 0.1,
      }),
    []
  );

  const yellowWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E5A738'), // Pondicherry signature mustard yellow
        roughness: 0.7,
        metalness: 0.05,
      }),
    []
  );

  const whitePillarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F7F7F7'), // French colonial white trim
        roughness: 0.4,
        metalness: 0.1,
      }),
    []
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#A8452A'), // Terracotta roof tiles
        roughness: 0.6,
      }),
    []
  );

  const doorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2C4C3E'), // French colonial deep green door
        roughness: 0.5,
      }),
    []
  );

  const ironRailingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1A1C23'),
        roughness: 0.2,
        metalness: 0.8,
      }),
    []
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Main 2-Story Building Block */}
      <mesh position={[0, 2.2, 0]} material={yellowWallMaterial} castShadow receiveShadow>
        <boxGeometry args={[7, 4.4, 4.5]} />
      </mesh>

      {/* Terracotta Roof */}
      <mesh position={[0, 4.7, 0]} rotation={[0, Math.PI / 4, 0]} material={roofMaterial} castShadow>
        <coneGeometry args={[5.2, 1.2, 4]} />
      </mesh>

      {/* Colonial White Base Cornice / Trim */}
      <mesh position={[0, 0.15, 0]} material={whitePillarMaterial} receiveShadow>
        <boxGeometry args={[7.4, 0.3, 4.9]} />
      </mesh>
      <mesh position={[0, 2.2, 0]} material={whitePillarMaterial} receiveShadow>
        <boxGeometry args={[7.2, 0.15, 4.7]} />
      </mesh>
      <mesh position={[0, 4.4, 0]} material={whitePillarMaterial} receiveShadow>
        <boxGeometry args={[7.3, 0.2, 4.8]} />
      </mesh>

      {/* Front Entrance Archway & Pillars (Ground Floor) */}
      {[-2.6, -1.3, 0, 1.3, 2.6].map((x, i) => (
        <group key={`pillar-${i}`} position={[x, 1.1, 2.38]}>
          <mesh material={whitePillarMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.14, 2.2, 16]} />
          </mesh>
        </group>
      ))}

      {/* Main Wooden French Door */}
      <mesh position={[0, 1.0, 2.26]} material={doorMaterial}>
        <boxGeometry args={[1.3, 2.0, 0.1]} />
      </mesh>
      {/* Arch Glass Accent over Door */}
      <mesh position={[0, 2.1, 2.26]} material={windowMaterial}>
        <cylinderGeometry args={[0.65, 0.65, 0.08, 16, 1, false, 0, Math.PI]} />
      </mesh>

      {/* Windows with French Shutters - Upper Floor */}
      {[-2.2, 0, 2.2].map((x, i) => (
        <group key={`win-upper-${i}`} position={[x, 3.2, 2.27]}>
          {/* Glass window */}
          <mesh material={windowMaterial}>
            <boxGeometry args={[1.0, 1.4, 0.08]} />
          </mesh>
          {/* White Arch Surround */}
          <mesh position={[0, 0.75, 0]} material={whitePillarMaterial}>
            <cylinderGeometry args={[0.5, 0.5, 0.09, 16, 1, false, 0, Math.PI]} />
          </mesh>
          {/* Louvered Green Shutters */}
          <mesh position={[-0.6, 0, 0.02]} material={doorMaterial}>
            <boxGeometry args={[0.3, 1.4, 0.04]} />
          </mesh>
          <mesh position={[0.6, 0, 0.02]} material={doorMaterial}>
            <boxGeometry args={[0.3, 1.4, 0.04]} />
          </mesh>
        </group>
      ))}

      {/* Wrought Iron Balcony Railing (Upper Level) */}
      <group position={[0, 2.45, 2.45]}>
        <mesh material={ironRailingMaterial}>
          <boxGeometry args={[6.8, 0.5, 0.05]} />
        </mesh>
        {/* Balcony Floor Slab */}
        <mesh position={[0, -0.28, 0]} material={whitePillarMaterial}>
          <boxGeometry args={[7.0, 0.12, 0.4]} />
        </mesh>
      </group>

      {/* Warm Hanging Lantern Glow */}
      <pointLight position={[0, 1.8, 2.6]} intensity={1.8} color="#FFD175" distance={6} />
      <pointLight position={[-2.2, 3.2, 2.6]} intensity={1.2} color="#FFAE42" distance={4} />
      <pointLight position={[2.2, 3.2, 2.6]} intensity={1.2} color="#FFAE42" distance={4} />
    </group>
  );
};

// --- 2. Procedural Palm Trees (Pondicherry Coastal Road Vibe) ---
const PalmTree: React.FC<{ position: [number, number, number]; scale?: number; rotationY?: number }> = ({
  position,
  scale = 1,
  rotationY = 0,
}) => {
  const trunkGroupRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (leavesRef.current) {
      // Gentle sway in coastal breeze
      const t = state.clock.getElapsedTime();
      leavesRef.current.rotation.z = Math.sin(t * 1.5 + position[0]) * 0.04;
      leavesRef.current.rotation.x = Math.cos(t * 1.2 + position[2]) * 0.03;
    }
  });

  const trunkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5E4228'),
        roughness: 0.9,
      }),
    []
  );

  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2D7A47'), // Vibrant tropical green
        roughness: 0.4,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* Curved Trunk Segments */}
      <group ref={trunkGroupRef}>
        {[...Array(6)].map((_, i) => {
          const y = i * 0.7;
          const curveX = Math.sin(i * 0.3) * 0.15;
          return (
            <mesh key={i} position={[curveX, y + 0.35, 0]} material={trunkMaterial} castShadow>
              <cylinderGeometry args={[0.16 - i * 0.015, 0.19 - i * 0.015, 0.75, 10]} />
            </mesh>
          );
        })}
      </group>

      {/* Palm Fronds Top Crown */}
      <group ref={leavesRef} position={[0.35, 4.3, 0]}>
        {[...Array(9)].map((_, i) => {
          const angle = (i / 9) * Math.PI * 2;
          return (
            <group key={i} rotation={[0.4, angle, 0]}>
              <mesh position={[0, 0, 0.9]} rotation={[-0.3, 0, 0]} material={leafMaterial} castShadow>
                <coneGeometry args={[0.45, 2.0, 3]} />
              </mesh>
            </group>
          );
        })}
        {/* Coconuts */}
        {[-0.15, 0.15].map((x, idx) => (
          <mesh key={idx} position={[x, -0.1, 0.1]} material={trunkMaterial}>
            <sphereGeometry args={[0.12, 8, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// --- 3. Bay of Bengal Ocean Surface ---
const OceanBay: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      const geom = meshRef.current.geometry as THREE.BufferGeometry;
      const posAttr = geom.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        // Soft rolling coastal ocean wave simulation
        const z = Math.sin(x * 0.4 + t * 1.5) * 0.12 + Math.cos(y * 0.5 + t * 1.2) * 0.1;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }
  });

  const oceanMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0A3C4D'), // Deep Ocean Teal
        roughness: 0.15,
        metalness: 0.75,
        flatShading: true,
      }),
    []
  );

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.2, -8]}
      material={oceanMaterial}
      receiveShadow
    >
      <planeGeometry args={[60, 40, 32, 24]} />
    </mesh>
  );
};

// --- 4. Promenade & Beach Shoreline ---
const CoastalPromenade: React.FC = () => {
  const paveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#202433'), // Dark stone promenade pavement
        roughness: 0.8,
      }),
    []
  );

  const sandMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C99E66'), // Golden beach sand
        roughness: 0.9,
      }),
    []
  );

  const lampMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#151722'),
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  return (
    <group>
      {/* Promenade Pavement Strip */}
      <mesh position={[0, -0.05, 2]} material={paveMat} receiveShadow>
        <boxGeometry args={[50, 0.2, 12]} />
      </mesh>

      {/* Beach Sand Line meeting Ocean */}
      <mesh position={[0, -0.15, -3.5]} material={sandMat} receiveShadow>
        <boxGeometry args={[55, 0.18, 5]} />
      </mesh>

      {/* French Colonial Streetlamps along Promenade */}
      {[-8, -2, 4, 10].map((x, idx) => (
        <group key={`lamp-${idx}`} position={[x, 0.05, 5.5]}>
          {/* Post */}
          <mesh position={[0, 1.3, 0]} material={lampMat} castShadow>
            <cylinderGeometry args={[0.06, 0.09, 2.6, 12]} />
          </mesh>
          {/* Lantern Head */}
          <mesh material={lampMat} position={[0, 2.7, 0]}>
            <coneGeometry args={[0.25, 0.35, 4]} />
          </mesh>
          {/* Glowing Bulb */}
          <mesh position={[0, 2.55, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshBasicMaterial color="#FFE5A3" />
          </mesh>
          <pointLight position={[0, 2.55, 0]} intensity={1.5} color="#FF9E2C" distance={6} />
        </group>
      ))}
    </group>
  );
};

// --- 5. Coastal Ocean Mist Particles ---
const SeaMistParticles: React.FC = () => {
  return (
    <Sparkles
      count={180}
      scale={[30, 12, 20]}
      position={[0, 4, 0]}
      size={4}
      speed={0.4}
      opacity={0.65}
      color="#35A7FF"
    />
  );
};

// --- 6. Sun / Sunset Horizon ---
const SunsetSun: React.FC<{ sunRef: React.RefObject<THREE.Group> }> = ({ sunRef }) => {
  return (
    <group ref={sunRef} position={[0, 4, -22]}>
      <mesh>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#FFA043" />
      </mesh>
      {/* Outer Atmospheric Sunset Glow */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#FF5722" transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

// --- 7. Main 3D World Scene & Camera Scroll Rig ---
const PondicherryWorld: React.FC = () => {
  const sunGroupRef = useRef<THREE.Group>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambLightRef = useRef<THREE.AmbientLight>(null);
  const fogRef = useRef<THREE.FogExp2>(null);

  // Scroll Trigger Camera Animation Loop
  useFrame((state) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const mouse = state.mouse;

    // Subtle floating mouse parallax
    if (!isTouch) {
      state.camera.position.x += (mouse.x * 0.5 - state.camera.position.x) * 0.02;
      state.camera.position.y += (2.5 + mouse.y * 0.3 - state.camera.position.y) * 0.02;
    }
  });

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // Camera target positions per scroll section
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // 1. Hero -> About Section
      scrollTl.to(
        sunGroupRef.current?.position || {},
        { y: 2.2, z: -25, ease: 'none' },
        0
      );

      if (dirLightRef.current) {
        scrollTl.to(dirLightRef.current, { intensity: 1.6 }, 0);
      }

      // Lighting transition from Warm Golden Hour to Deep Ocean Night Teal
      if (ambLightRef.current) {
        scrollTl.to(ambLightRef.current.color, { r: 0.1, g: 0.25, b: 0.45 }, 0.5);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Atmospheric Fog */}
      <fogExp2 ref={fogRef} attach="fog" color="#0B101D" density={0.025} />

      {/* Lighting Setup */}
      <ambientLight ref={ambLightRef} intensity={0.85} color="#FFD1A3" />
      <directionalLight
        ref={dirLightRef}
        position={[10, 12, 8]}
        intensity={2.2}
        color="#FFA347"
        castShadow
      />
      <hemisphereLight args={['#35A7FF', '#080A12', 0.6]} />

      {/* Sun on Bay Horizon */}
      <SunsetSun sunRef={sunGroupRef} />

      {/* French Quarter Colonial Architecture */}
      <FrenchColonialVilla position={[-2.8, 0, 0]} rotation={[0, 0.18, 0]} />
      <FrenchColonialVilla position={[7.5, 0, -2]} rotation={[0, -0.25, 0]} />

      {/* Promenade Palm Trees */}
      <PalmTree position={[-7.5, 0, 4]} scale={1.15} rotationY={0.3} />
      <PalmTree position={[-1.2, 0, 5]} scale={0.9} rotationY={-0.5} />
      <PalmTree position={[3.8, 0, 4.5]} scale={1.1} rotationY={0.8} />
      <PalmTree position={[12, 0, 2]} scale={1.3} rotationY={-0.2} />

      {/* Coastal Promenade & Ocean */}
      <CoastalPromenade />
      <OceanBay />

      {/* Coastal Sea Mist Particles */}
      <SeaMistParticles />
    </>
  );
};

// --- 8. WebGL Wrapper Canvas with Fallback & Mobile Optimizations ---
export const PondicherryCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = React.useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#080A12] via-[#0D1222] to-[#05070D] pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 2.5, 11], fov: 50 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <PondicherryWorld />
      </Canvas>

      {/* Subtle Cinematic Overlay Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/40 via-transparent to-[#05070D]/70 pointer-events-none" />
    </div>
  );
};

export default PondicherryCanvas;
