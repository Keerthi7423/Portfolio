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
          {/* Vertical Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-arc-blue via-marvel-red to-transparent origin-top shadow-[0_0_15px_rgba(79,195,247,0.5)]"
              style={{ height: useTransform(scaleY, [0, 1], ["0%", "100%"]) }}
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

export default ExperienceSection;
