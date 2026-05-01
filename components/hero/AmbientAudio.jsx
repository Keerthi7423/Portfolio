"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * AMBIENT_SOUND_URL: A royalty-free tech-house track for atmospheric background audio.
 */
const AMBIENT_SOUND_URL = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";

/**
 * AudioVisualizer: Small decorative component that shows animated bars when audio is playing.
 */
const AudioVisualizer = ({ isPlaying }) => {
  const barVariants = {
    playing: {
      height: [4, 12, 6, 16, 4],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    muted: {
      height: 4,
    },
  };

  return (
    <div className="flex items-end gap-[2px] h-4">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          variants={barVariants}
          animate={isPlaying ? "playing" : "muted"}
          transition={{
            ...barVariants.playing.transition,
            duration: 0.8 + index * 0.2, // Staggered animation speeds
          }}
          className={`w-[2px] ${isPlaying ? "bg-arc-blue" : "bg-white/30"}`}
        />
      ))}
    </div>
  );
};

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  /**
   * Sync the audio element's playback state with the React state.
   */
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback was blocked by the browser. Interaction required.", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleToggleAudio = () => setIsPlaying((prev) => !prev);

  const statusText = isPlaying ? "Audio Transmission: Active" : "Audio Transmission: Muted";
  
  const buttonStyles = isPlaying
    ? "border-arc-blue bg-arc-blue/10 shadow-[0_0_15px_rgba(79,195,247,0.4)]"
    : "border-white/10 bg-white/5 hover:border-white/30";

  return (
    <div className="fixed bottom-10 right-10 z-50 flex items-center gap-4">
      <audio ref={audioRef} loop src={AMBIENT_SOUND_URL} />
      
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-orbitron text-arc-blue/60 tracking-[0.2em] uppercase mb-1">
          {statusText}
        </span>
        
        <button
          onClick={handleToggleAudio}
          aria-label={statusText}
          className={`relative w-12 h-12 flex items-center justify-center border transition-all duration-500 ${buttonStyles}`}
        >
          <AudioVisualizer isPlaying={isPlaying} />

          {/* HUD Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-inherit" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-inherit" />
        </button>
      </div>
    </div>
  );
}
