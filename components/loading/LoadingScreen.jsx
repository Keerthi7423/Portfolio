"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CONFIGURATION
 * Centralized settings for easy tweaking of the loading sequence.
 */
const LOADING_CONFIG = {
  DEVELOPER_NAME: "KEERTHI KUMAR V",
  SKIP_DELAY_MS: 1500,
  COMPLETION_DELAY_MS: 500,
  PROGRESS_INTERVAL_MS: 100,
  ANIMATION_DURATIONS: {
    LETTER_STAGGER: 0.05,
    FADE_IN: 0.8,
    METALLIC_SHIMMER: 3,
    OUTRO: 0.8,
  }
};

/**
 * SUB-COMPONENT: NameDisplay
 * Renders the developer's name with a letter-by-letter reveal and metallic shimmer.
 */
const NameDisplay = ({ textRef }) => {
  const letters = LOADING_CONFIG.DEVELOPER_NAME.split("");

  return (
    <div className="relative mb-12">
      <h1
        ref={textRef}
        className="text-hero flex gap-[0.1em] font-bebas tracking-wider"
        style={{
          background: "linear-gradient(90deg, #8892b0 0%, #ffffff 50%, #8892b0 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {letters.map((char, index) => (
          <span key={index} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-center font-orbitron text-xs tracking-[0.5em] text-stark-gold opacity-70 mt-2"
      >
        SYSTEM INITIALIZING...
      </motion.p>
    </div>
  );
};

/**
 * SUB-COMPONENT: ProgressBar
 * Visual representation of the system boot-up progress.
 */
const ProgressBar = ({ progress }) => (
  <div className="w-64 h-[2px] bg-border relative overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 h-full bg-marvel-red hologram-glow-red"
      style={{ width: `${progress}%` }}
    />
    {/* Shimmer Effect on bar */}
    <div className="absolute top-0 left-0 w-full h-full animate-shimmer opacity-30" />
  </div>
);

/**
 * SUB-COMPONENT: StatusGrid
 * Displays technical bits for flavor.
 */
const StatusGrid = () => (
  <div className="mt-4 font-mono text-[10px] text-text-tertiary flex gap-8 uppercase tracking-widest">
    <span>Link Start: OK</span>
    <span>Secure: 128-bit</span>
    <span>JARVIS: ONLINE</span>
  </div>
);

/**
 * SUB-COMPONENT: CornerBrackets
 * Decorative HUD brackets for the corners.
 */
const CornerBrackets = () => {
  const positions = [
    "top-8 left-8 border-t-2 border-l-2",
    "top-8 right-8 border-t-2 border-r-2",
    "bottom-8 left-8 border-b-2 border-l-2",
    "bottom-8 right-8 border-b-2 border-r-2"
  ];

  return (
    <>
      {positions.map((pos, idx) => (
        <div key={idx} className={`absolute w-8 h-8 border-border/30 ${pos}`} />
      ))}
    </>
  );
};

/**
 * MAIN COMPONENT: LoadingScreen
 * Orchestrates the full intro sequence.
 */
const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  // LOGIC: Mock progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for a "loading" feel
        return prev + Math.random() * 5;
      });
    }, LOADING_CONFIG.PROGRESS_INTERVAL_MS);

    // Show skip button after a short delay
    const skipTimeout = setTimeout(() => setShowSkip(true), LOADING_CONFIG.SKIP_DELAY_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimeout);
    };
  }, []);

  // ANIMATION: Final outro sequence
  const handleEndSequence = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(containerRef.current, {
      backgroundColor: "#e23636", // Flash red
      duration: 0.1,
    })
    .to(containerRef.current, {
      backgroundColor: "#040408",
      opacity: 0,
      scale: 1.5,
      duration: LOADING_CONFIG.ANIMATION_DURATIONS.OUTRO,
      ease: "power4.inOut",
    });
  }, [onComplete]);

  // TRIGGER: Complete when progress hits 100
  useEffect(() => {
    if (progress < 100) return;

    const timeout = setTimeout(handleEndSequence, LOADING_CONFIG.COMPLETION_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [progress, handleEndSequence]);

  // ANIMATION: Initial entrance and shimmer
  useEffect(() => {
    const letters = textRef.current.children;
    
    // 1. Reveal letters one by one
    gsap.set(letters, { opacity: 0, y: 20, filter: "blur(10px)" });
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: LOADING_CONFIG.ANIMATION_DURATIONS.FADE_IN,
      stagger: LOADING_CONFIG.ANIMATION_DURATIONS.LETTER_STAGGER,
      ease: "power3.out",
      delay: 0.5,
    });

    // 2. Continuous metallic shimmer
    gsap.to(textRef.current, {
      backgroundPosition: "200% center",
      duration: LOADING_CONFIG.ANIMATION_DURATIONS.METALLIC_SHIMMER,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void overflow-hidden scanlines noise-bg"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-marvel-red/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main UI Components */}
      <NameDisplay textRef={textRef} />
      <ProgressBar progress={progress} />
      <StatusGrid />

      {/* Skip Button Overlay */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleEndSequence}
            className="absolute bottom-12 font-chakra text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-marvel-red transition-colors border border-border px-4 py-2 bg-space/50 backdrop-blur-sm z-50"
          >
            Skip Sequence
          </motion.button>
        )}
      </AnimatePresence>

      <CornerBrackets />
    </div>
  );
};

export default LoadingScreen;
