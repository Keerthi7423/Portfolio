"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import ParticleField from "./ParticleField";
import CinematicEffects from "./CinematicEffects";

/**
 * MobileFallback: A high-fidelity CSS background for devices
 * that cannot handle heavy 3D rendering (R3F).
 */
const MobileFallback = () => (
  <div className="absolute inset-0 z-0 bg-void">
    {/* Decorative blur orbs */}
    <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-arc-blue/5 rounded-full blur-[100px]" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-marvel-red/5 rounded-full blur-[120px]" />
    
    {/* Cinematic noise texture */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
  </div>
);

/**
 * SceneLighting: Groups all light sources to keep the main Canvas clean.
 * Uses a mix of ambient, point, and spot lights for a cinematic feel.
 */
const SceneLighting = () => (
  <>
    <ambientLight intensity={0.3} />
    
    {/* Blue rim light */}
    <pointLight position={[10, 10, 10]} intensity={1.5} color="#4fc3f7" />
    
    {/* Red fill light */}
    <pointLight position={[-10, -10, -10]} intensity={0.8} color="#e23636" />
    
    {/* Gold focus light */}
    <spotLight 
      position={[0, 10, 0]} 
      intensity={2} 
      penumbra={1} 
      color="#c8a951" 
      angle={0.15}
    />
  </>
);

/**
 * StaticOverlays: Cinematic UI elements that sit on top of the 3D scene.
 */
const StaticOverlays = () => (
  <>
    {/* CRT-style scanlines */}
    <div className="absolute inset-0 pointer-events-none z-10 scanlines opacity-20" />
    
    {/* Deep space vignette */}
    <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-radial from-transparent via-transparent to-void/80" />
  </>
);

/**
 * HeroScene Component
 * The 3D foundation for the portfolio's Hero section.
 * Handles R3F Canvas setup, lighting, and mobile fallbacks.
 */
const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-void">
      {isMobile ? (
        <MobileFallback />
      ) : (
        <Suspense fallback={<div className="bg-void w-full h-full animate-pulse" />}>
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            {/* Background & Fog for Depth */}
            <color attach="background" args={["#040408"]} />
            <fog attach="fog" args={["#040408", 5, 20]} />
            
            <SceneLighting />
            
            {/* 3D Visual Elements */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ParticleField count={2500} />
            
            <CinematicEffects />
            
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          </Canvas>
        </Suspense>
      )}
      
      <StaticOverlays />
    </div>
  );
};

export default HeroScene;
