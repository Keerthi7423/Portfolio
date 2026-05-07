"use client";

import React from 'react';
import { motion } from 'framer-motion';

const JarvisTrigger = ({ onClick, isOpen }) => {
  return (
    <motion.button
      id="jarvis-trigger"
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full flex items-center justify-center group focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle JARVIS AI"
    >
      {/* Background Pulse Rings */}
      <div className="absolute inset-0 rounded-full border border-arc-blue/30 animate-pulse-slow scale-125" />
      <div className="absolute inset-0 rounded-full border border-arc-blue/10 animate-pulse-slow scale-150 delay-700" />
      
      {/* Main Trigger Body */}
      <div className={`relative w-full h-full rounded-full bg-deep border-2 transition-colors duration-500 flex items-center justify-center overflow-hidden ${
        isOpen ? 'border-marvel-red shadow-[0_0_20px_rgba(226,54,54,0.5)]' : 'border-arc-blue shadow-[0_0_20px_rgba(79,195,247,0.5)]'
      }`}>
        
        {/* Inner Reactor Design */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
          <div className="w-12 h-12 border border-arc-blue rounded-full" />
          <div className="absolute w-8 h-8 border border-arc-blue rotate-45" />
          <div className="absolute w-8 h-8 border border-arc-blue -rotate-45" />
        </div>

        {/* Center Glow */}
        <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
          isOpen ? 'bg-marvel-red shadow-[0_0_10px_#e23636]' : 'bg-arc-blue shadow-[0_0_10px_#4fc3f7]'
        }`} />

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      </div>

      {/* Label */}
      <motion.span 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute right-20 bg-deep/80 backdrop-blur-md border border-arc-blue/30 px-3 py-1 text-[10px] font-orbitron text-arc-blue uppercase tracking-widest whitespace-nowrap rounded pointer-events-none"
      >
        {isOpen ? 'Shutdown' : 'Initialize JARVIS'}
      </motion.span>
    </motion.button>
  );
};

export default JarvisTrigger;
