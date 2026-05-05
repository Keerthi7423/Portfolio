"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, Radio, Activity } from "lucide-react";
import { testimonialsData } from "@/lib/testimonials-data";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(nextTestimonial, 5000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay]);

  return (
    <section id="allies" className="relative py-24 px-6 overflow-hidden bg-void">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,195,247,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <Radio size={16} className="text-marvel-red animate-pulse" />
            <span className="text-arc-blue font-ibm-plex text-xs tracking-[0.4em] uppercase">
              Encrypted Signals
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bebas text-text-primary tracking-wider mb-6"
          >
            ALLIES <span className="text-marvel-red">&</span> TRANSMISSIONS
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-arc-blue to-transparent mb-8"
          />
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[450px] flex items-center justify-center">
          {/* Navigation Controls - Desktop */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-20 px-4 md:px-0">
            <button
              onClick={() => {
                prevTestimonial();
                setIsAutoPlay(false);
              }}
              className="p-3 rounded-full bg-void/50 border border-arc-blue/20 text-arc-blue hover:bg-arc-blue/10 hover:border-arc-blue transition-all pointer-events-auto backdrop-blur-sm group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                nextTestimonial();
                setIsAutoPlay(false);
              }}
              className="p-3 rounded-full bg-void/50 border border-arc-blue/20 text-arc-blue hover:bg-arc-blue/10 hover:border-arc-blue transition-all pointer-events-auto backdrop-blur-sm group"
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Testimonial Cards Wrapper */}
          <div className="w-full max-w-4xl px-12 md:px-24 relative overflow-hidden py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Incoming Transmission Reveal Text */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: [0, 1, 1, 0], x: 0 }}
                  transition={{ duration: 2, times: [0, 0.1, 0.9, 1] }}
                  className="absolute -top-12 left-0 z-30 pointer-events-none"
                >
                  <div className="flex items-center gap-3 bg-arc-blue/10 backdrop-blur-sm px-4 py-1 border-l-2 border-arc-blue">
                    <span className="text-[10px] font-ibm-plex text-arc-blue uppercase tracking-[0.3em] animate-pulse">
                      Transmission Received From: {testimonialsData[activeIndex].name}
                    </span>
                  </div>
                </motion.div>

                {/* Scan-Wipe Animation */}
                <motion.div
                  initial={{ translateY: "-100%" }}
                  animate={{ translateY: "400%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="scan-wipe-overlay"
                />

                <motion.div
                  initial={{ 
                    opacity: 0, 
                    scale: 0.95, 
                    filter: "brightness(2) contrast(1.2) hue-rotate(90deg)",
                    x: 10
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    filter: "brightness(1) contrast(1) hue-rotate(0deg)",
                    x: 0
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <TestimonialCard 
                    testimonial={testimonialsData[activeIndex]} 
                    isActive={true} 
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex flex-col items-center mt-12 gap-6">
          <div className="flex gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === index 
                    ? "w-8 bg-arc-blue" 
                    : "w-2 bg-arc-blue/20 hover:bg-arc-blue/40"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-text-secondary font-ibm-plex text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Activity size={12} className={isAutoPlay ? "text-arc-blue animate-pulse" : "text-text-secondary"} />
              <span>Signal Status: {isAutoPlay ? "Auto-Receiving" : "Manual Override"}</span>
            </div>
            <span className="opacity-20">|</span>
            <div className="flex items-center gap-2">
              <Share2 size={12} className="text-marvel-red" />
              <span>Encryption: AES-256 Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side HUD Decorations */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none opacity-20">
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-1 h-4 bg-arc-blue" style={{ height: `${Math.random() * 40 + 10}px` }} />
              <div className="w-1 h-8 bg-marvel-red" style={{ height: `${Math.random() * 20 + 10}px` }} />
            </div>
          ))}
          <span className="text-[8px] font-ibm-plex rotate-90 mt-8 origin-left whitespace-nowrap tracking-[0.5em] text-arc-blue">
            FREQUENCY_MODULATION_SYNC
          </span>
        </div>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none opacity-20 text-right">
        <div className="flex flex-col items-end gap-4">
          <span className="text-[8px] font-ibm-plex -rotate-90 mb-12 origin-right whitespace-nowrap tracking-[0.5em] text-marvel-red">
            ALLIANCE_TRUST_METRIC
          </span>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-12 h-[1px] bg-arc-blue/50" />
          ))}
          <div className="w-24 h-24 border border-arc-blue/30 rounded-full flex items-center justify-center p-2">
            <div className="w-full h-full border border-marvel-red/30 rounded-full animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
}
