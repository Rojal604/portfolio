"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus, Float, MeshDistortMaterial, Icosahedron, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"
import type * as THREE from "three"

export default function AboutScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#ffffff" />

      {/* Floating geometric shapes */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <Box args={[0.8, 0.8, 0.8]} position={[-2, 1, 0]}>
          <meshPhysicalMaterial
            color="#8b5cf6"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <Sphere args={[0.6, 32, 32]} position={[2, -0.5, 0]}>
          <MeshDistortMaterial
            color="#4f46e5"
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={0.8}>
        <Torus args={[0.5, 0.2, 16, 32]} position={[0, -1.5, 0]}>
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            transmission={0.5}
            thickness={1}
          />
        </Torus>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5}>
        <Icosahedron args={[0.4, 0]} position={[1.5, 2, -1]}>
          <meshPhysicalMaterial
            color="#ec4899"
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </Icosahedron>
      </Float>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </group>
  )
}
