"use client"

import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { use3DStore } from "@/lib/use-3d-store"

export default function ScrollControlledCamera() {
  const { camera } = useThree()
  const scrollProgress = use3DStore((state) => state.scrollProgress)

  useEffect(() => {
    // Animate camera based on scroll
    const targetZ = 5 - scrollProgress * 3
    const targetY = scrollProgress * 2
    const targetX = Math.sin(scrollProgress * Math.PI * 2) * 0.5

    camera.position.z = targetZ
    camera.position.y = targetY
    camera.position.x = targetX
    camera.lookAt(0, 0, 0)
  }, [scrollProgress, camera])

  return null
}
