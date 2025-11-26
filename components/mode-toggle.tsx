"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

// Utility to detect mobile devices
const isMobileDevice = () => {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0)
}

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    const toggleTheme = async () => {
        const isDark = theme === "dark"
        const nextTheme = isDark ? "light" : "dark"

        // @ts-ignore - View Transitions API is not yet in all TS definitions
        if (!document.startViewTransition) {
            setTheme(nextTheme)
            return
        }

        // Skip expensive animation on mobile devices for better performance
        const isMobile = isMobileDevice()

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme(nextTheme)
        })

        // Skip circular reveal animation on mobile
        if (isMobile) {
            return
        }

        // @ts-ignore
        await transition.ready

        const x = window.innerWidth / 2
        const y = window.innerHeight / 2
        const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 400, // Reduced from 700ms for faster animation
                easing: "ease-in-out",
                // Specify which pseudo-element to animate
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
        </motion.button>
    )
}
