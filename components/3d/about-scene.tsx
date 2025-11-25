"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus, Float, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

export default function AboutScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />

      {/* Floating geometric shapes */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Box args={[0.8, 0.8, 0.8]} position={[-2, 1, 0]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.7}>
        <Sphere args={[0.6, 32, 32]} position={[2, -0.5, 0]}>
          <MeshDistortMaterial color="#4f46e5" distort={0.3} speed={2} metalness={0.9} roughness={0.1} />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
        <Torus args={[0.5, 0.2, 16, 32]} position={[0, -1.5, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.3} />
        </Torus>
      </Float>
    </group>
  )
}
