"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/navigation/Navbar";
import HeroScene from "@/components/hero/HeroScene";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-void selection:bg-marvel-red selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <Navbar />
            
            {/* Phase 3: Hero Section with 3D Canvas */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
              {/* 3D Background */}
              <HeroScene />

              {/* Content Overlay */}
              <div className="text-center z-20 relative px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="mb-6 inline-block"
                >
                  <div className="text-arc-blue font-orbitron text-xs tracking-[0.5em] uppercase mb-4 opacity-70">
                    System Identification: Alpha-01
                  </div>
                </motion.div>

                <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-hero gradient-text-marvel mb-6"
                >
                  STARK INDUSTRIES<br/>
                  <span className="text-stark-gold">PROTOCOL</span>
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="font-rajdhani text-xl md:text-2xl tracking-[0.2em] text-text-secondary uppercase max-w-2xl mx-auto"
                >
                  Redefining the digital frontier with <span className="text-arc-blue">Advanced Neural Architectures</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-12"
                >
                  <button className="px-8 py-3 border border-arc-blue/30 bg-arc-blue/5 hover:bg-arc-blue/10 text-arc-blue font-orbitron text-sm tracking-widest uppercase transition-all duration-300 hologram-glow group relative overflow-hidden">
                    <span className="relative z-10">Initiate Mission</span>
                    <div className="absolute inset-0 bg-arc-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
              >
                <span className="text-[10px] font-orbitron text-text-secondary tracking-[0.3em] uppercase">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-arc-blue to-transparent" />
              </motion.div>
            </section>

            {/* Test Sections for Scroll */}
            <section id="origin" className="h-screen flex items-center justify-center border-t border-white/5 bg-void/50 backdrop-blur-sm relative z-20">
              <h2 className="text-display-sm text-stark-gold">The Origin Story</h2>
            </section>


            <section id="powers" className="h-screen flex items-center justify-center border-t border-white/5">
              <h2 className="text-display-sm text-arc-blue">Superpowers</h2>
            </section>

            <section id="missions" className="h-screen flex items-center justify-center border-t border-white/5">
              <h2 className="text-display-sm text-marvel-red">The Missions</h2>
            </section>

            <section id="history" className="h-screen flex items-center justify-center border-t border-white/5">
              <h2 className="text-display-sm text-stark-gold">Battle History</h2>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

