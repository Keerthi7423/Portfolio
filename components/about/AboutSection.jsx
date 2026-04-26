"use client";

import { motion } from "framer-motion";
import ClassifiedStamp from "./ClassifiedStamp";

const AboutSection = () => {
  return (
    <section 
      id="origin" 
      className="relative min-h-screen py-24 px-6 md:px-12 flex items-center bg-void noise-bg overflow-hidden"
    >
      {/* Background Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Red ambient glow */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-marvel-red/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[40%] bg-arc-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <ClassifiedStamp />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Bio Text Column */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-stark-gold/30 bg-stark-gold/5 mb-6">
                <div className="w-1.5 h-1.5 bg-stark-gold animate-pulse" />
                <span className="text-stark-gold font-orbitron text-[10px] tracking-[0.3em] uppercase">Subject: The Architect</span>
              </div>
              
              <h3 className="text-display-sm text-white mb-8">
                Identity: <span className="text-marvel-red">Full Stack Hero</span>
              </h3>
              
              <div className="space-y-6 text-text-secondary font-sans leading-relaxed text-lg md:text-xl max-w-2xl">
                <p>
                  Specializing in the development of hyper-performant, cinematic web ecosystems. 
                  My engineering philosophy is rooted in the convergence of <span className="text-arc-blue font-semibold">advanced logic</span> and <span className="text-stark-gold font-semibold">premium aesthetics</span>.
                </p>
                <p>
                  Much like the systems designed at Stark Industries, my code is built to be modular, scalable, and resilient. 
                  I bridge the gap between complex backend architecture and fluid, interactive frontend experiences.
                </p>
                <p className="border-l-2 border-marvel-red/30 pl-6 italic text-text-tertiary">
                  &quot;With a background in building mission-critical applications, I bring a veteran&apos;s perspective to every project, 
                  ensuring that &apos;impossible&apos; is just a problem yet to be solved.&quot;
                </p>
              </div>

              {/* Decorative HUD line */}
              <div className="mt-12 flex items-center gap-4">
                <div className="h-[1px] w-24 bg-marvel-red" />
                <div className="font-orbitron text-[10px] text-marvel-red tracking-[0.5em] uppercase">End of Briefing</div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-marvel-red/50 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Photo & Stats Column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              {/* Photo Frame with holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-raised/80 to-void border border-white/5 overflow-hidden group backdrop-blur-sm">
                {/* Glitch Overlay (visible on hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-marvel-red mix-blend-overlay z-20 transition-opacity duration-300 pointer-events-none" />
                
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-arc-blue z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-arc-blue z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-arc-blue z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-arc-blue z-20" />

                {/* Animated Scanline for Photo */}
                <div className="absolute inset-0 w-full h-[2px] bg-arc-blue/30 top-[-2px] animate-[scan_4s_linear_infinite] z-30" />

                {/* Grid Overlay on photo */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(79,195,247,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-10" />

                <div className="w-full h-full flex flex-col items-center justify-center text-text-tertiary font-orbitron gap-4">
                  <div className="w-16 h-16 border-2 border-dashed border-arc-blue/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-8 h-8 border-2 border-arc-blue/40 rounded-full" />
                  </div>
                  <div className="text-[10px] tracking-[0.4em] text-center px-12 leading-loose">
                    [ BIOMETRIC SCAN IN PROGRESS... ]<br/>
                    [ ANALYSIS: HIGH-THREAT DEVELOPER ]
                  </div>
                </div>
              </div>

              {/* Stats HUD Blocks */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 bg-void/90 backdrop-blur-xl border border-arc-blue/30 p-5 min-w-[180px] hologram-glow z-40"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-orbitron text-arc-blue tracking-widest uppercase">Experience</div>
                  <div className="w-2 h-2 bg-arc-blue" />
                </div>
                <div className="text-4xl font-bebas text-white tracking-wider">05<span className="text-arc-blue text-2xl">+</span></div>
                <div className="text-[9px] font-mono text-text-tertiary mt-1 uppercase">Years in Operation</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-8 -right-8 bg-void/90 backdrop-blur-xl border border-marvel-red/30 p-5 min-w-[180px] hologram-glow-red z-40"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-orbitron text-marvel-red tracking-widest uppercase">Missions</div>
                  <div className="w-2 h-2 bg-marvel-red" />
                </div>
                <div className="text-4xl font-bebas text-white tracking-wider">42<span className="text-marvel-red text-2xl">+</span></div>
                <div className="text-[9px] font-mono text-text-tertiary mt-1 uppercase">Successful Deployments</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
