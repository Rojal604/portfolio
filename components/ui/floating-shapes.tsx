"use client"

import { motion } from "framer-motion"

export const FloatingShapes = () => {
    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
            suppressHydrationWarning
        >
            {/* Circle 1 - Primary */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[15%] left-[10%] w-32 h-32 md:w-64 md:h-64 rounded-full border border-primary/10 bg-primary/5 blur-2xl"
                suppressHydrationWarning
            />

            {/* Circle 2 - Secondary */}
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -15, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-[20%] right-[5%] w-40 h-40 md:w-80 md:h-80 rounded-full border border-secondary/10 bg-secondary/5 blur-3xl"
                suppressHydrationWarning
            />

            {/* Square - Accent */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    rotate: [45, 90, 45],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[40%] right-[15%] w-20 h-20 md:w-40 md:h-40 border border-accent/10 bg-accent/5 blur-xl rotate-45"
                suppressHydrationWarning
            />

            {/* Triangle - Muted */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[10%] left-[20%] w-16 h-16 md:w-32 md:h-32 bg-muted-foreground/5 blur-lg"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                suppressHydrationWarning
            />
        </div>
    )
}
