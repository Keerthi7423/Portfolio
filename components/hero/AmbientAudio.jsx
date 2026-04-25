"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Use a royalty-free atmospheric/tech ambient sound
  const audioUrl = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"; // Placeholder for tech vibe

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex items-center gap-4">
      <audio ref={audioRef} loop src={audioUrl} />
      
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-orbitron text-arc-blue/60 tracking-[0.2em] uppercase mb-1">
          {isPlaying ? "Audio Transmission: Active" : "Audio Transmission: Muted"}
        </span>
        <button
          onClick={toggleAudio}
          className={`relative w-12 h-12 flex items-center justify-center border transition-all duration-500 ${
            isPlaying 
              ? "border-arc-blue bg-arc-blue/10 shadow-[0_0_15px_rgba(79,195,247,0.4)]" 
              : "border-white/10 bg-white/5 hover:border-white/30"
          }`}
        >
          {/* Animated Bars when playing */}
          <div className="flex items-end gap-[2px] h-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={isPlaying ? {
                  height: [4, 12, 6, 16, 4],
                } : {
                  height: 4
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + i * 0.2,
                  ease: "easeInOut"
                }}
                className={`w-[2px] ${isPlaying ? "bg-arc-blue" : "bg-white/30"}`}
              />
            ))}
          </div>

          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-inherit" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-inherit" />
        </button>
      </div>
    </div>
  );
}
