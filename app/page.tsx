"use client"
import { useEffect, Suspense, lazy, useState } from "react"
import Hero from "@/components/sections/hero"
import ScrollAnimations from "@/components/scroll-animations"
import Navigation from "@/components/navigation"
import SmoothScroll from "@/components/smooth-scroll"
import LoadingScreen from "@/components/loading-screen"
import { SectionBackground } from "@/components/ui/section-background"
import { use3DStore } from "@/lib/use-3d-store"

const About = lazy(() => import("@/components/sections/about"))
const Skills = lazy(() => import("@/components/sections/skills"))
const Projects = lazy(() => import("@/components/sections/projects"))
const Experience = lazy(() => import("@/components/sections/experience"))
const Contact = lazy(() => import("@/components/sections/contact"))

export default function Home() {
  const setScrollProgress = use3DStore((state) => state.setScrollProgress)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setScrollProgress, mounted])

  useEffect(() => {
    // Preload fonts
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        console.log("Fonts loaded")
      })
    }
  }, [])

  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <ScrollAnimations />
        <Navigation />

        {/* Global Fixed Background (Light Mode Only) */}
        <div className="fixed inset-0 -z-50 dark:hidden" suppressHydrationWarning>
          <SectionBackground />
        </div>

        <main className="relative w-full">
          <Hero />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            }
          >
            <About />
            <Skills />
            <Projects />
          </Suspense>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            }
          >
            <Experience />
          </Suspense>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            }
          >
            <Contact />
          </Suspense>
        </main>
      </SmoothScroll>
    </>
  )
}
