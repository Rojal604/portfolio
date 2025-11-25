"use client"

import type React from "react"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"

interface LazyCanvasProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
}

export default function LazyCanvas({ children, fallback, threshold = 0.1 }: LazyCanvasProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, threshold])

  return (
    <div ref={setRef} className="w-full h-full">
      {isVisible ? (
        <Canvas>
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        fallback || <div className="w-full h-full bg-card/30 animate-pulse" />
      )}
    </div>
  )
}
