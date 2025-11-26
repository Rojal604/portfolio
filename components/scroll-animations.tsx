"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimations() {
  const [mounted, setMounted] = useState(false)
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const initializeScrollTriggers = () => {
    // Clear existing ScrollTriggers
    scrollTriggersRef.current.forEach(trigger => trigger.kill())
    scrollTriggersRef.current = []

    // Animate section titles on scroll
    gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
      const tl = gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.8,
      })
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger)
      }
    })

    // Animate cards with stagger (skip cards already handled by Framer Motion)
    gsap.utils.toArray<HTMLElement>(".animate-card").forEach((card) => {
      // Skip cards that are wrapped in RevealOnScroll or motion.div (Framer Motion handles these)
      const isFramerMotionAnimated = card.closest('[data-framer-motion]') || 
                                   card.closest('.motion-div') ||
                                   card.parentElement?.classList.contains('motion-div') ||
                                   card.parentElement?.closest('[data-framer-motion]')
      
      if (isFramerMotionAnimated) {
        // Skip GSAP animation for Framer Motion cards
        return
      }
      
      // Only animate cards that aren't handled by Framer Motion
      const tl = gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
        opacity: 0,
        y: 80,
        rotateX: -15,
      })
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger)
      }
    })

    // Parallax effect for backgrounds
    gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((bg) => {
      const tl = gsap.to(bg, {
        scrollTrigger: {
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * parseFloat((target as HTMLElement).dataset.speed || "0.5"),
      })
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger)
      }
    })

    // Skill bars animation (skip bars already handled by Framer Motion)
    gsap.utils.toArray<HTMLElement>(".skill-bar").forEach((bar) => {
      // Skip skill bars that are already animated by Framer Motion
      const isFramerMotionAnimated = bar.closest('[data-framer-motion]') || 
                                   bar.closest('.motion-div') ||
                                   bar.parentElement?.classList.contains('motion-div') ||
                                   bar.parentElement?.closest('[data-framer-motion]')
      
      if (isFramerMotionAnimated) {
        // Skip GSAP animation for Framer Motion skill bars
        return
      }
      
      // Only animate skill bars that aren't handled by Framer Motion
      const width = bar.getAttribute("data-width")
      const tl = gsap.from(bar, {
        scrollTrigger: {
          trigger: bar,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        width: "0%",
      })
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger)
      }
    })

    // Timeline items animation (skip ones already handled by Framer Motion)
    gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, index) => {
      const isFramerMotionAnimated =
        item.closest("[data-framer-motion]") ||
        item.closest(".motion-div") ||
        item.parentElement?.classList.contains("motion-div") ||
        item.parentElement?.closest("[data-framer-motion]")

      if (isFramerMotionAnimated) {
        return
      }

      const tl = gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
      })
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger)
      }
    })

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh()
  }

  useEffect(() => {
    if (!mounted) return

    // Initial setup with delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeScrollTriggers, 100)

    // Set up mutation observer to watch for new content (lazy-loaded components)
    observerRef.current = new MutationObserver((mutations) => {
      let shouldRefresh = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any of the added nodes contain elements we want to animate
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.querySelector && (
                element.querySelector('.section-title') ||
                element.querySelector('.animate-card') ||
                element.querySelector('.parallax-bg') ||
                element.querySelector('.skill-bar') ||
                element.querySelector('.timeline-item')
              )) {
                shouldRefresh = true
              }
            }
          })
        }
      })
      
      if (shouldRefresh) {
        // Debounce the refresh to avoid too many calls
        setTimeout(initializeScrollTriggers, 200)
      }
    })

    // Start observing
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      scrollTriggersRef.current.forEach(trigger => trigger.kill())
      scrollTriggersRef.current = []
    }
  }, [mounted])

  if (!mounted) return null

  return null
}
