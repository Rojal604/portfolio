"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"

export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const [deviceTier, setDeviceTier] = useState<"high" | "medium" | "low">("high")

  useEffect(() => {
    // Detect device capabilities
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) {
      setDeviceTier("low")
      return
    }

    const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info")
    const renderer = debugInfo ? (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ""

    // Simple device tier detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = isMobile || renderer.toLowerCase().includes("intel")

    if (isLowEnd) {
      setDeviceTier("low")
    } else if (isMobile) {
      setDeviceTier("medium")
    }
  }, [])

  return { fps, deviceTier }
}

export function PerformanceMonitor({ children }: { children: (tier: "high" | "medium" | "low") => React.ReactNode }) {
  const { deviceTier } = usePerformanceMonitor()
  return <>{children(deviceTier)}</>
}

export function FPSMonitor() {
  const [fps, setFps] = useState(60)

  useFrame((state) => {
    setFps(Math.round(1 / state.clock.getDelta()))
  })

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border text-sm font-mono z-50">
      FPS: {fps}
    </div>
  )
}
