import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
}

function PipelineScreen({ reducedMotion }) {
  const pulses = useRef([]);
  const nodes = useMemo(
    () => [
      [-0.72, 0.12, 0.05],
      [-0.24, 0.28, 0.05],
      [0.24, 0.1, 0.05],
      [0.72, 0.26, 0.05],
    ],
    []
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = 0.9 + Math.sin(t * 2.4 + i * 0.9) * 0.18;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group position={[0, 0, 0.06]}>
      <mesh>
        <planeGeometry args={[2.2, 1.35]} />
        <meshStandardMaterial color="#050a12" metalness={0.15} roughness={0.55} />
      </mesh>
      {/* subtle scan line */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.15, 0.02]} />
        <meshStandardMaterial color="#14b8a6" transparent opacity={0.25} />
      </mesh>
      {nodes.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            pulses.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial
            color={i === 2 ? '#c2410c' : '#14b8a6'}
            emissive={i === 2 ? '#9a3412' : '#0f766e'}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
      {[0, 1, 2].map((i) => {
        const a = new THREE.Vector3(...nodes[i]);
        const b = new THREE.Vector3(...nodes[i + 1]);
        const mid = a.clone().lerp(b, 0.5);
        const dir = b.clone().sub(a);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        return (
          <mesh key={`e-${i}`} position={mid.toArray()} quaternion={quat}>
            <cylinderGeometry args={[0.014, 0.014, len, 10]} />
            <meshStandardMaterial
              color="#1f6f68"
              emissive="#0f766e"
              emissiveIntensity={0.35}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Laptop({ reducedMotion }) {
  const group = useRef();

  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.32) * 0.1;
    group.current.position.y = Math.sin(t * 0.5) * 0.04;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.1}
      rotationIntensity={reducedMotion ? 0 : 0.12}
      floatIntensity={reducedMotion ? 0 : 0.35}
    >
      <group ref={group} position={[0, -0.35, 0]} rotation={[0.15, -0.35, 0]} scale={1.05}>
        {/* Base */}
        <mesh position={[0, 0, 0.2]} castShadow>
          <boxGeometry args={[2.8, 0.1, 1.85]} />
          <meshStandardMaterial color="#243044" metalness={0.7} roughness={0.25} />
        </mesh>
        {/* Keyboard deck */}
        <mesh position={[0, 0.07, 0.28]}>
          <boxGeometry args={[2.5, 0.03, 1.4]} />
          <meshStandardMaterial color="#0b1220" metalness={0.35} roughness={0.55} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.09, 0.72]}>
          <boxGeometry args={[0.85, 0.02, 0.5]} />
          <meshStandardMaterial color="#1a2333" metalness={0.4} roughness={0.4} />
        </mesh>
        {/* Lid + screen */}
        <group position={[0, 0.05, -0.7]} rotation={[-0.38, 0, 0]}>
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[2.8, 1.75, 0.08]} />
            <meshStandardMaterial color="#243044" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.85, 0.05]}>
            <boxGeometry args={[2.45, 1.5, 0.02]} />
            <meshStandardMaterial color="#050a12" metalness={0.2} roughness={0.5} />
          </mesh>
          <group position={[0, 0.85, 0.07]}>
            <PipelineScreen reducedMotion={reducedMotion} />
          </group>
        </group>
      </group>
    </Float>
  );
}

export default function HeroLaptop() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="h-[300px] w-full sm:h-[380px] lg:h-[460px]" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [3.6, 2.2, 4.8], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 7, 3]} intensity={1.2} />
        <pointLight position={[-2.5, 1.5, 2]} intensity={0.5} color="#14b8a6" />
        <Laptop reducedMotion={reducedMotion} />
        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.4}
          scale={12}
          blur={2.8}
          far={5}
        />
      </Canvas>
    </div>
  );
}
