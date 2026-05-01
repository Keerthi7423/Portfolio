"use client";

import { useState, useMemo } from "react";
import { Vector2 } from "three";
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  Vignette, 
  Noise 
} from "@react-three/postprocessing";
import { PerformanceMonitor } from "@react-three/drei";

/**
 * EFFECT_CONFIG: Centralized visual settings for the cinematic post-processing stack.
 * Having these as constants makes it easier for developers to tweak the "vibe" 
 * without diving into the component logic.
 */
const EFFECT_CONFIG = {
  bloom: {
    luminanceThreshold: 0.2,
    luminanceSmoothing: 0.9,
    height: 300,
    intensity: {
      high: 1.5,
      performance: 0.5,
    },
  },
  vignette: {
    offset: 0.1,
    darkness: 1.1,
    eskil: false,
  },
  noise: {
    opacity: 0.05,
  },
  chromaticAberration: {
    offset: new Vector2(0.002, 0.002), // Static offset for edge fringing
    modulationOffset: 0.5,
  }
};

/**
 * CinematicEffects: Handles the visual polish and performance auto-scaling.
 * It uses a PerformanceMonitor to detect hardware struggle and simplify effects.
 */
const CinematicEffects = () => {
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);

  // Helper functions to handle performance scaling
  const enablePerformanceMode = () => setIsPerformanceMode(true);
  const disablePerformanceMode = () => setIsPerformanceMode(false);

  const bloomIntensity = isPerformanceMode 
    ? EFFECT_CONFIG.bloom.intensity.performance 
    : EFFECT_CONFIG.bloom.intensity.high;

  return (
    <>
      {/* Automatically scales visual quality based on frame rate */}
      <PerformanceMonitor 
        onDecline={enablePerformanceMode} 
        onIncline={disablePerformanceMode}
      />

      <EffectComposer disableNormalPass>
        {/* Adds "glow" to emissive materials for the Stark-tech look */}
        <Bloom 
          intensity={bloomIntensity} 
          luminanceThreshold={EFFECT_CONFIG.bloom.luminanceThreshold} 
          luminanceSmoothing={EFFECT_CONFIG.bloom.luminanceSmoothing} 
          height={EFFECT_CONFIG.bloom.height} 
        />

        {/* Adds color fringing at screen edges - disabled in performance mode */}
        {!isPerformanceMode && (
          <ChromaticAberration
            offset={EFFECT_CONFIG.chromaticAberration.offset}
            radialModulation={true}
            modulationOffset={EFFECT_CONFIG.chromaticAberration.modulationOffset}
          />
        )}

        {/* Darkens edges to focus attention on the center */}
        <Vignette 
          eskil={EFFECT_CONFIG.vignette.eskil} 
          offset={EFFECT_CONFIG.vignette.offset} 
          darkness={EFFECT_CONFIG.vignette.darkness} 
        />

        {/* Subtle film grain to prevent color banding */}
        <Noise opacity={EFFECT_CONFIG.noise.opacity} />
      </EffectComposer>
    </>
  );
};

export default CinematicEffects;
