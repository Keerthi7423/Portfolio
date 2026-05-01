"use client";

import { motion } from "framer-motion";
import { Quote, Terminal, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

/**
 * SUB-COMPONENT: TransmissionHeader
 * Displays the technical metadata for the incoming testimonial.
 */
const TransmissionHeader = ({ id, clearance }) => (
  <div className="flex items-center justify-between mb-8 border-b border-arc-blue/10 pb-4">
    <div className="flex items-center gap-3">
      <Terminal size={14} className="text-arc-blue" />
      <span className="text-[10px] font-ibm-plex uppercase tracking-[0.2em] text-text-secondary">
        Incoming Transmission: <span className="text-arc-blue">{id}</span>
      </span>
    </div>
    <div className="flex items-center gap-2">
      <ShieldCheck size={14} className="text-marvel-red" />
      <span className="text-[10px] font-ibm-plex text-marvel-red/80 uppercase tracking-widest font-bold">
        {clearance}
      </span>
    </div>
  </div>
);

/**
 * SUB-COMPONENT: AuthorIdentity
 * Displays the person behind the testimonial with a glitch effect on the avatar.
 */
const AuthorIdentity = ({ name, role, company, time }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (glitch) {
      const timer = setTimeout(() => setGlitch(false), 200);
      return () => clearTimeout(timer);
    }
  }, [glitch]);

  return (
    <div className="flex items-center justify-between pt-6 border-t border-arc-blue/10">
      <div className="flex items-center gap-4">
        <div 
          className="relative w-14 h-14 rounded-lg overflow-hidden border border-arc-blue/30 bg-arc-blue/5 group-hover:border-arc-blue transition-colors cursor-pointer"
          onMouseEnter={() => setGlitch(true)}
        >
          <div className={`w-full h-full relative transition-transform duration-300 ${glitch ? "animate-pulse scale-110" : ""}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-arc-blue/20 to-marvel-red/20 flex items-center justify-center text-arc-blue font-orbitron font-bold">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            {/* Image component would go here in production */}
          </div>
          
          {glitch && (
            <div className="absolute inset-0 z-20 bg-arc-blue/20 mix-blend-screen animate-glitch" />
          )}
        </div>

        <div>
          <h4 className="text-text-primary font-orbitron text-sm tracking-wider uppercase">
            {name}
          </h4>
          <p className="text-text-secondary font-rajdhani text-xs">
            {role} @ <span className="text-arc-blue/80 uppercase">{company}</span>
          </p>
        </div>
      </div>

      <div className="text-right hidden sm:block">
        <p className="text-[10px] font-ibm-plex text-text-secondary uppercase tracking-widest mb-1">
          Timestamp
        </p>
        <p className="text-xs font-ibm-plex text-arc-blue">
          {time} TCT
        </p>
      </div>
    </div>
  );
};

/**
 * MAIN COMPONENT: TestimonialCard
 * A cinematic card for client feedback with HUD aesthetic.
 */
export default function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0.4, scale: 0.9, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-2xl mx-auto p-8 rounded-xl border border-arc-blue/20 bg-void/80 backdrop-blur-md overflow-hidden group ${
        isActive ? "ring-2 ring-arc-blue/30 shadow-[0_0_30px_rgba(79,195,247,0.15)]" : ""
      }`}
    >
      {/* Visual FX: Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-20" />
      
      <TransmissionHeader id={testimonial.id} clearance={testimonial.clearance} />

      <div className="relative mb-8">
        <Quote className="absolute -top-4 -left-4 text-arc-blue/10" size={40} />
        <p className="text-lg md:text-xl text-text-primary leading-relaxed font-rajdhani italic font-light relative z-10 px-4">
          &quot;{testimonial.content}&quot;
        </p>
      </div>

      <AuthorIdentity 
        name={testimonial.name} 
        role={testimonial.role} 
        company={testimonial.company} 
        time={testimonial.transmissionTime} 
      />

      {/* Decorative HUD Element */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          <path d="M50 5 L50 15 M95 50 L85 50 M50 95 L50 85 M5 L50 L15 50" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </motion.div>
  );
}
