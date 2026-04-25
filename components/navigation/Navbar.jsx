"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, Shield, Cpu, Target, Mail } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Missions", href: "#missions", icon: Target },
  { name: "Dossier", href: "#dossier", icon: Shield },
  { name: "Tech Stack", href: "#tech", icon: Cpu },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? "stark-glass py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-marvel-red rounded-sm rotate-45 group-hover:rotate-180 transition-transform duration-700" />
              <span className="font-bebas text-2xl text-marvel-red z-10">K</span>
            </div>
            <div className="flex flex-col leading-none ml-2">
              <span className="font-bebas text-xl tracking-wider text-text-primary group-hover:text-marvel-red transition-colors">
                KEERTHI
              </span>
              <span className="font-rajdhani text-[10px] tracking-[0.3em] text-text-secondary uppercase">
                Kumar V
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-rajdhani text-sm font-semibold tracking-widest text-text-secondary hover:text-marvel-red uppercase transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-marvel-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* CTA Button */}
            <button className="px-6 py-2 border border-arc-blue/50 bg-arc-blue/5 font-rajdhani text-xs font-bold tracking-[0.2em] text-arc-blue uppercase hover:bg-arc-blue/10 hover:border-arc-blue transition-all hover-glow-blue ml-4">
              Access JARVIS
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-text-primary hover:text-marvel-red transition-colors"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
            links={navLinks}
          />
        )}
      </AnimatePresence>
    </>
  );
}
