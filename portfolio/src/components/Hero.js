import React, { useRef, useState, useEffect, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 50px;
`;

const Title = styled.h1`
  font-size: 64px;
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
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.gap.medium};
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
  height: 500px;
  position: relative;
  overflow: visible;
`;

function Car() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 1;
  });

  return (
    <mesh ref={meshRef} position={[0, -1, 0]} scale={0.8}>
      <boxGeometry args={[4, 1, 2]} />
      <meshStandardMaterial 
        color="#ff3333"
        metalness={0.8}
        roughness={0.2}
        emissive="#ff3333"
        emissiveIntensity={0.2}
      />
      
      {/* Wheels */}
      <group position={[-1, -0.5, 1]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      <group position={[1, -0.5, 1]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      <group position={[-1, -0.5, -1]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      <group position={[1, -0.5, -1]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Roof */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial 
          color="#ff3333"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff3333"
          emissiveIntensity={0.2}
        />
      </mesh>
    </mesh>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Full Stack Developer",
    "DevOps Engineer",
    "Backend Engineer",
    "Frontend Engineer"
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
          camera={{ position: [5, 2, 5], fov: 50 }}
          style={{ position: 'relative' }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.2} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1}
            castShadow
          />
          <spotLight 
            position={[-10, -10, -10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={0.5}
          />
          <Suspense fallback={null}>
            <Car />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            dampingFactor={0.05}
            enableDamping={true}
          />
          <EffectComposer>
            <Bloom 
              intensity={0.5}
              radius={0.7}
              luminanceThreshold={0.1}
            />
          </EffectComposer>
        </Canvas>
      </ModelContainer>
    </HeroContainer>
  );
}

export default Hero;