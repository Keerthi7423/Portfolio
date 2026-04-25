"use client";

import { useState } from "react";
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  Vignette, 
  Noise 
} from "@react-three/postprocessing";
import { PerformanceMonitor } from "@react-three/drei";
import { Vector2 } from "three";

/**
 * CinematicEffects Component
 * Implements Task 3.4: Post-Processing & Bloom.
 * Handles visual polish and performance-based auto-degradation.
 */
const CinematicEffects = () => {
  const [degraded, setDegraded] = useState(false);

  return (
    <>
      {/* 
        Performance Monitor
        Automatically detects if the user's hardware is struggling (low FPS).
        If FPS drops below threshold, we set 'degraded' to true to simplify effects.
      */}
      <PerformanceMonitor 
        onDecline={() => setDegraded(true)} 
        onIncline={() => setDegraded(false)}
      />

      <EffectComposer disableNormalPass>
        {/* 
          Bloom Effect: Creates the "glow" on emissive materials.
          Essential for the Stark/Iron Man HUD aesthetic.
        */}
        <Bloom 
          intensity={degraded ? 0.5 : 1.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          height={300} 
        />

        {/* 
          Chromatic Aberration: Simulates lens distortion (color fringing at edges).
          Adds a cinematic, slightly technological glitch feel.
        */}
        {!degraded && (
          <ChromaticAberration
            offset={new Vector2(0.002, 0.002)}
            radialModulation={true}
            modulationOffset={0.5}
          />
        )}

        {/* 
          Vignette: Darkens the edges of the screen to focus attention on the center.
        */}
        <Vignette 
          eskil={false} 
          offset={0.1} 
          darkness={1.1} 
        />

        {/* 
          Noise: Adds subtle film grain to prevent color banding and add texture.
        */}
        <Noise opacity={0.05} />
      </EffectComposer>
    </>
  );
};

export default CinematicEffects;
