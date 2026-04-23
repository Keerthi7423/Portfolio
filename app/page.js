"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";
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
            {/* Hero Section Placeholder */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-20">
                <motion.h2 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-display gradient-text-marvel mb-4"
                >
                  Welcome to the Universe
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="font-rajdhani text-xl tracking-[0.2em] text-text-secondary uppercase"
                >
                  System Online | JARVIS Protocol v1.0
                </motion.p>
              </div>

              {/* Background ambient elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-arc-blue/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-marvel-red/5 rounded-full blur-[120px]" />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

