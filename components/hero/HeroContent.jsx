"use client";

import { motion } from "framer-motion";

/**
 * ANIMATION VARIANTS
 * Centralized animations for better maintenance and readability.
 */
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * SYSTEM BADGE COMPONENT
 * Small decorative badge at the top of the hero section.
 */
const SystemBadge = ({ id = "KKV-01" }) => (
  <motion.div variants={ITEM_VARIANTS} className="mb-6 inline-block">
    <div className="flex items-center gap-3">
      <div className="h-[1px] w-8 bg-arc-blue/50" />
      <span className="text-arc-blue font-orbitron text-xs tracking-[0.5em] uppercase opacity-70">
        System Identification: {id}
      </span>
      <div className="h-[1px] w-8 bg-arc-blue/50" />
    </div>
  </motion.div>
);

/**
 * HERO TITLE COMPONENT
 * Handles the main name and protocol subtitle.
 */
const HeroTitle = () => (
  <motion.h1
    variants={ITEM_VARIANTS}
    className="text-hero gradient-text-marvel mb-6 relative"
  >
    <span className="relative inline-block">
      KEERTHI KUMAR V
      {/* Glitch Overlay Effect */}
      <span className="absolute inset-0 text-arc-blue opacity-20 blur-[2px] animate-pulse-slow">
        KEERTHI KUMAR V
      </span>
    </span>
    <br />
    <span className="text-stark-gold relative">
      CORE <span className="text-white/20 font-sans font-light tracking-widest text-4xl align-middle mx-4">/</span> PROTOCOL
    </span>
  </motion.h1>
);

/**
 * HERO BUTTON COMPONENT
 * Reusable button with Stark-style holographic effects.
 */
const HeroButton = ({ label, type = "primary" }) => {
  const isPrimary = type === "primary";
  const colorClass = isPrimary ? "arc-blue" : "marvel-red";
  
  // Dynamic styles based on button type
  const baseStyles = `group relative px-10 py-4 font-orbitron text-sm tracking-[0.2em] uppercase transition-all duration-300 overflow-hidden`;
  const themeStyles = isPrimary 
    ? "bg-arc-blue/5 border-arc-blue/30 text-arc-blue hover:bg-arc-blue/10" 
    : "bg-marvel-red/5 border-marvel-red/30 text-marvel-red hover:bg-marvel-red/10";

  return (
    <button className={`${baseStyles} ${themeStyles} border`}>
      <span className="relative z-10">{label}</span>
      
      {/* Holographic background sweep effect */}
      <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-${colorClass}/20 to-transparent skew-x-12`} />
      
      {/* Dynamic Corner Decorations */}
      <div className={`absolute top-0 ${isPrimary ? 'left-0' : 'right-0'} w-2 h-2 border-t border-${isPrimary ? 'l' : 'r'} border-${colorClass} transition-all group-hover:w-4 group-hover:h-4`} />
      <div className={`absolute bottom-0 ${isPrimary ? 'right-0' : 'left-0'} w-2 h-2 border-b border-${isPrimary ? 'r' : 'l'} border-${colorClass} transition-all group-hover:w-4 group-hover:h-4`} />
    </button>
  );
};

/**
 * HUD DECORATIONS COMPONENT
 * Spinning circles that appear on large screens.
 */
const HudDecorations = () => (
  <>
    {/* Left HUD */}
    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-24 opacity-20 pointer-events-none hidden xl:block">
      <div className="w-48 h-48 border border-arc-blue/30 rounded-full flex items-center justify-center animate-spin-slow">
        <div className="w-40 h-40 border border-dashed border-arc-blue/20 rounded-full" />
      </div>
    </div>
    
    {/* Right HUD */}
    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-24 opacity-20 pointer-events-none hidden xl:block">
      <div className="w-48 h-48 border border-marvel-red/30 rounded-full flex items-center justify-center animate-spin-slow reverse">
        <div className="w-40 h-40 border border-dashed border-marvel-red/20 rounded-full" />
      </div>
    </div>
  </>
);

export default function HeroContent() {
  return (
    <motion.div
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="text-center z-20 relative px-4"
    >
      <SystemBadge />
      
      <HeroTitle />

      <motion.p
        variants={ITEM_VARIANTS}
        className="font-rajdhani text-xl md:text-2xl tracking-[0.2em] text-text-secondary uppercase max-w-3xl mx-auto mb-12"
      >
        Architecting the <span className="text-arc-blue">Next Generation</span> of 
        <span className="block mt-2 text-white/90">Intelligent Digital Interfaces</span>
      </motion.p>

      <motion.div variants={ITEM_VARIANTS} className="flex flex-wrap justify-center gap-6">
        <HeroButton label="Initiate Mission" type="primary" />
        <HeroButton label="Access Dossier" type="secondary" />
      </motion.div>

      <HudDecorations />
    </motion.div>
  );
}
