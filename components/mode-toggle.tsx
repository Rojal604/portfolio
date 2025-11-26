"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === "dark"
        const nextTheme = isDark ? "light" : "dark"

        // @ts-ignore - View Transitions API is not yet in all TS definitions
        if (!document.startViewTransition) {
            setTheme(nextTheme)
            return
        }

        const x = e.clientX
        const y = e.clientY

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        // @ts-ignore
        const transition = document.startViewTransition(() => {
            setTheme(nextTheme)
        })

        // @ts-ignore
        await transition.ready

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 700,
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
