"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // 2. Connect Lenis to GSAP ScrollTrigger
    // This is crucial for GSAP ScrollTrigger to know when Lenis is scrolling
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis to GSAP Ticker
    // This makes GSAP and Lenis run in the same animation frame loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable lag smoothing in GSAP (improves sync with Lenis)
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
