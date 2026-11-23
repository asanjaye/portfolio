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
  const group = useRef();
  const nodes = useMemo(
    () => [
      [-0.55, 0.18, 0.02],
      [-0.18, 0.32, 0.02],
      [0.18, 0.18, 0.02],
      [0.55, 0.3, 0.02],
    ],
    []
  );

  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      if (child.userData?.pulse) {
        const s = 0.85 + Math.sin(t * 2.2 + i) * 0.15;
        child.scale.setScalar(s);
      }
    });
  });

  return (
    <group ref={group} position={[0, 0.55, -0.72]} rotation={[0.28, 0, 0]}>
      <mesh position={[0, 0.05, 0]}>
        <planeGeometry args={[2.35, 1.45]} />
        <meshStandardMaterial color="#071018" metalness={0.2} roughness={0.45} />
      </mesh>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos} userData={{ pulse: true }}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={i === 2 ? '#c2410c' : '#14b8a6'}
            emissive={i === 2 ? '#c2410c' : '#0f766e'}
            emissiveIntensity={0.55}
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
            <cylinderGeometry args={[0.012, 0.012, len, 8]} />
            <meshStandardMaterial color="#1f6f68" emissive="#0f766e" emissiveIntensity={0.25} />
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
    group.current.rotation.y = Math.sin(t * 0.35) * 0.12;
    group.current.position.y = Math.sin(t * 0.55) * 0.05;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.2}
      rotationIntensity={reducedMotion ? 0 : 0.15}
      floatIntensity={reducedMotion ? 0 : 0.4}
    >
      <group ref={group} position={[0, -0.15, 0]} scale={1.15}>
        <mesh position={[0, -0.05, 0.15]} castShadow>
          <boxGeometry args={[2.6, 0.12, 1.7]} />
          <meshStandardMaterial color="#1c2738" metalness={0.65} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.01, 0.2]}>
          <boxGeometry args={[2.35, 0.02, 1.35]} />
          <meshStandardMaterial color="#0b1220" metalness={0.4} roughness={0.5} />
        </mesh>
        <group position={[0, 0.55, -0.72]} rotation={[0.28, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.6, 1.65, 0.08]} />
            <meshStandardMaterial color="#1c2738" metalness={0.65} roughness={0.28} />
          </mesh>
        </group>
        <PipelineScreen reducedMotion={reducedMotion} />
      </group>
    </Float>
  );
}

export default function HeroLaptop() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="h-[340px] w-full sm:h-[420px] lg:h-[520px]" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [4.2, 2.4, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 8, 4]} intensity={1.15} />
        <pointLight position={[-3, 2, 2]} intensity={0.45} color="#14b8a6" />
        <Laptop reducedMotion={reducedMotion} />
        <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}
