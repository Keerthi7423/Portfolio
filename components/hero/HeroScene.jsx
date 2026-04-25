"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import ParticleField from "./ParticleField";

/**
 * HeroScene Component
 * The 3D foundation for the portfolio's Hero section.
 * Handles R3F Canvas setup, lighting, and mobile fallbacks.
 */
const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Viewport Detection (Task 3.1)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-void">
      {/* 
        CSS Fallback for Mobile (Task 3.1)
        We use a high-fidelity gradient and noise for devices that shouldn't run heavy R3F
      */}
      {isMobile ? (
        <div className="absolute inset-0 z-0 bg-void">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-arc-blue/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-marvel-red/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        </div>
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
            {/* Environment & Fog for Depth */}
            <color attach="background" args={["#040408"]} />
            <fog attach="fog" args={["#040408", 5, 20]} />
            
            {/* Cinematic Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#4fc3f7" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#e23636" />
            <spotLight 
              position={[0, 10, 0]} 
              intensity={2} 
              penumbra={1} 
              color="#c8a951" 
              angle={0.15}
            />
            
            {/* 3D Elements */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ParticleField count={2500} />
            
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          </Canvas>
        </Suspense>
      )}
      
      {/* Cinematic UI Overlays (Global Scanlines & Vignette) */}
      <div className="absolute inset-0 pointer-events-none z-10 scanlines opacity-20" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-radial from-transparent via-transparent to-void/80" />
    </div>
  );
};

export default HeroScene;
