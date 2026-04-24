"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export default function MobileMenu({ isOpen, onClose, links }) {
  const containerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        damping: 30, 
        stiffness: 200,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      x: "100%",
      transition: { 
        type: "spring", 
        damping: 30, 
        stiffness: 200,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const linkVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[110] stark-glass flex flex-col p-8 md:hidden"
    >
      <div className="flex justify-end mb-12">
        <button
          onClick={onClose}
          className="p-2 text-text-primary hover:text-marvel-red transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      <nav className="flex flex-col gap-8">
        {links.map((link, index) => (
          <motion.div key={link.name} variants={linkVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-6 group"
            >
              <span className="font-rajdhani text-[10px] tracking-[0.5em] text-marvel-red/50 group-hover:text-marvel-red transition-colors">
                0{index + 1}
              </span>
              <span className="font-bebas text-5xl tracking-wider text-text-primary group-hover:text-marvel-red transition-colors uppercase">
                {link.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto pt-12 border-t border-border/30">
        <p className="font-rajdhani text-[10px] tracking-[0.4em] text-text-tertiary uppercase mb-4">
          Emergency Frequency
        </p>
        <p className="font-orbitron text-xs text-arc-blue tracking-widest">
          +1 800 STARK INT
        </p>
      </div>

      {/* Decorative scanlines overlay for mobile menu */}
      <div className="absolute inset-0 pointer-events-none opacity-20 scanlines" />
    </motion.div>
  );
}
