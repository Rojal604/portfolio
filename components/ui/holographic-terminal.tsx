"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Terminal, Circle } from "lucide-react"

const codeSnippet = `class Rojal {
  constructor() {
    this.name = "Rojal Maharjan";
    this.role = "Full Stack Developer";
    this.skills = [
      "React", "Next.js",
      "Three.js", "WebGL",
      "Node.js", "TypeScript"
    ];
  }

  createMagic() {
    return "✨ Immersive Experiences";
  }
}`

export default function HolographicTerminal() {
    const [text, setText] = useState("")
    const [cursorVisible, setCursorVisible] = useState(true)

    // Tilt Logic
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // Typing Effect
    useEffect(() => {
        let i = 0
        const timer = setInterval(() => {
            setText(codeSnippet.slice(0, i))
            i++
            if (i > codeSnippet.length) clearInterval(timer)
        }, 30)
        return () => clearInterval(timer)
    }, [])

    // Cursor Blink
    useEffect(() => {
        const timer = setInterval(() => {
            setCursorVisible((v) => !v)
        }, 500)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="flex items-center justify-center h-[500px] perspective-1000">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl group"
            >
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                {/* Header */}
                <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <Terminal size={12} />
                        <span>developer.ts</span>
                    </div>
                    <div className="w-12" /> {/* Spacer for balance */}
                </div>

                {/* Content */}
                <div className="relative p-6 font-mono text-sm leading-relaxed">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                    <pre className="text-primary/90 whitespace-pre-wrap relative z-10">
                        <code dangerouslySetInnerHTML={{
                            __html: text.replace(
                                /class|constructor|this|return|new/g,
                                match => `<span class="text-accent">${match}</span>`
                            ).replace(
                                /".*"/g,
                                match => `<span class="text-green-400">${match}</span>`
                            )
                        }} />
                        {cursorVisible && <span className="inline-block w-2 h-4 bg-primary ml-1 align-middle" />}
                    </pre>
                </div>

                {/* Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </motion.div>
        </div>
    )
}
