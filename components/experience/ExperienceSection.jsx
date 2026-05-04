"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { experiences } from "@/lib/experience-data";
import ExperienceCard from "./ExperienceCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

/**
 * SUB-COMPONENT: BackgroundDecorations
 * Renders the HUD elements and grid overlay.
 */
const BackgroundDecorations = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="experience-hud absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20" />
    <div className="experience-hud absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-arc-blue/5 rounded-full opacity-20" style={{ animationDirection: 'reverse' }} />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

/**
 * SUB-COMPONENT: SectionHeader
 * Renders the mission log title with active transmission status.
 */
const SectionHeader = () => (
  <div className="mb-20 md:mb-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-start"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-arc-blue font-orbitron text-xs md:text-sm tracking-[0.5em] uppercase">
          Mission Log: Alpha-7
        </span>
        <div className="flex items-center gap-2 px-2 py-1 bg-arc-blue/10 border border-arc-blue/30 rounded">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arc-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-arc-blue"></span>
          </span>
          <span className="text-[10px] font-orbitron text-arc-blue tracking-tighter uppercase animate-pulse">Transmission Active</span>
        </div>
      </div>
      <h2 className="experience-title text-display-sm md:text-display-md font-bebas text-white tracking-tighter mb-6">
        BATTLE <span className="text-marvel-red italic">HISTORY</span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-marvel-red to-transparent rounded-full" />
    </motion.div>
  </div>
);

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll tracking for the timeline line animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineProgress = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Background HUD elements continuous rotation
      gsap.to(".experience-hud", {
        rotate: 360,
        duration: 100,
        repeat: -1,
        ease: "none"
      });

      // Section title reveal animation
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
      <BackgroundDecorations />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-arc-blue via-marvel-red to-transparent origin-top shadow-[0_0_15px_rgba(79,195,247,0.5)]"
              style={{ height: lineProgress }}
            />
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
