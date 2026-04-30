"use client";

import Image from "next/image";

/**
 * A small helper component for the HUD corners.
 * Reduces repetition and makes the layout easier to scan.
 */
const CornerHUD = ({ positionClass }) => (
  <div className={`absolute w-8 h-8 border-arc-blue z-30 transition-all duration-300 group-hover:w-12 group-hover:h-12 ${positionClass}`} />
);

/**
 * A small helper for the technical-looking text overlays.
 */
const HUDText = ({ className, children }) => (
  <div className={`absolute z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-orbitron text-[8px] text-arc-blue tracking-widest leading-loose ${className}`}>
    {children}
  </div>
);

const HolographicPhoto = () => {
  return (
    <div className="relative w-full h-full group">
      
      {/* 1. Main Frame Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-raised/80 to-void border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:border-arc-blue/30">
        
        {/* 2. Developer Image with Hover Effects */}
        <div className="relative w-full h-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105">
          <Image 
            src="/images/developer.png" 
            alt="Developer Portrait" 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Holographic Tint Overlays */}
          <div className="absolute inset-0 bg-arc-blue/5 mix-blend-color pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
        </div>

        {/* 3. Visual Effects (Glitch & Scanlines) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none overflow-hidden z-20">
          <div className="absolute inset-0 bg-marvel-red mix-blend-overlay animate-pulse" />
          <div className="absolute inset-0 noise-bg" />
        </div>
        
        {/* Animated Scanline bar */}
        <div className="absolute inset-0 w-full h-[2px] bg-arc-blue/30 top-[-2px] animate-[scan_4s_linear_infinite] z-40 pointer-events-none" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(79,195,247,0.15)_1px,transparent_1px)] bg-[size:30px_30px] z-10 pointer-events-none" />

        {/* 4. HUD Interface Elements */}
        <CornerHUD positionClass="top-0 left-0 border-t-2 border-l-2" />
        <CornerHUD positionClass="top-0 right-0 border-t-2 border-r-2" />
        <CornerHUD positionClass="bottom-0 left-0 border-b-2 border-l-2" />
        <CornerHUD positionClass="bottom-0 right-0 border-b-2 border-r-2" />

        <HUDText className="top-6 left-6">
          [ AUTHENTICATED ]<br/>
          LEVEL 5 CLEARANCE
        </HUDText>
        
        <HUDText className="bottom-6 right-6 text-right">
          COORDINATES: 40.7128° N, 74.0060° W<br/>
          STARK INDUSTRIES SECURE LINK
        </HUDText>
      </div>

      {/* 5. Outer Glow Effect */}
      <div className="absolute -inset-4 bg-arc-blue/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

      {/* Animation Keyframes */}
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
