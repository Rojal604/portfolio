"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Briefcase, Calendar, Download } from "lucide-react"
import { GlowCard } from "@/components/ui/glow-card"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { SectionBackground } from "@/components/ui/section-background"

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const experiences = [
    {
      year: "2025 - Present",
      title: "Senior 3D Web Developer",
      company: "Creative Studio",
      location: "Remote",
      description:
        "Leading development of immersive 3D web experiences for Fortune 500 clients. Architecting scalable WebGL applications and mentoring junior developers.",
      achievements: [
        "Reduced load times by 60% through optimization",
        "Led team of 5 developers on major projects",
        "Implemented CI/CD pipeline for 3D assets",
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "WebGL", "TypeScript"],
    },
    {
      year: "2024 - 2025",
      title: "Full Stack Developer",
      company: "Tech Startup",
      location: "Remote",
      description:
        "Built scalable web applications with modern frameworks. Developed RESTful APIs and implemented real-time features using WebSockets.",
      achievements: [
        "Launched 3 major product features",
        "Improved API response time by 40%",
        "Implemented automated testing suite",
      ],
      technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
    },
    {
      year: "2022 - 2024",
      title: "Frontend Developer",
      company: "Digital Agency",
      location: "Remote",
      description:
        "Developed responsive websites and interactive experiences for diverse clients. Collaborated with designers to bring creative visions to life.",
      achievements: [
        "Delivered 20+ client projects",
        "Achieved 95+ Lighthouse scores",
        "Established component library",
      ],
      technologies: ["React", "Vue.js", "SASS", "Webpack", "Figma"],
    },
  ]

  return (
    <section id="experience" className="sticky top-0 relative min-h-screen py-16 sm:py-20 px-4 sm:px-6 overflow-hidden dark:bg-gradient-to-b dark:from-black dark:via-[#0b0b0f] dark:to-gray-900">


      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-3 sm:mb-4 text-center">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 sm:mb-16 max-w-2xl mx-auto text-base sm:text-lg px-4">
            A journey through innovative companies and challenging projects that shaped my expertise
          </p>
        </RevealOnScroll>

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-purple-500 to-blue-500 origin-top"
          />
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/10 -z-10" />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row gap-6 sm:gap-8 
                  ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } group`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-background rounded-full border-3 sm:border-4 border-primary z-10 shadow-[0_0_10px_var(--primary)]"
                />

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  className={`flex-1 ml-12 sm:ml-14 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                >
                  <GlowCard className="p-4 sm:p-6 h-full bg-card/50 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.01]">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 flex-shrink-0">
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-sans font-bold text-foreground leading-tight">{exp.title}</h3>
                          <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-secondary/50 border border-secondary">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="text-xs sm:text-sm">{exp.year}</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-secondary/50 border border-secondary">
                        <span className="text-xs sm:text-sm">📍 {exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-sans font-bold mb-2 sm:mb-3 text-foreground uppercase tracking-wider">Key Achievements</h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_5px_var(--accent)]" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 bg-primary/5 text-primary text-[10px] sm:text-xs rounded-full font-medium border border-primary/10 hover:bg-primary/10 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.6}>
          <div className="mt-12 sm:mt-20 text-center px-4">
            <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg">Want to know more about my experience?</p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-sans font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] text-sm sm:text-base min-h-[48px]"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              Download Resume
            </motion.a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
