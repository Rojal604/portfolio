"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { GlowCard } from "@/components/ui/glow-card"
import { SectionBackground } from "@/components/ui/section-background"
import { useIsMobile } from "@/components/ui/use-mobile"
import { getAssetPath } from "@/lib/utils"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = useIsMobile()
  const projectsPerPage = 3

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern, full-stack e-commerce solution featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
      tech: ["Next.js", "Stripe", "Prisma", "Tailwind CSS"],
      image: getAssetPath("/ecommerce-platform.png"),
      demo: "https://rojal604.github.io/project-5/",
      github: "#",
      highlights: ["Secure Stripe Integration", "Real-time Inventory", "Admin Dashboard", "Responsive Design"],
    },
    {
      title: "Restaurant Website",
      description: "A stunning restaurant website with online reservation system, interactive menu, and seamless ordering experience. Features beautiful food photography and smooth animations.",
      tech: ["React", "Node.js", "MongoDB", "Express.js"],
      image: getAssetPath("/restaurant-website.png"),
      demo: "https://rojal604.github.io/project-3/",
      github: "#",
      highlights: ["Online Reservations", "Interactive Menu", "Order Management", "Mobile Responsive"],
    },
    {
      title: "Corporate Business Website",
      description: "Professional corporate website featuring company portfolio, team profiles, and client testimonials. Built with modern design principles and optimized for conversions.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
      image: getAssetPath("/corporate-website.png"),
      demo: "https://rojal604.github.io/project-4/",
      github: "#",
      highlights: ["SEO Optimized", "CMS Integration", "Contact Forms", "Performance Focused"],
    },
    {
      title: "Portfolio Website",
      description: "A creative portfolio website showcasing projects with smooth animations, interactive elements, and modern design. Features project filtering, contact form, and responsive layout.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      image: getAssetPath("/portfolio-website.png"),
      demo: "https://rojal604.github.io/project-2/",
      github: "#",
      highlights: ["Smooth Animations", "Project Filtering", "Contact Integration", "Fast Performance"],
    },
  ]

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = currentPage * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = isMobile ? projects : projects.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section id="projects" className="sticky top-0 min-h-screen relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden bg-background dark:bg-gradient-to-b dark:from-gray-900 dark:via-[#0b0b0f] dark:to-black">

      <div
        className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 -z-20 hidden dark:block"
        style={{ backgroundImage: `url('${getAssetPath("/grid.svg")}')` }}
      />

      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                Selected <span className="text-gradient">Works</span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-base sm:text-lg leading-relaxed">
                A showcase of technical prowess and creative problem-solving.
                Each project represents a unique challenge overcome with code.
              </p>
            </div>
            {/* Mobile pagination removed as per request to show all projects */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <span className="text-sm font-mono text-primary/50">
                {String(currentPage + 1).padStart(2, '0')} — {String(totalPages).padStart(2, '0')}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </RevealOnScroll >

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-1000"
          >
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 100, damping: 20 },
                  },
                }}
                className="h-full"
              >
                <div onClick={() => setSelectedProject(startIndex + index)} className="cursor-pointer h-full">
                  <GlowCard className="h-full" enableTilt glowColor="rgba(124, 58, 237, 0.3)">
                    <div className="relative h-full flex flex-col">
                      {/* Image Container */}
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <motion.img
                          src={project.image || getAssetPath("/placeholder.svg")}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />

                        {/* Floating Action Button */}
                        <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 relative z-20 flex-1 flex flex-col bg-card/50 backdrop-blur-sm">
                        <div className="mb-auto">
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            {project.tech.map((t) => (
                              <span key={t} className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {t}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div >

      {/* Project Detail Modal */}
      <AnimatePresence>
        {
          selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                layoutId={`project-${selectedProject}`}
                className="w-full max-w-5xl bg-background border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-56 sm:h-64 lg:h-auto lg:min-h-[400px]">
                    <img
                      src={projects[selectedProject].image || getAssetPath("/placeholder.svg")}
                      alt={projects[selectedProject].title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r" />
                  </div>

                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-8 lg:right-8 p-2 hover:bg-muted/50 rounded-full transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Close modal"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gradient">
                      {projects[selectedProject].title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                      {projects[selectedProject].description}
                    </p>

                    <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                      <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-primary">Key Highlights</h4>
                      <ul className="grid grid-cols-1 gap-2 sm:gap-3">
                        {projects[selectedProject].highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-foreground/80">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                      <a
                        href={projects[selectedProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-bold text-center hover:bg-primary/90 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 min-h-[48px] text-sm sm:text-base"
                      >
                        <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                        Live Demo
                      </a>
                      <a
                        href={projects[selectedProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-secondary text-secondary-foreground rounded-xl font-bold text-center hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                      >
                        <Github size={18} className="sm:w-5 sm:h-5" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </section >
  )
}
