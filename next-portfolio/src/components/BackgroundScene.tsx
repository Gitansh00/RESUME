"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

function ScrollReactiveModels() {
  const mainRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useFrame((state) => {
    const scrollY = scrollRef.current;
    
    if (mainRef.current) {
      // Auto-rotation + dynamic scroll-based rotation (spins faster when scrolling!)
      mainRef.current.rotation.y = state.clock.getElapsedTime() * 0.1 + (scrollY * 0.003);
      mainRef.current.rotation.x = state.clock.getElapsedTime() * 0.05 + (scrollY * 0.002);
      
      // Scroll Parallax: The gem floats UP slightly as you scroll down
      const targetY = (state.pointer.y * state.viewport.height) / 10 + (scrollY * 0.003);
      mainRef.current.position.y = THREE.MathUtils.lerp(mainRef.current.position.y, targetY, 0.05);
      
      // Mouse tracking X
      mainRef.current.position.x = THREE.MathUtils.lerp(mainRef.current.position.x, (state.pointer.x * state.viewport.width) / 10 + 2, 0.02);
    }

    if (ringRef.current) {
      // The ring rotates wildly on scroll and shifts in the opposite direction
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + (scrollY * -0.005);
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + (scrollY * 0.004);
      
      const targetRingY = (state.pointer.y * state.viewport.height) / 15 + 2 + (scrollY * -0.005);
      ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, targetRingY, 0.05);
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
      {/* Main Abstract Gem */}
      <Icosahedron ref={mainRef} args={[2.2, 0]} position={[2, 0, -2]}>
        <MeshTransmissionMaterial 
          thickness={1.5} 
          roughness={0.1} 
          transmission={1} 
          ior={1.4} 
          chromaticAberration={0.08} 
          backside 
          resolution={512}
          color="#d5e8f0"
        />
      </Icosahedron>
      
      {/* Floating Glass Ring */}
      <Torus ref={ringRef} args={[1.8, 0.3, 16, 100]} position={[-3, 1, -4]}>
        <MeshTransmissionMaterial 
          thickness={0.5} 
          roughness={0.2} 
          transmission={0.9} 
          ior={1.2} 
          color="#204287" 
        />
      </Torus>
    </Float>
  );
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#0a0f1a] overflow-hidden pointer-events-none">
      {/* Noise Texture for Cinematic Feel */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
      
      {/* Ambient Animated Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#204287]/30 blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-30%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#bcd3e9]/10 blur-[150px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_alternate]"></div>
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[#d5e8f0]/5 blur-[100px] mix-blend-screen"></div>

      {/* R3F 3D Scene */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="absolute inset-0">
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#edf6fd" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#204287" />
        <Environment preset="city" />
        <ScrollReactiveModels />
      </Canvas>
    </div>
  );
}
