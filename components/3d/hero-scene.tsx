"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Environment, Sparkles, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import type * as THREE from "three"
import * as THREE_NS from "three"
import { useIsMobile } from "@/components/ui/use-mobile"

export default function HeroScene() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const isMobile = useIsMobile()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.2
      sphereRef.current.rotation.y = time * 0.3
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
      particlesRef.current.rotation.x = time * 0.02
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.1
      torusRef.current.rotation.y = time * 0.15
    }
  })

  // Create particles with better distribution
  const particlesCount = isMobile ? 400 : 1500
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 8 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#8b5cf6" castShadow />

      {/* Environment map for reflections */}
      <Environment preset="city" />

      {/* Main distorted sphere with enhanced material */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]} castShadow>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            emissive="#4f46e5"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      {/* Orbiting torus */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh ref={torusRef} position={[3, 0, 0]}>
          <torusGeometry args={[0.5, 0.2, 32, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE_NS.AdditiveBlending}
        />
      </points>

      {/* Sparkles for extra magic */}
      <Sparkles count={100} scale={10} size={2} speed={0.4} color="#8b5cf6" />

      {/* Post-processing effects - disabled on mobile for performance */}
      {!isMobile && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.001, 0.001] as [number, number]} />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      )}

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}
