"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import { projects } from "@/lib/projects-data";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const categories = ["All", ...new Set(projects.map(p => p.category))];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const section = sectionRef.current;
    const horizontal = horizontalRef.current;

    // We need to refresh ScrollTrigger whenever the width changes (due to filtering)
    const updateScroll = () => {
      const totalWidth = horizontal.offsetWidth;
      const viewportWidth = window.innerWidth;
      const scrollAmount = totalWidth - viewportWidth;

      if (scrollAmount <= 0) {
        // If items don't overflow, clear the animation
        gsap.set(horizontal, { x: 0 });
        return null;
      }

      return gsap.to(horizontal, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: `+=${scrollAmount}`,
          scrub: 1,
          invalidateOnRefresh: true,
          id: "projectScroll"
        },
      });
    };

    const ctx = gsap.context(() => {
      let scrollAnim = updateScroll();

      // Watch for changes in window size
      window.addEventListener("resize", () => {
        ScrollTrigger.getById("projectScroll")?.kill();
        scrollAnim = updateScroll();
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getById("projectScroll")?.kill();
    };
  }, [filteredProjects]); // Re-run when filteredProjects changes to recalculate width

  const handleCategoryChange = (cat) => {
    // GSAP Flip for smooth transition
    const state = Flip.getState(".project-card-wrapper");
    setSelectedCategory(cat);
    
    // Wait for state update then flip
    setTimeout(() => {
      Flip.from(state, {
        duration: 0.6,
        scale: true,
        ease: "power2.inOut",
        stagger: 0.05,
        onComplete: () => ScrollTrigger.refresh()
      });
    }, 0);
  };

  const openModal = (project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  return (
    <section 
      ref={sectionRef} 
      id="missions" 
      className="relative overflow-hidden bg-void border-t border-white/5 py-24"
    >
      <div className="min-h-screen flex flex-col justify-center">
        {/* Section Header */}
        <div className="container mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-orbitron text-arc-blue tracking-[0.4em] uppercase">
                Mission Protocols
              </span>
              <h2 className="text-display-md text-text-primary">
                The <span className="text-marvel-red">Missions</span>
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-marvel-red to-transparent mt-2" />
            </div>

            {/* Filter UI */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 text-[10px] font-orbitron tracking-widest uppercase transition-all duration-300 border ${
                    selectedCategory === cat 
                      ? "bg-marvel-red border-marvel-red text-white" 
                      : "bg-void/50 border-white/10 text-text-secondary hover:border-stark-gold hover:text-stark-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Container */}
        <div className="relative w-full overflow-hidden">
          <div 
            ref={horizontalRef} 
            className="flex gap-12 px-6 md:px-24 w-max items-center py-10"
          >
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card-wrapper">
                <ProjectCard 
                  project={project} 
                  index={index} 
                  onOpenModal={openModal}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={activeProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-marvel-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-arc-blue/5 blur-[120px] pointer-events-none" />
      
      {/* Background HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        <span className="text-[20vw] font-bebas tracking-tighter rotate-12 whitespace-nowrap">
          STARK INDUSTRIES MISSION LOGS
        </span>
      </div>
    </section>
  );
}
