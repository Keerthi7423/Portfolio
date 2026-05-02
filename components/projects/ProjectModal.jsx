"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, ExternalLink, Shield, Zap, Target, Camera } from "lucide-react";
import Image from "next/image";

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

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-surface border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-void/50 border border-white/10 hover:border-marvel-red transition-colors text-text-secondary hover:text-marvel-red"
            >
              <X size={24} />
            </button>

            {/* Left Column: Image & Media */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              
              {/* Mission Header Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[12px] font-orbitron text-stark-gold tracking-[0.3em] uppercase mb-2 block">
                  Mission Briefing
                </span>
                <h2 className="text-display-md text-text-primary leading-none mb-4">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-arc-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-20 scanlines" />
            </div>

            {/* Right Column: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-surface/50 backdrop-blur-md">
              <div className="space-y-12">
                {/* Briefing Section */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-arc-blue/10 text-arc-blue">
                      <Target size={18} />
                    </div>
                    <h4 className="text-[14px] font-orbitron tracking-widest text-text-primary uppercase">
                      Problem Statement
                    </h4>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-white/5 pl-6">
                    {project.problem}
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-marvel-red/10 text-marvel-red">
                      <Zap size={18} />
                    </div>
                    <h4 className="text-[14px] font-orbitron tracking-widest text-text-primary uppercase">
                      The Solution
                    </h4>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-white/5 pl-6">
                    {project.solution}
                  </p>
                </section>

                {/* Features Section */}
                {project.features && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-stark-gold/10 text-stark-gold">
                        <Shield size={18} />
                      </div>
                      <h4 className="text-[14px] font-orbitron tracking-widest text-text-primary uppercase">
                        Key Features
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                          <div className="w-1 h-1 bg-marvel-red" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Technical Blueprint (Tech Deep-dive) */}
                {project.techDeepDive && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-arc-blue/10 text-arc-blue">
                        <Globe size={18} />
                      </div>
                      <h4 className="text-[14px] font-orbitron tracking-widest text-text-primary uppercase">
                        Technical Blueprint
                      </h4>
                    </div>
                    <div className="space-y-4 pl-6">
                      {project.techDeepDive.map((item, i) => (
                        <div key={i} className="border border-white/5 p-4 bg-white/5 backdrop-blur-sm">
                          <span className="text-[10px] font-orbitron text-stark-gold uppercase tracking-tighter mb-1 block">
                            {item.area}
                          </span>
                          <p className="text-sm text-text-secondary">
                            {item.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Media Briefing (Gallery) */}
                {project.gallery && (
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-marvel-red/10 text-marvel-red">
                        <Camera size={18} />
                      </div>
                      <h4 className="text-[14px] font-orbitron tracking-widest text-text-primary uppercase">
                        Media Briefing
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pl-6">
                      {project.gallery.map((img, i) => (
                        <div key={i} className="relative aspect-video border border-white/10 overflow-hidden group">
                          <Image
                            src={img}
                            alt={`Gallery ${i}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-stark-gold/10 text-stark-gold">
                      <Shield size={18} />
                    </div>
                    <h4 className="text-[14px] font-orbitron tracking-widest text-text-primary uppercase">
                      Operational Impact
                    </h4>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-white/5 pl-6">
                    {project.impact}
                  </p>
                </section>

                {/* Footer Actions */}
                <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
                  <a
                    href={project.link}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-marvel-red text-white text-[12px] font-orbitron tracking-widest uppercase hover:bg-white hover:text-marvel-red transition-all duration-300"
                  >
                    Launch Mission <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center justify-center p-4 bg-void border border-white/10 hover:border-stark-gold transition-colors text-text-secondary hover:text-stark-gold"
                  >
                    <GithubIcon size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Stark Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/20 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
