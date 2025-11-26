"use client"

import { FloatingShapes } from "@/components/ui/floating-shapes"
import { motion } from "framer-motion"
import { useIsMobile } from "@/components/ui/use-mobile"

export function SectionBackground() {
    const isMobile = useIsMobile()
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
            <FloatingShapes />

            {/* Dynamic Aurora Effect - disabled on mobile */}
            {!isMobile && (
                <>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                            rotate: [0, 45, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[80px] mix-blend-screen will-change-transform"
                        suppressHydrationWarning
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2],
                            x: [0, -50, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[80px] mix-blend-screen will-change-transform"
                        suppressHydrationWarning
                    />
                </>
            )}

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0.1_260/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0.1_260/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" suppressHydrationWarning />
        </div>
    )
}
