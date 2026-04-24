"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for the cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring (lag effect)
  const springConfig = { damping: 20, stiffness: 100 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Global listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Delegate hover events
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Ring (Arc Reactor Style) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : isClicked ? 0.8 : 1,
          borderColor: isHovering ? "var(--color-arc-blue)" : "var(--color-stark-gold)",
          borderWidth: isHovering ? "1px" : "2px",
        }}
        className="absolute w-10 h-10 rounded-full border-2 border-stark-gold opacity-50"
      >
        {/* Animated brackets inside the ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-t border-b border-arc-blue/30 rounded-full"
          />
        </div>
      </motion.div>

      {/* Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? "var(--color-marvel-red)" : "var(--color-arc-blue)",
        }}
        className="absolute w-2 h-2 bg-arc-blue rounded-full shadow-[0_0_10px_var(--color-arc-blue)]"
      />

      {/* Target Crosshair on hover */}
      {isHovering && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute w-12 h-12"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-arc-blue" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-arc-blue" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-arc-blue" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-arc-blue" />
        </motion.div>
      )}
    </div>
  );
};

export default CustomCursor;
