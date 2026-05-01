"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * SUB-COMPONENT: SkillFront
 * The primary face showing the icon and skill name.
 */
const SkillFront = ({ skill, color }) => (
  <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 rounded-lg border border-white/10 bg-surface/40 backdrop-blur-sm group-hover:border-opacity-50 transition-colors duration-500 overflow-hidden">
    {/* Background Glow */}
    <div 
      className="absolute -inset-1 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none"
      style={{ backgroundColor: color }}
    />

    {/* Holographic Glare */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </div>
    
    <div className="relative z-10 flex flex-col items-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center filter grayscale-[60%] group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
        <Image 
          src={skill.icon} 
          alt={`${skill.name} icon`} 
          width={64}
          height={64}
          className="w-full h-full object-contain" 
        />
      </div>
      <span className="font-rajdhani font-bold tracking-widest text-sm uppercase group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </div>

    {/* Scanner Line Animation */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-y pointer-events-none" />
  </div>
);

/**
 * SUB-COMPONENT: SkillBack
 * The detailed view showing power levels and description.
 */
const SkillBack = ({ skill, color, isFlipped }) => (
  <div 
    className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] flex flex-col items-center justify-between p-6 rounded-lg border border-white/20 bg-surface-raised/90 backdrop-blur-md"
    style={{ borderColor: `${color}40` }}
  >
    <div className="w-full space-y-4">
      <div className="flex justify-between items-end">
        <span className="font-orbitron text-[10px] uppercase tracking-tighter text-text-secondary">Power Level</span>
        <span className="font-orbitron text-xs font-bold" style={{ color }}>{skill.level}%</span>
      </div>
      
      {/* Power Bar */}
      <div className="h-1.5 w-full bg-void rounded-full overflow-hidden border border-white/5">
        <motion.div 
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: isFlipped ? `${skill.level}%` : 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      </div>

      <p className="text-[11px] leading-relaxed font-mono text-text-secondary text-center mt-2">
        {skill.description}
      </p>
    </div>

    <div className="w-full flex justify-center">
      <div className="px-3 py-1 border border-white/10 rounded-sm bg-white/5">
        <span className="font-rajdhani text-[10px] tracking-widest uppercase text-white/60">Data Verified</span>
      </div>
    </div>
  </div>
);

/**
 * MAIN COMPONENT: SkillCard
 * An interactive 3D flipping card for displaying skills.
 */
export default function SkillCard({ skill, color }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-48 perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SkillFront skill={skill} color={color} />
        <SkillBack skill={skill} color={color} isFlipped={isFlipped} />
      </motion.div>
    </div>
  );
}
