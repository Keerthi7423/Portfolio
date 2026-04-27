"use client";

import { motion } from "framer-motion";
import ClassifiedStamp from "./ClassifiedStamp";
import HolographicPhoto from "./HolographicPhoto";
import StatBlock from "./StatBlock";

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

      {/* Ambient glows */}
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
              <HolographicPhoto />

              {/* Stats HUD Blocks */}
              <div className="absolute -bottom-10 -left-10 z-40 hidden sm:block">
                <StatBlock 
                  label="Experience" 
                  value={5} 
                  suffix="+" 
                  delay={0.4} 
                  color="arc-blue" 
                />
              </div>

              <div className="absolute -top-10 -right-10 z-40 hidden sm:block">
                <StatBlock 
                  label="Missions" 
                  value={42} 
                  suffix="+" 
                  delay={0.6} 
                  color="marvel-red" 
                />
              </div>

              <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 z-40 hidden xl:block">
                <StatBlock 
                  label="Tech Stack" 
                  value={18} 
                  suffix="⚡" 
                  delay={0.8} 
                  color="arc-blue" 
                />
              </div>

              <div className="absolute bottom-1/2 -right-16 transform translate-y-1/2 z-40 hidden xl:block">
                <StatBlock 
                  label="Caffeine" 
                  value={1250} 
                  suffix="☕" 
                  delay={1.0} 
                  color="marvel-red" 
                />
              </div>

              {/* Mobile Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-12 sm:hidden">
                <StatBlock label="Experience" value={5} suffix="+" color="arc-blue" />
                <StatBlock label="Missions" value={42} suffix="+" color="marvel-red" />
                <StatBlock label="Tech Stack" value={18} suffix="⚡" color="arc-blue" />
                <StatBlock label="Caffeine" value={1250} suffix="☕" color="marvel-red" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
