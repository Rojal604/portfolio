"use client"
import { useState, useEffect } from "react"
import { TextReveal } from "@/components/ui/text-reveal"
import { FloatingShapes } from "@/components/ui/floating-shapes"
import MagneticButton from "@/components/magnetic-button"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center perspective-1000 dark:bg-background">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
          suppressHydrationWarning
        >
          <span className="inline-flex items-center gap-2 py-2 px-4 sm:px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono text-primary tracking-wide shadow-[0_0_20px_-5px_var(--primary)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="hidden xs:inline">Available for freelance work</span>
            <span className="xs:hidden">Available</span>
          </span>
        </motion.div>

        <div className="mb-6 sm:mb-8 flex flex-col items-center gap-0 px-2" suppressHydrationWarning>
          <TextReveal
            text="Crafting Digital"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-foreground leading-[0.9]"
            delay={0.2}
          />
          <TextReveal
            text="Masterpieces"
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-gradient leading-[0.9] pb-4"
            delay={0.6}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-4"
        >
          I build immersive, high-performance web experiences that blend
          <span className="text-primary font-medium"> artistic vision</span> with
          <span className="text-accent font-medium"> technical excellence</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center w-full sm:w-auto px-4 sm:px-0"
          suppressHydrationWarning
        >
          <MagneticButton
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-4 sm:py-4 bg-primary text-primary-foreground rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_var(--primary)] w-full sm:w-auto min-h-[48px]"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" suppressHydrationWarning />
          </MagneticButton>
          <MagneticButton
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 sm:py-4 bg-transparent border border-white/10 text-foreground rounded-full font-bold text-base sm:text-lg hover:bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-primary/50 w-full sm:w-auto min-h-[48px]"
          >
            Contact Me
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        suppressHydrationWarning
      >
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary"
          suppressHydrationWarning
        >
          <ArrowDown size={20} className="sm:w-6 sm:h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
