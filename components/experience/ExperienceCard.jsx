"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, ChevronRight } from "lucide-react";
import Image from "next/image";

/**
 * SUB-COMPONENT: CompanyBranding
 * Renders the company logo and basic identity.
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
        <h3 className="text-xl md:text-2xl font-orbitron text-white group-hover:text-arc-blue transition-colors duration-300">
          {exp.role}
        </h3>
        {exp.status === "ACTIVE" && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marvel-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-marvel-red"></span>
          </span>
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
    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-ibm-mono text-text-secondary tracking-widest flex items-center gap-2 whitespace-nowrap">
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
 * Renders the list of achievements as mission objectives.
 */
const ObjectiveList = ({ achievements }) => (
  <div className="space-y-3">
    <h4 className="text-[10px] font-orbitron text-text-secondary tracking-[0.3em] uppercase mb-4">
      Mission Objectives Achieved
    </h4>
    {achievements.map((achievement, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 + (i * 0.1) }}
        className="flex items-start gap-3 group/item"
      >
        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-arc-blue/40 group-hover/item:bg-arc-blue transition-colors" />
        <p className="text-xs md:text-sm text-text-secondary/80 font-ibm-mono group-hover/item:text-text-primary transition-colors">
          {achievement}
        </p>
      </motion.div>
    ))}
  </div>
);

/**
 * MAIN COMPONENT: ExperienceCard
 * A stylized timeline card for professional experience.
 */
const ExperienceCard = ({ exp, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full md:w-[calc(50%-40px)] ${isLeft ? "md:mr-auto" : "md:ml-auto"} mb-12 md:mb-24 group`}
    >
      {/* Connector Dot on Timeline */}
      <div 
        className={`absolute top-0 md:top-6 w-4 h-4 rounded-full bg-void border-2 border-arc-blue z-20 
          ${isLeft ? "md:-right-[51px]" : "md:-left-[51px]"} 
          hidden md:block shadow-[0_0_10px_rgba(79,195,247,0.5)] group-hover:scale-125 transition-transform duration-300`}
      />

      {/* Card Content Container */}
      <div className="relative p-6 md:p-8 bg-surface/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-arc-blue/30 transition-colors duration-500 group">
        {/* Visual FX: Hover Gradient & Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-br from-arc-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

        <div className="relative z-10">
          {/* Top Section: Branding and Meta */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <CompanyBranding exp={exp} />
            <MetaDetails period={exp.period} location={exp.location} />
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-text-secondary font-ibm-mono mb-6 leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-arc-blue/20 transition-colors duration-500">
            {exp.description}
          </p>

          <ObjectiveList achievements={exp.achievements} />

          {/* Technical Metadata Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-[9px] font-ibm-mono text-text-secondary/40 tracking-tighter">
              LOG_ID: {exp.id} | STATUS: SECURE_TRANS
            </span>
            <div className="flex items-center gap-1 text-[9px] font-orbitron text-arc-blue/60 group-hover:text-arc-blue transition-colors tracking-widest uppercase cursor-pointer">
              Operational Details <ChevronRight size={10} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
