"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const duration = 2500 // 2.5 seconds loading time
    const intervalTime = 20
    const steps = duration / intervalTime
    const increment = 100 / steps

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 800) // Wait a bit at 100%
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [mounted])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Custom bezier for "premium" feel
            },
          }}
        >
          {/* Background Elements for Texture */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full" />
          </div>

          <div className="z-10 flex flex-col items-center relative">
            {/* Main Counter */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-8xl md:text-9xl font-bold font-sans tracking-tighter"
              >
                {Math.round(progress)}
                <span className="text-4xl md:text-5xl text-primary align-top ml-2">%</span>
              </motion.div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 h-8 overflow-hidden flex flex-col items-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm uppercase tracking-[0.2em] text-white/50 font-medium"
              >
                {progress < 40
                  ? "Initializing Assets"
                  : progress < 70
                    ? "Loading 3D Environment"
                    : "Preparing Experience"}
              </motion.p>
            </div>

            {/* Progress Bar Line */}
            <motion.div
              className="absolute -bottom-12 left-0 right-0 h-[1px] bg-white/10 w-64 mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-primary"
                style={{ width: "100%" }}
                initial={{ x: "-100%" }}
                animate={{ x: `${progress - 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
