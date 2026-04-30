"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Helper to check if an element should trigger the "hovering" state.
 */
const isInteractiveElement = (element) => {
  const interactiveTags = ["BUTTON", "A"];
  const isInteractiveTag = interactiveTags.includes(element.tagName);
  const isInteractiveRole = element.getAttribute("role") === "button";
  const hasInteractiveParent = element.closest("button") || element.closest("a");
  
  return isInteractiveTag || isInteractiveRole || hasInteractiveParent;
};

// Common transform for centering elements on the mouse
const centerTransform = { translateX: "-50%", translateY: "-50%" };

const OuterRing = ({ x, y, isHovering, isClicked }) => (
  <motion.div
    style={{ x, y, ...centerTransform }}
    animate={{
      scale: isHovering ? 2 : isClicked ? 0.8 : 1,
      borderColor: isHovering ? "var(--color-arc-blue)" : "var(--color-stark-gold)",
      borderWidth: isHovering ? "1px" : "2px",
    }}
    className="absolute w-10 h-10 rounded-full border-2 border-stark-gold opacity-50"
  >
    {/* Animated inner rotating ring */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-full h-full border-t border-b border-arc-blue/30 rounded-full"
      />
    </div>
  </motion.div>
);

const CenterDot = ({ x, y, isHovering }) => (
  <motion.div
    style={{ x, y, ...centerTransform }}
    animate={{
      scale: isHovering ? 0.5 : 1,
      backgroundColor: isHovering ? "var(--color-marvel-red)" : "var(--color-arc-blue)",
    }}
    className="absolute w-2 h-2 bg-arc-blue rounded-full shadow-[0_0_10px_var(--color-arc-blue)]"
  />
);

const Crosshair = ({ x, y }) => (
  <motion.div
    style={{ x, y, ...centerTransform }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    className="absolute w-12 h-12"
  >
    {/* Top, Bottom, Left, Right markers */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-arc-blue" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-arc-blue" />
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-arc-blue" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-arc-blue" />
  </motion.div>
);

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth lag effect for the outer ring
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

    const handleMouseOver = (e) => {
      if (isInteractiveElement(e.target)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Attach listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on mobile or before mouse moves
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <OuterRing x={ringX} y={ringY} isHovering={isHovering} isClicked={isClicked} />
      <CenterDot x={mouseX} y={mouseY} isHovering={isHovering} />
      {isHovering && <Crosshair x={mouseX} y={mouseY} />}
    </div>
  );
};

export default CustomCursor;
