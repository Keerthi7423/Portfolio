"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatBlock = ({ label, value, suffix = "", delay = 0, color = "arc-blue" }) => {
  const numberRef = useRef(null);
  const containerRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
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

      const target = { val: 0 };
      gsap.to(target, {
        val: value,
        duration: 2,
        delay: delay + 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(target.val));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, delay]);

  const colorClass = color === "arc-blue" ? "border-arc-blue/30 hologram-glow" : "border-marvel-red/30 hologram-glow-red";
  const accentClass = color === "arc-blue" ? "bg-arc-blue" : "bg-marvel-red";
  const textAccentClass = color === "arc-blue" ? "text-arc-blue" : "text-marvel-red";

  return (
    <div 
      ref={containerRef}
      className={`bg-void/90 backdrop-blur-xl border ${colorClass} p-5 min-w-[160px] relative overflow-hidden group`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-5 -mr-8 -mt-8 rounded-full ${accentClass}`} />
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <div className={`text-[10px] font-orbitron ${textAccentClass} tracking-widest uppercase`}>{label}</div>
        <div className={`w-1.5 h-1.5 ${accentClass} group-hover:animate-pulse`} />
      </div>
      
      <div className="text-4xl font-bebas text-white tracking-wider relative z-10">
        {displayValue.toString().padStart(2, '0')}
        <span className={`${textAccentClass} text-2xl ml-1`}>{suffix}</span>
      </div>
      
      <div className="text-[9px] font-mono text-text-tertiary mt-1 uppercase tracking-tighter relative z-10">
        Authenticating Data...
      </div>

      {/* Decorative corner brackets */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${colorClass.split(' ')[0]}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${colorClass.split(' ')[0]}`} />
    </div>
  );
};

export default StatBlock;
