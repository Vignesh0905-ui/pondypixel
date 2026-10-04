import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Iridescent Metallic Sculptural Ring (Main Hero Centerpiece) ---
const IridescentSculpture: React.FC<{ ringRef: React.RefObject<THREE.Group> }> = ({ ringRef }) => {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerTorusRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.y += delta * 0.25;
      torusRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
      torusRef.current.rotation.z = Math.cos(t * 0.3) * 0.1;
    }
    if (innerTorusRef.current) {
      innerTorusRef.current.rotation.y -= delta * 0.35;
      innerTorusRef.current.rotation.x = Math.cos(t * 0.5) * 0.2;
    }
  });

  // Metallic Iridescent Material Setup
  const metallicMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#38BDF8'),
      emissive: new THREE.Color('#1E1B4B'),
      emissiveIntensity: 0.2,
      roughness: 0.12,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      iridescence: 1.0,
      iridescenceIOR: 1.4,
      iridescenceThicknessRange: [120, 380],
    });
  }, []);

  const innerMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#C084FC'),
      roughness: 0.15,
      metalness: 0.92,
      clearcoat: 0.8,
      iridescence: 0.8,
      iridescenceIOR: 1.3,
    });
  }, []);

  return (
    <group ref={ringRef} position={[0, 0.5, -2]}>
      {/* Outer Main Iridescent Torus Knot */}
      <mesh ref={torusRef} material={metallicMaterial} castShadow receiveShadow>
        <torusKnotGeometry args={[2.8, 0.65, 160, 32, 2, 3]} />
      </mesh>

      {/* Inner Concentric Floating Ring */}
      <mesh ref={innerTorusRef} material={innerMaterial} scale={0.72} castShadow>
        <torusGeometry args={[2.6, 0.15, 32, 100]} />
      </mesh>

      {/* Core Glow Point Light */}
      <pointLight intensity={3.5} color="#38BDF8" distance={8} />
      <pointLight intensity={3.0} color="#A855F7" distance={8} />
    </group>
  );
};

// --- 2. Translucent Cyan-Blue Flowing Ribbons ---
const FlowingRibbon: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-12, -4, -6),
      new THREE.Vector3(-6, 2, -3),
      new THREE.Vector3(0, -1.5, -1),
      new THREE.Vector3(6, 3, -4),
      new THREE.Vector3(12, -3, -8),
    ];
    return new THREE.CatmullRomCurve3(points, true, 'centripetal');
  }, []);

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 0.22, 16, false);
  }, [curve]);

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#06B6D4'),
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 0.8,
      transparent: true,
      opacity: 0.75,
      ior: 1.5,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.25;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={glassMaterial} position={[0, 0, -1]} />;
};

// --- 3. Floating Glass Orbs & Crystalline Objects ---
const FloatingGlassOrbs: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const orbPositions = useMemo(
    () => [
      { pos: [-5.5, 3.2, -3], size: 0.65, type: 'sphere', color: '#38BDF8' },
      { pos: [5.2, -2.5, -2.5], size: 0.85, type: 'crystal', color: '#C084FC' },
      { pos: [-4.2, -3.0, -4], size: 0.55, type: 'crystal', color: '#06B6D4' },
      { pos: [4.8, 3.5, -3.5], size: 0.75, type: 'sphere', color: '#A855F7' },
      { pos: [7.0, 0.8, -5], size: 0.45, type: 'sphere', color: '#38BDF8' },
      { pos: [-7.2, -0.5, -5], size: 0.5, type: 'crystal', color: '#818CF8' },
    ],
    []
  );

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E0F2FE'),
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.9,
      thickness: 0.6,
      transparent: true,
      opacity: 0.85,
      ior: 1.45,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(t * 1.2 + i) * 0.003;
        child.rotation.x += 0.005;
        child.rotation.y += 0.008;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbPositions.map((item, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={item.pos as [number, number, number]} material={glassMaterial} castShadow>
            {item.type === 'sphere' ? (
              <sphereGeometry args={[item.size, 32, 32]} />
            ) : (
              <icosahedronGeometry args={[item.size, 0]} />
            )}
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// --- 4. Reflective Dark Floor ---
const ReflectiveFloor: React.FC = () => {
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#05070D'),
      roughness: 0.2,
      metalness: 0.85,
    });
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} material={floorMaterial} receiveShadow>
      <planeGeometry args={[80, 80]} />
    </mesh>
  );
};

// --- 5. Atmospheric Glowing Particles ---
const AmbientParticles: React.FC = () => {
  return (
    <Sparkles
      count={220}
      scale={[25, 16, 20]}
      position={[0, 0, -2]}
      size={3.5}
      speed={0.35}
      opacity={0.7}
      color="#38BDF8"
    />
  );
};

// --- 6. Main 3D World Scene & Camera Scroll Controller ---
const FuturisticWorld: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);
  const dirLight1 = useRef<THREE.DirectionalLight>(null);
  const dirLight2 = useRef<THREE.DirectionalLight>(null);

  // Mouse Parallax Effect
  useFrame((state) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      const { x, y } = state.mouse;
      state.camera.position.x += (x * 0.6 - state.camera.position.x) * 0.03;
      state.camera.position.y += (-y * 0.4 - state.camera.position.y) * 0.03;
      state.camera.lookAt(0, 0, -2);
    }
  });

  // ScrollTrigger Animations
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // Section Scroll Camera & Sculpture Movement
      if (ringRef.current) {
        scrollTl.to(
          ringRef.current.position,
          {
            x: 2.5,
            y: -0.5,
            z: -4,
            ease: 'none',
          },
          0.2
        );

        scrollTl.to(
          ringRef.current.rotation,
          {
            x: Math.PI * 0.25,
            y: Math.PI * 0.5,
            ease: 'none',
          },
          0.4
        );
      }

      if (dirLight1.current && dirLight2.current) {
        scrollTl.to(dirLight1.current, { intensity: 4.5 }, 0.3);
        scrollTl.to(dirLight2.current, { intensity: 4.0 }, 0.5);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Background Fog */}
      <fogExp2 attach="fog" color="#05070D" density={0.03} />

      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.7} color="#1E1B4B" />

      {/* Cyan Rim Light */}
      <directionalLight
        ref={dirLight1}
        position={[-8, 6, 4]}
        intensity={3.5}
        color="#38BDF8"
        castShadow
      />

      {/* Purple Rim Light */}
      <directionalLight
        ref={dirLight2}
        position={[8, 8, -2]}
        intensity={3.8}
        color="#C084FC"
        castShadow
      />

      {/* Subtle Indigo Accent Fill */}
      <pointLight position={[0, -2, 2]} intensity={2.0} color="#818CF8" distance={10} />

      {/* 3D Elements */}
      <IridescentSculpture ringRef={ringRef} />
      <FlowingRibbon />
      <FloatingGlassOrbs />
      <ReflectiveFloor />
      <AmbientParticles />
    </>
  );
};

// --- 7. Main Futuristic 3D Canvas Component with Fallback ---
export const Futuristic3DCanvas: React.FC = () => {
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
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#05070D] via-[#0A0D1A] to-[#05070D] pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <FuturisticWorld />
      </Canvas>

      {/* Soft Vignette & Radial Glow Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/50 via-transparent to-[#05070D]/80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#7C3CFF]/15 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};

export default Futuristic3DCanvas;
