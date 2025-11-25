"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder, Text } from "@react-three/drei"
import type * as THREE from "three"

interface SkillBarProps {
  position: [number, number, number]
  height: number
  label: string
  color: string
}

function SkillBar({ position, height, label, color }: SkillBarProps) {
  const barRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (barRef.current) {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      barRef.current.scale.y = scale
    }
  })

  return (
    <group position={position}>
      <Cylinder ref={barRef} args={[0.3, 0.3, height, 32]} position={[0, height / 2, 0]}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} emissive={color} emissiveIntensity={0.2} />
      </Cylinder>
      <Text position={[0, -0.5, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  )
}

export default function SkillsVisualization() {
  const skills = [
    { label: "React", height: 3.8, position: [-4, 0, 0] as [number, number, number], color: "#8b5cf6" },
    { label: "CSS3", height: 3.6, position: [-2, 0, 0] as [number, number, number], color: "#4f46e5" },
    { label: "TypeScript", height: 3.7, position: [0, 0, 0] as [number, number, number], color: "#8b5cf6" },
    { label: "Framer Motion", height: 3.5, position: [2, 0, 0] as [number, number, number], color: "#4f46e5" },
    { label: "Node.js", height: 3.4, position: [4, 0, 0] as [number, number, number], color: "#8b5cf6" },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#8b5cf6" />

      {skills.map((skill, index) => (
        <SkillBar key={index} {...skill} />
      ))}
    </>
  )
}
