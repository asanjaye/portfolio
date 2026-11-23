import { Component, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const BG = '#0B1220';
const TEAL = '#14b8a6';
const AMBER = '#f97316';
const SILVER = '#94a3b8';
const CANVAS_H =
  'h-[300px] w-full sm:h-[380px] lg:h-[460px]';

const STAGES = [
  {
    id: 'intake',
    name: 'Intake',
    role: 'Validated signals enter the workflow.',
    position: [-1.7, 0.05, 0.12],
    color: TEAL,
    emissive: '#0f766e',
    shape: 'box',
  },
  {
    id: 'llm',
    name: 'LLM Reasoning',
    role: 'Structured model decisions and summaries.',
    position: [-0.55, 0.32, -0.08],
    color: TEAL,
    emissive: '#0d9488',
    shape: 'octa',
  },
  {
    id: 'human',
    name: 'Human Gate',
    role: 'Nothing proceeds without recorded approval.',
    position: [0.55, 0.08, 0.14],
    color: AMBER,
    emissive: '#c2410c',
    shape: 'cylinder',
  },
  {
    id: 'action',
    name: 'Action & Audit',
    role: 'Approved actions execute with a durable log.',
    position: [1.7, 0.28, -0.06],
    color: SILVER,
    emissive: '#64748b',
    shape: 'box',
  },
];

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
}

function makeCurve(a, b, lift = 0.55, sway = 0.2) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const mid = start.clone().lerp(end, 0.5);
  mid.y += lift;
  mid.z += sway;
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

function StageNode({ stage, selected, hovered, onSelect, onHover, reducedMotion }) {
  const ref = useRef();
  const ring = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = selected || hovered ? 1.08 : 1;
    const breathe = reducedMotion ? 0 : Math.sin(t * 2 + stage.position[0]) * 0.03;
    ref.current.scale.setScalar(pulse + breathe);
    if (ring.current && !reducedMotion) {
      ring.current.rotation.z = t * (stage.id === 'human' ? 0.7 : 0.35);
      ring.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  const geometry =
    stage.shape === 'octa' ? (
      <octahedronGeometry args={[0.38, 0]} />
    ) : stage.shape === 'cylinder' ? (
      <cylinderGeometry args={[0.32, 0.32, 0.55, 28]} />
    ) : (
      <boxGeometry args={[0.62, 0.62, 0.62]} />
    );

  return (
    <group position={stage.position}>
      <mesh
        ref={ref}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect(stage.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(stage.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'default';
        }}
      >
        {geometry}
        <meshPhysicalMaterial
          color={stage.color}
          metalness={0.55}
          roughness={0.22}
          emissive={stage.emissive}
          emissiveIntensity={selected || hovered ? 0.85 : 0.45}
          clearcoat={0.55}
          clearcoatRoughness={0.25}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.55, 0.018, 12, 64]} />
        <meshStandardMaterial
          color={stage.color}
          emissive={stage.emissive}
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
      {(selected || hovered) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.78, 48]} />
          <meshBasicMaterial color={stage.color} transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function Conduit({ curve, color, reducedMotion }) {
  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 48, 0.028, 12, false),
    [curve]
  );

  return (
    <mesh geometry={tube}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={reducedMotion ? 0.2 : 0.35}
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function SignalPacket({ curve, delay, color, reducedMotion }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    const t = (state.clock.elapsedTime * 0.28 + delay) % 1;
    const p = curve.getPointAt(t);
    ref.current.position.copy(p);
    const s = 0.75 + Math.sin(state.clock.elapsedTime * 6 + delay * 10) * 0.25;
    ref.current.scale.setScalar(s);
  });

  if (reducedMotion) return null;

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        metalness={0.2}
        roughness={0.15}
      />
    </mesh>
  );
}

function OrchestrationCore({ selectedId, hoveredId, onSelect, onHover, reducedMotion }) {
  const curves = useMemo(
    () => [
      makeCurve(STAGES[0].position, STAGES[1].position, 0.6, 0.28),
      makeCurve(STAGES[1].position, STAGES[2].position, 0.45, -0.22),
      makeCurve(STAGES[2].position, STAGES[3].position, 0.55, 0.18),
    ],
    []
  );

  return (
    <Float
      speed={reducedMotion ? 0 : 0.9}
      rotationIntensity={reducedMotion ? 0 : 0.08}
      floatIntensity={reducedMotion ? 0 : 0.2}
    >
      <group position={[0, -0.05, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]} receiveShadow>
          <circleGeometry args={[2.8, 64]} />
          <meshStandardMaterial
            color="#111827"
            metalness={0.6}
            roughness={0.45}
            transparent
            opacity={0.55}
          />
        </mesh>

        {STAGES.map((stage) => (
          <StageNode
            key={stage.id}
            stage={stage}
            selected={selectedId === stage.id}
            hovered={hoveredId === stage.id}
            onSelect={onSelect}
            onHover={onHover}
            reducedMotion={reducedMotion}
          />
        ))}

        {curves.map((curve, i) => {
          const color = STAGES[i + 1].id === 'human' ? AMBER : TEAL;
          return (
            <group key={`c-${i}`}>
              <Conduit curve={curve} color={color} reducedMotion={reducedMotion} />
              <SignalPacket curve={curve} delay={i * 0.22} color={color} reducedMotion={reducedMotion} />
              <SignalPacket curve={curve} delay={i * 0.22 + 0.5} color={color} reducedMotion={reducedMotion} />
            </group>
          );
        })}
      </group>
    </Float>
  );
}

function Scene({ selectedId, hoveredId, setSelectedId, setHoveredId, reducedMotion }) {
  const controls = useRef();

  useFrame(() => {
    // Pause auto-rotate while user is dragging via OrbitControls state
    if (controls.current) {
      controls.current.autoRotate = !reducedMotion && !controls.current._isDragging;
    }
  });

  return (
    <>
      <fog attach="fog" args={[BG, 10, 22]} />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#dbeafe', '#0B1220', 0.55]} />
      <directionalLight
        position={[4.5, 6.5, 3]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 2.2, 2]} intensity={1.1} color={TEAL} />
      <pointLight position={[2.2, 1.8, 2.4]} intensity={1.2} color={AMBER} />
      <pointLight position={[0, -1.5, -2]} intensity={0.4} color="#64748b" />

      <OrchestrationCore
        selectedId={selectedId}
        hoveredId={hoveredId}
        onSelect={setSelectedId}
        onHover={setHoveredId}
        reducedMotion={reducedMotion}
      />
      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.4}
        scale={12}
        blur={2.6}
        far={6}
      />
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.55}
        target={[0, 0.15, 0]}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.9}
        onStart={(e) => {
          e.target._isDragging = true;
        }}
        onEnd={(e) => {
          e.target._isDragging = false;
        }}
      />
    </>
  );
}

function FallbackArt() {
  return (
    <div className={`${CANVAS_H} flex items-center justify-center bg-[#0B1220] px-6`}>
      <svg viewBox="0 0 360 160" className="w-full max-w-md" aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <path
          d="M40 90 C 90 40, 130 40, 170 80 S 250 130, 320 70"
          fill="none"
          stroke="url(#g)"
          strokeWidth="3"
          strokeDasharray="6 8"
        />
        {[
          [40, 90, '#14b8a6'],
          [140, 55, '#14b8a6'],
          [230, 105, '#f97316'],
          [320, 70, '#94a3b8'],
        ].map(([x, y, c]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="12" fill={c} opacity="0.9" />
            <circle cx={x} cy={y} r="18" fill="none" stroke={c} opacity="0.45" />
          </g>
        ))}
      </svg>
    </div>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function HeroLaptop() {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState('human');
  const [hoveredId, setHoveredId] = useState(null);
  const activeId = hoveredId || selectedId;
  const active = STAGES.find((s) => s.id === activeId) || STAGES[2];

  return (
    <div className="relative overflow-hidden rounded-[1.15rem] bg-[#0B1220]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4 sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-300/80">
          Active stage
        </p>
        <p className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
          {active.name}
        </p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-300 sm:text-sm">
          {active.role}
        </p>
      </div>

      <ErrorBoundary fallback={<FallbackArt />}>
        <div className={`${CANVAS_H} bg-transparent`}>
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [0, 1.55, 8.1], fov: 34 }}
            gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
            style={{ background: 'transparent' }}
            shadows
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
            onPointerMissed={() => setHoveredId(null)}
          >
            <Scene
              selectedId={selectedId}
              hoveredId={hoveredId}
              setSelectedId={setSelectedId}
              setHoveredId={setHoveredId}
              reducedMotion={reducedMotion}
            />
          </Canvas>
        </div>
      </ErrorBoundary>

      <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
        Drag to orbit · click a stage · human gate highlighted
      </p>
    </div>
  );
}
