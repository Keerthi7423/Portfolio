"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  // Mock progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    // Show skip button after 1.5s
    const timeout = setTimeout(() => {
      setShowSkip(true);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleEnd = React.useCallback(() => {
    // Final pulse/flash animation
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.to(containerRef.current, {
      backgroundColor: "#e23636",
      duration: 0.1,
    })
      .to(containerRef.current, {
        backgroundColor: "#040408",
        opacity: 0,
        scale: 1.5,
        duration: 0.8,
        ease: "power4.inOut",
      });
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 100) {
      // Delay slightly before completing to show 100%
      const timeout = setTimeout(() => {
        handleEnd();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, handleEnd]);

  useEffect(() => {
    // Letter-by-letter animation
    const letters = textRef.current.children;
    gsap.set(letters, { opacity: 0, y: 20, filter: "blur(10px)" });

    gsap.to(letters, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      delay: 0.5,
    });

    // Metallic shimmer effect
    gsap.to(textRef.current, {
      backgroundPosition: "200% center",
      duration: 3,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const name = "STARK INDUSTRIES"; // Or developer name

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void overflow-hidden scanlines noise-bg"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-marvel-red/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Name Assembly */}
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
          {name.split("").map((char, index) => (
            <span key={index} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center font-orbitron text-xs tracking-[0.5em] text-stark-gold opacity-70 mt-2"
        >
          SYSTEM INITIALIZING...
        </motion.p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 h-[2px] bg-border relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-marvel-red hologram-glow-red"
          style={{ width: `${progress}%` }}
        />
        {/* Shimmer Effect on bar */}
        <div className="absolute top-0 left-0 w-full h-full animate-shimmer opacity-30" />
      </div>

      {/* Stats / Bits of data */}
      <div className="mt-4 font-mono text-[10px] text-text-tertiary flex gap-8 uppercase tracking-widest">
        <span>Link Start: OK</span>
        <span>Secure: 128-bit</span>
        <span>JARVIS: ONLINE</span>
      </div>

      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleEnd}
            className="absolute bottom-12 font-chakra text-[10px] tracking-[0.2em] uppercase text-text-secondary hover:text-marvel-red transition-colors border border-border px-4 py-2 bg-space/50 backdrop-blur-sm"
          >
            Skip Sequence
          </motion.button>
        )}
      </AnimatePresence>

      {/* Corner Brackets aesthetics */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-border/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-right-2 border-border/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-border/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-right-2 border-border/30" />
    </div>
  );
};

export default LoadingScreen;
