"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { MouseEvent, useRef } from "react"
import { cn } from "@/lib/utils"

export const GlowCard = ({
    children,
    className,
    glowColor = "rgba(139, 92, 246, 0.5)", // Primary purple with opacity
    enableTilt = false,
}: {
    children: React.ReactNode
    className?: string
    glowColor?: string
    enableTilt?: boolean
}) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Tilt state
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

    function handleMouseMove(e: MouseEvent) {
        const { currentTarget, clientX, clientY } = e
        const { left, top, width, height } = currentTarget.getBoundingClientRect()

        mouseX.set(clientX - left)
        mouseY.set(clientY - top)

        if (enableTilt) {
            const pctX = (clientX - left) / width - 0.5
            const pctY = (clientY - top) / height - 0.5
            x.set(pctX)
            y.set(pctY)
        }
    }

    function handleMouseLeave() {
        if (enableTilt) {
            x.set(0)
            y.set(0)
        }
    }

    const Component = enableTilt ? motion.div : "div"

    return (
        <Component
            ref={ref}
            className={cn(
                "group relative border border-border bg-card text-card-foreground overflow-hidden rounded-xl",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={enableTilt ? {
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            } : undefined}
        >
            {/* Main spotlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 60%
            )
          `,
                }}
            />
            {/* Secondary glow layer for depth */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 70%
            )
          `,
                }}
            />
            <div className="relative h-full transform-style-3d">{children}</div>
        </Component>
    )
}
