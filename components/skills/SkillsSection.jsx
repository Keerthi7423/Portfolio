
"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/skills-data";
import SkillCard from "./SkillCard";

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section id="powers" className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-void">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-marvel-red" />
            <span className="font-orbitron text-xs tracking-[0.4em] text-marvel-red uppercase">Combat Capabilities</span>
          </div>
          <h2 className="text-display-md lg:text-display-lg leading-none">
            Technical <span className="text-stark-gold">Superpowers</span>
          </h2>
          <p className="max-w-2xl text-text-secondary font-mono text-sm border-l border-white/10 pl-6 mt-6">
            Analyzing developer technical matrix... Accessing proficiency levels... 
            Displaying optimized skill set for mission-critical deployments.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-24">
          {skillCategories.map((category, catIdx) => (
            <div key={category.id} className="space-y-10">
              {/* Category Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-6"
              >
                <h3 
                  className="font-rajdhani text-2xl tracking-[0.2em] font-bold"
                  style={{ color: category.color }}
                >
                  {category.title}
                </h3>
                <div className="flex-1 h-[1px] bg-white/5 relative">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-current to-transparent opacity-20"
                    style={{ color: category.color }}
                  />
                </div>
                <span className="font-mono text-[10px] text-text-tertiary">LVL_0{catIdx + 1}</span>
              </motion.div>

              {/* Skills Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
              >
                {category.skills.map((skill, index) => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <SkillCard skill={skill} color={category.color} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Side HUD Decorations */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-20 pointer-events-none">
        <div className="rotate-90 origin-right">
          <span className="font-mono text-[10px] tracking-widest text-white/50">SYSTEM_RESOURCES_OPTIMIZED</span>
        </div>
        <div className="w-[2px] h-32 bg-white/10" />
      </div>
    </section>
  );
}
