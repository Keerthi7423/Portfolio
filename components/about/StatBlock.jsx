"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin for GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Theme configurations for different visual styles.
 * Each theme provides classes for borders, accents, and text colors.
 */
const THEMES = {
  "arc-blue": {
    border: "border-arc-blue/30",
    glow: "hologram-glow",
    accent: "bg-arc-blue",
    text: "text-arc-blue",
  },
  "marvel-red": {
    border: "border-marvel-red/30",
    glow: "hologram-glow-red",
    accent: "bg-marvel-red",
    text: "text-marvel-red",
  },
};

const StatBlock = ({ label, value, suffix = "", delay = 0, color = "arc-blue" }) => {
  const containerRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // gsap.context helps clean up animations when the component unmounts
    const ctx = gsap.context(() => {
      
      // 1. Entrance Animation: Fades in and slides up
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // 2. Number Counter Animation: Increments from 0 to target value
      const animationState = { val: 0 };
      gsap.to(animationState, {
        val: value,
        duration: 2,
        delay: delay + 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => setDisplayValue(Math.floor(animationState.val)),
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, delay]);

  // Select the appropriate theme or default to arc-blue
  const theme = THEMES[color] || THEMES["arc-blue"];
  
  // Format the number to always show at least two digits (e.g., 05 instead of 5)
  const formattedValue = displayValue.toString().padStart(2, "0");

  return (
    <div 
      ref={containerRef}
      className={`bg-void/90 backdrop-blur-xl border ${theme.border} ${theme.glow} p-5 min-w-[160px] relative overflow-hidden group`}
    >
      {/* Subtle background glow decoration */}
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-5 -mr-8 -mt-8 rounded-full ${theme.accent}`} />
      
      {/* Header with Label and Status Dot */}
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className={`text-[10px] font-orbitron ${theme.text} tracking-widest uppercase`}>
          {label}
        </div>
        <div className={`w-1.5 h-1.5 ${theme.accent} group-hover:animate-pulse`} />
      </div>
      
      {/* Main Value Display */}
      <div className="text-4xl font-bebas text-white tracking-wider relative z-10">
        {formattedValue}
        <span className={`${theme.text} text-2xl ml-1`}>{suffix}</span>
      </div>
      
      {/* Decorative technical footer text */}
      <div className="text-[9px] font-mono text-text-tertiary mt-1 uppercase tracking-tighter relative z-10">
        Authenticating Data...
      </div>

      {/* Aesthetic corner brackets */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${theme.border}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${theme.border}`} />
    </div>
  );
};

export default StatBlock;
