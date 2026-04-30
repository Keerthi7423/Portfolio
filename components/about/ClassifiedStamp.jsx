"use client";

import { motion } from "framer-motion";

/**
 * A decorative "Classified" stamp component with an entry animation.
 * Used for the Marvel/Stark-themed aesthetic in the About section.
 */
const ClassifiedStamp = () => {
  // Animation settings extracted for better readability
  const stampVariants = {
    initial: { 
      scale: 2.5, 
      opacity: 0, 
      rotate: -25 
    },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: -15 
    }
  };

  const transitionConfig = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
    delay: 0.4
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      variants={stampVariants}
      transition={transitionConfig}
      viewport={{ once: true }}
      className="absolute top-10 right-10 z-20 pointer-events-none"
    >
      {/* Primary Stamp Box */}
      <div className="border-4 border-marvel-red/60 px-6 py-2 rounded-sm rotate-[-5deg] bg-marvel-red/5 backdrop-blur-[2px]">
        <span className="text-marvel-red/80 font-bebas text-4xl md:text-5xl tracking-widest uppercase">
          Classified
        </span>
      </div>

      {/* Subtext Label */}
      <div className="mt-2 text-right">
        <span className="text-marvel-red/40 font-mono text-[10px] tracking-[0.3em] uppercase">
          Level 5 Access Granted
        </span>
      </div>
    </motion.div>
  );
};

export default ClassifiedStamp;
