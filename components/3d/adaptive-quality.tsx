"use client"

import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { usePerformanceMonitor } from "@/lib/performance-monitor"
import type * as THREE from "three"

export default function AdaptiveQuality() {
  const { gl, scene } = useThree()
  const { deviceTier } = usePerformanceMonitor()

  useEffect(() => {
    // Adjust renderer settings based on device tier
    switch (deviceTier) {
      case "low":
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1))
        gl.shadowMap.enabled = false
        break
      case "medium":
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        gl.shadowMap.enabled = true
        break
      case "high":
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.shadowMap.enabled = true
        break
    }

    // Traverse scene and adjust quality
    scene.traverse((object) => {
      if ("material" in object && object.material) {
        const material = object.material as THREE.Material
        if (deviceTier === "low") {
          material.precision = "lowp"
        }
      }
    })
  }, [deviceTier, gl, scene])

  return null
}
