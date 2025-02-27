import React, { useRef, useState, useEffect, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 95vh;
  gap: 2rem;
  padding-top: 0;
  margin-top: -35px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 35px;
    height: 100vh;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 50px;
  margin-top: -25px;

  @media (max-width: 1024px) {
    padding-right: 0;
    margin-bottom: 2rem;
    margin-top: 0;
  }
`;

const Title = styled.h1`
  font-size: clamp(48px, 7vw, 82px);
  margin-bottom: ${({ theme }) => theme.spacing.gap.small};
  background: ${({ theme }) => theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const fadeInOut = keyframes`
  0% { 
    opacity: 1; 
    transform: translateY(0); 
  }
  15% { 
    opacity: 0.3; 
    transform: translateY(-20px); 
  }
  20% { 
    opacity: 0; 
    transform: translateY(-25px); 
  }
  25% { 
    opacity: 0.3; 
    transform: translateY(20px); 
  }
  40% { 
    opacity: 1; 
    transform: translateY(0); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const Subtitle = styled.p`
  font-size: clamp(24px, 3vw, 32px);
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.gap.medium};
  max-width: 800px;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const AnimatedSpan = styled.span`
  display: inline-block;
  animation: ${fadeInOut} 8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  position: relative;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const ModelContainer = styled.div`
  flex: 1;
  height: clamp(400px, 60vh, 800px);
  position: relative;
  overflow: visible;
  margin-top: -25px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    margin-top: -15px;
  }
`;

const LaptopBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 600px;
  opacity: 0.15;  // Reduced opacity
  mix-blend-mode: soft-light;  // Better blending with background
  background-image: url('/laptop.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(1.2) contrast(0.8);  // Soften the image
  z-index: 0;

  @media (max-width: 768px) {
    width: 100%;
    opacity: 0.1;  // Even more subtle on mobile
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.background};
    opacity: 0.3;
    mix-blend-mode: color;
  }
`;

// Make sure the content is above the background
const Content = styled.div`
  position: relative;
  z-index: 1;
`;

function Computer() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.5;
  });

  const scale = window.innerWidth > 1024 ? 1.6 : 
                window.innerWidth > 768 ? 1.3 : 1.0;

  return (
    <group position={[0, -0.5, 0]}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={scale}>
        {/* Laptop Base */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[3, 0.2, 2]} />
          <meshStandardMaterial 
            color="#24283b"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Laptop Screen */}
        <group position={[0, 0.7, -0.9]} rotation={[0.3, 0, 0]}>
          <mesh>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial 
              color="#24283b"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Screen Display */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial 
              color="#7aa2f7"
              emissive="#7aa2f7"
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Keyboard Area */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[2.8, 0.1, 1.6]} />
          <meshStandardMaterial 
            color="#1a1b26"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </mesh>

      {/* Update particle colors */}
      {[...Array(30)].map((_, i) => (
        <mesh
          key={`upper-${i}`}
          position={[
            (Math.random() - 0.5) * (8 * scale),
            Math.random() * (4 * scale),
            (Math.random() - 0.5) * (8 * scale)
          ]}
          scale={0.12 * scale}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#7aa2f7"
            emissive="#7aa2f7"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Lower particles with updated colors */}
      {[...Array(30)].map((_, i) => (
        <mesh
          key={`lower-${i}`}
          position={[
            (Math.random() - 0.5) * (7 * scale),
            (Math.random() - 1) * (2 * scale) - 0.5,
            (Math.random() - 0.5) * (7 * scale)
          ]}
          scale={0.11 * scale}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#7aa2f7"
            emissive="#7aa2f7"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Student"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <HeroContent>
        <Title>Hi, I'm Ashwin</Title>
        <Subtitle>
          A <AnimatedSpan>{roles[roleIndex]}</AnimatedSpan> passionate about creating innovative solutions
        </Subtitle>
      </HeroContent>
      <ModelContainer>
        <Canvas 
          camera={{ 
            position: window.innerWidth > 1024 ? [9, 4, 9] : [7, 3, 7], 
            fov: 50 
          }}
          style={{ position: 'relative' }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#1a1b26']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Computer />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
          <EffectComposer>
            <Bloom 
              intensity={0.5}
              luminanceThreshold={0.7}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Canvas>
      </ModelContainer>
    </HeroContainer>
  );
}

export default Hero;