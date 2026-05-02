"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { experiences } from "@/lib/experience-data";
import ExperienceCard from "./ExperienceCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background HUD elements animation
      gsap.to(".experience-hud", {
        rotate: 360,
        duration: 100,
        repeat: -1,
        ease: "none"
      });

      // Section title reveal
      gsap.from(".experience-title", {
        scrollTrigger: {
          trigger: ".experience-title",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-void"
    >
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="experience-hud absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20" />
        <div className="experience-hud absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-arc-blue/5 rounded-full opacity-20" style={{ animationDirection: 'reverse' }} />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="text-arc-blue font-orbitron text-xs md:text-sm tracking-[0.5em] uppercase mb-4">
              Mission Log: Alpha-7
            </span>
            <h2 className="experience-title text-display-sm md:text-display-md font-bebas text-white tracking-tighter mb-6">
              BATTLE <span className="text-marvel-red italic">HISTORY</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-marvel-red to-transparent rounded-full" />
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline SVG Spine */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 32 100"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Ghost Line (Background) */}
              <line
                x1="16"
                y1="0"
                x2="16"
                y2="100"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/5"
              />
              {/* Active Drawing Line */}
              <motion.line
                x1="16"
                y1="0"
                x2="16"
                y2="100"
                stroke="url(#timeline-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                }}
                className="filter drop-shadow-[0_0_8px_rgba(79,195,247,0.5)]"
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FC3F7" />
                  <stop offset="50%" stopColor="#E23636" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            {/* Interactive Nodes */}
            {experiences.map((_, index) => (
              <TimelineNode 
                key={index} 
                index={index} 
                total={experiences.length} 
                progress={scrollYProgress} 
              />
            ))}

            {/* Glowing Head of the line */}
            <motion.div
              className="absolute left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-arc-blue shadow-[0_0_15px_#4FC3F7]"
              style={{
                top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
              }}
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-arc-blue/50" />
            </motion.div>
          </div>

          {/* Experience Cards */}
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                index={index} 
                isLeft={index % 2 === 0} 
              />
            ))}
          </div>
        </div>

        {/* Section Footer Decorative */}
        <div className="mt-20 flex flex-col items-center justify-center opacity-30">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/10 to-transparent mb-6" />
          <p className="text-[10px] font-ibm-mono text-text-secondary tracking-[0.4em] uppercase">
            End of Current Mission Log
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * SUB-COMPONENT: TimelineNode
 * A glowing node that activates when the timeline scroll reaches it.
 */
const TimelineNode = ({ index, total, progress }) => {
  const position = (index / (total - 1)) * 100;
  
  // Activate when progress is near the node's position
  const isActive = useTransform(
    progress,
    [index / total, (index + 0.5) / total],
    [0, 1]
  );

  const scale = useSpring(useTransform(isActive, [0, 1], [0.8, 1.2]), {
    stiffness: 200,
    damping: 20
  });

  const opacity = useTransform(isActive, [0, 1], [0.3, 1]);

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 z-10"
      style={{ 
        top: `${position}%`,
        scale,
        opacity
      }}
    >
      <div className="w-full h-full rounded-full bg-void border-2 border-arc-blue shadow-[0_0_10px_rgba(79,195,247,0.3)]" />
      <motion.div 
        className="absolute inset-0 rounded-full bg-arc-blue"
        style={{ opacity: isActive }}
      />
      {/* Pulse effect when active */}
      <motion.div 
        className="absolute -inset-2 rounded-full border border-arc-blue/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ExperienceSection;
