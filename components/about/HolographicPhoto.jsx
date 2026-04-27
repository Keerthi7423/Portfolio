"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HolographicPhoto = () => {
  return (
    <div className="relative w-full h-full group">
      {/* Photo Frame with holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-raised/80 to-void border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:border-arc-blue/30">
        
        {/* The Developer Image */}
        <div className="relative w-full h-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105">
          <Image 
            src="/images/developer.png" 
            alt="Developer Portrait" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Holographic Overlays */}
          <div className="absolute inset-0 bg-arc-blue/5 mix-blend-color pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
        </div>

        {/* Glitch / Noise Overlay (visible on hover) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none overflow-hidden z-20">
          <div className="absolute inset-0 bg-marvel-red mix-blend-overlay animate-pulse" />
          <div className="absolute inset-0 noise-bg" />
        </div>
        
        {/* HUD Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-arc-blue z-30 transition-all duration-300 group-hover:w-12 group-hover:h-12" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-arc-blue z-30 transition-all duration-300 group-hover:w-12 group-hover:h-12" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-arc-blue z-30 transition-all duration-300 group-hover:w-12 group-hover:h-12" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-arc-blue z-30 transition-all duration-300 group-hover:w-12 group-hover:h-12" />

        {/* Animated Scanline for Photo */}
        <div className="absolute inset-0 w-full h-[2px] bg-arc-blue/30 top-[-2px] animate-[scan_4s_linear_infinite] z-40 pointer-events-none" />

        {/* Grid Overlay on photo */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(79,195,247,0.15)_1px,transparent_1px)] bg-[size:30px_30px] z-10 pointer-events-none" />

        {/* HUD Text Overlays */}
        <div className="absolute top-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-orbitron text-[8px] text-arc-blue tracking-widest leading-loose">
          [ AUTHENTICATED ]<br/>
          LEVEL 5 CLEARANCE
        </div>
        
        <div className="absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-orbitron text-[8px] text-arc-blue tracking-widest text-right leading-loose">
          COORDINATES: 40.7128° N, 74.0060° W<br/>
          STARK INDUSTRIES SECURE LINK
        </div>
      </div>

      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-arc-blue/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

      <style jsx>{`
        @keyframes scan {
          0% { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HolographicPhoto;
