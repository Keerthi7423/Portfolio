"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navbar from "@/components/navigation/Navbar";
import HeroScene from "@/components/hero/HeroScene";
import HeroContent from "@/components/hero/HeroContent";
import AmbientAudio from "@/components/hero/AmbientAudio";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
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
              <HeroContent />

              {/* Ambient Audio Toggle */}
              <AmbientAudio />

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

            {/* Phase 4: About Section (The Hero Dossier) */}
            <AboutSection />

            {/* Phase 4: Skills Section (Superpowers) */}
            <SkillsSection />

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

