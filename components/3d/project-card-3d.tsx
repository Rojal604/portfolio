"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Text } from "@react-three/drei"
import type * as THREE from "three"

interface ProjectCard3DProps {
  position: [number, number, number]
  title: string
  index: number
}

export default function ProjectCard3D({ position, title, index }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1

      if (hovered) {
        meshRef.current.scale.lerp({ x: 1.1, y: 1.1, z: 1.1 } as THREE.Vector3, 0.1)
      } else {
        meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 } as THREE.Vector3, 0.1)
      }
    }
  })

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2, 2.5, 0.2]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : "#4f46e5"}
          metalness={0.7}
          roughness={0.2}
          emissive={hovered ? "#8b5cf6" : "#4f46e5"}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </RoundedBox>
      <Text position={[0, 0, 0.15]} fontSize={0.25} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={1.8}>
        {title}
      </Text>
    </group>
  )
}
