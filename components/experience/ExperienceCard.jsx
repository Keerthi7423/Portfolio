"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, ChevronRight, Target, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * SUB-COMPONENT: ScanningEffect
 * A horizontal light beam that "scans" the card on entrance.
 */
const ScanningEffect = () => (
  <motion.div
    initial={{ top: "-10%" }}
    whileInView={{ top: "110%" }}
    transition={{ duration: 2, ease: "linear", repeat: 0 }}
    viewport={{ once: true }}
    className="absolute left-0 right-0 h-1 bg-arc-blue/30 blur-sm z-20 pointer-events-none"
    style={{ boxShadow: "0 0 15px rgba(79, 195, 247, 0.5)" }}
  />
);

/**
 * SUB-COMPONENT: CompanyBranding
 * Renders the company logo and basic identity with "Operational" feel.
 */
const CompanyBranding = ({ exp }) => (
  <div className="flex items-center gap-4">
    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border border-white/10 bg-void/50 p-1 group-hover:border-arc-blue/50 transition-colors duration-500">
      <Image
        src={exp.logo}
        alt={`${exp.company} logo`}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      />
    </div>
    
    <div>
      <div className="flex items-center gap-2 mb-1">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl font-orbitron text-white group-hover:text-arc-blue transition-colors duration-300"
        >
          {exp.role}
        </motion.h3>
        {exp.status === "ACTIVE" && (
          <div className="flex items-center gap-2 px-2 py-0.5 bg-marvel-red/10 border border-marvel-red/30 rounded-sm">
             <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marvel-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-marvel-red"></span>
            </span>
            <span className="text-[8px] font-orbitron text-marvel-red tracking-tighter uppercase">Live Mission</span>
          </div>
        )}
      </div>
      <p className="text-stark-gold font-rajdhani font-semibold tracking-wider flex items-center gap-2">
        <Briefcase size={14} />
        {exp.company}
      </p>
    </div>
  </div>
);

/**
 * SUB-COMPONENT: MetaDetails
 * Renders period and location metadata.
 */
const MetaDetails = ({ period, location }) => (
  <div className="flex flex-col items-start md:items-end gap-1">
    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-ibm-mono text-text-secondary tracking-widest flex items-center gap-2 whitespace-nowrap group-hover:border-arc-blue/20 transition-colors">
      <Calendar size={12} className="text-arc-blue" />
      {period}
    </span>
    <span className="text-[10px] font-ibm-mono text-text-secondary/60 flex items-center gap-1 mt-1">
      <MapPin size={10} />
      {location}
    </span>
  </div>
);

/**
 * SUB-COMPONENT: ObjectiveList
 * Renders the list of achievements as mission objectives with a staggered reveal.
 */
const ObjectiveList = ({ achievements }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 mb-4">
      <Target size={12} className="text-arc-blue" />
      <h4 className="text-[10px] font-orbitron text-text-secondary tracking-[0.3em] uppercase">
        Mission Objectives Achieved
      </h4>
    </div>
    {achievements.map((achievement, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.6 + (i * 0.15),
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="flex items-start gap-3 group/item relative"
      >
        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-arc-blue/40 group-hover/item:bg-arc-blue transition-colors shadow-[0_0_5px_rgba(79,195,247,0.3)]" />
        <p className="text-xs md:text-sm text-text-secondary/80 font-ibm-mono group-hover/item:text-text-primary transition-colors leading-relaxed">
          {achievement}
        </p>
      </motion.div>
    ))}
  </div>
);

/**
 * MAIN COMPONENT: ExperienceCard
 * A stylized timeline card for professional experience, themed as a "Battle Log".
 */
const ExperienceCard = ({ exp, index, isLeft }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full md:w-[calc(50%-40px)] ${isLeft ? "md:mr-auto" : "md:ml-auto"} mb-12 md:mb-24 group`}
    >
      {/* Connector Dot on Timeline */}
      <div 
        className={`absolute top-0 md:top-6 w-4 h-4 rounded-full bg-void border-2 border-arc-blue z-20 
          ${isLeft ? "md:-right-[51px]" : "md:-left-[51px]"} 
          hidden md:block shadow-[0_0_10px_rgba(79,195,247,0.5)] group-hover:scale-125 transition-transform duration-300`}
      >
        {isHovered && (
          <motion.div 
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-arc-blue"
          />
        )}
      </div>

      {/* Card Content Container */}
      <div className="relative p-6 md:p-8 bg-surface/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-arc-blue/30 transition-all duration-500 group shadow-2xl">
        {/* Visual FX: Hover Gradient, Scanlines & Scanning Beam */}
        <div className="absolute inset-0 bg-gradient-to-br from-arc-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        <ScanningEffect />

        <div className="relative z-10">
          {/* Top Section: Branding and Meta */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <CompanyBranding exp={exp} />
            <MetaDetails period={exp.period} location={exp.location} />
          </div>

          {/* Role Status Banner (Mobile Only or Accent) */}
          <div className="flex items-center gap-2 mb-4 md:hidden">
            <ShieldAlert size={10} className="text-stark-gold" />
            <span className="text-[8px] font-orbitron text-stark-gold/60 uppercase tracking-widest">Security Clearance: L5</span>
          </div>

          {/* Description with border highlight */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm md:text-base text-text-secondary font-ibm-mono mb-8 leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-arc-blue/40 transition-colors duration-500"
          >
            {exp.description}
          </motion.p>

          <ObjectiveList achievements={exp.achievements} />

          {/* Technical Metadata Footer */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-ibm-mono text-text-secondary/40 tracking-tighter uppercase">
                LOG_ID: {exp.id} | AUTH: STARK_ENT_SEC
              </span>
              <span className="text-[8px] font-ibm-mono text-arc-blue/30 tracking-widest mt-1">
                ENCRYPTED_DATA_PACKET_v2.1
              </span>
            </div>
            
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center gap-1 text-[9px] font-orbitron text-arc-blue/60 group-hover:text-arc-blue transition-colors tracking-widest uppercase cursor-pointer"
            >
              Operational Details <ChevronRight size={10} />
            </motion.div>
          </div>
        </div>

        {/* Decorative Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/5 group-hover:border-arc-blue/30 transition-colors" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/5 group-hover:border-arc-blue/30 transition-colors" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/5 group-hover:border-arc-blue/30 transition-colors" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/5 group-hover:border-arc-blue/30 transition-colors" />
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
