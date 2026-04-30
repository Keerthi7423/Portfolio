"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";

// Custom Github SVG Icon since Lucide-react doesn't include brand icons in some versions
const GithubIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project, index, onOpenModal }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      className="group relative w-[350px] md:w-[450px] h-[550px] flex-shrink-0"
    >
      {/* Card Wrapper with Stark-style border */}
      <div className="relative h-full w-full bg-surface-raised border border-border/50 group-hover:border-border-glow transition-all duration-500 overflow-hidden noise-bg">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
        </div>


        {/* Status Badge */}
        <div className="absolute top-6 right-6 z-20">
          <div className={`px-3 py-1 text-[10px] font-orbitron tracking-widest border border-current ${
            project.status === 'COMPLETED' ? 'text-arc-blue' : 
            project.status === 'ACTIVE' ? 'text-stark-gold' : 'text-marvel-red'
          } bg-void/50 backdrop-blur-md`}>
            {project.status}
          </div>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
          {/* Mission Number */}
          <span className="text-arc-blue/40 font-mono text-sm mb-2">
            MISSION_{String(index + 1).padStart(2, '0')}
          </span>

          {/* Title Area */}
          <div className="mb-4">
            <span className="text-[10px] font-orbitron text-stark-gold tracking-[0.2em] uppercase mb-1 block">
              {project.subtitle}
            </span>
            <h3 className="text-display-sm text-text-primary group-hover:text-marvel-red transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-6 line-clamp-3 group-hover:text-text-primary transition-colors duration-300">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-text-secondary">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onOpenModal?.(project)}
              className="flex items-center gap-2 px-4 py-2 bg-marvel-red text-white text-[10px] font-orbitron tracking-widest uppercase hover:bg-white hover:text-marvel-red transition-all duration-300"
            >
              Access Mission <ArrowUpRight size={14} />
            </button>
            <div className="flex gap-2">
              <a href={project.github} className="p-2 bg-void/50 border border-white/10 hover:border-stark-gold transition-colors duration-300">
                <GithubIcon size={16} className="text-text-secondary hover:text-stark-gold" />
              </a>
              <a href={project.link} className="p-2 bg-void/50 border border-white/10 hover:border-arc-blue transition-colors duration-300">
                <ExternalLink size={16} className="text-text-secondary hover:text-arc-blue" />
              </a>
            </div>
          </div>
        </div>

        {/* Hover Decorative Corner Lines */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-marvel-red opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-arc-blue opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>

      {/* Decorative Outer Glow */}
      <div className="absolute -inset-4 bg-marvel-red/5 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10" />
    </motion.div>
  );
}
