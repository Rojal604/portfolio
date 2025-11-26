"use client"

import type React from "react"
import { motion } from "framer-motion"

interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  once?: boolean
  margin?: string
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = false,
  margin = "0px",
}: RevealOnScrollProps) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: margin as any, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
