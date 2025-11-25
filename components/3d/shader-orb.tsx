"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, OrbitControls } from "@react-three/drei"
import { useSpring, a } from "@react-spring/three"
import * as THREE from "three"

const AnimatedSphere = () => {
    const sphereRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    // Spring animation for hover effect
    const { scale, distort, color } = useSpring({
        scale: hovered ? 2.8 : 2.2,
        distort: hovered ? 0.6 : 0.4,
        color: hovered ? "#8b5cf6" : "#4c1d95", // Primary purple to darker purple
        config: { mass: 1, tension: 280, friction: 60 },
    })

    useFrame((state) => {
        if (sphereRef.current) {
            // Gentle rotation
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
        }
    })

    return (
        <a.mesh
            ref={sphereRef}
            scale={scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Sphere args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color={color as any}
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                >
                    {/* @ts-ignore - distort prop is handled by spring but types can be tricky */}
                    <a.primitive object={THREE.Material} attach="material" distort={distort} speed={4} />
                </MeshDistortMaterial>
            </Sphere>
        </a.mesh>
    )
}

export default function ShaderOrb() {
    return (
        <div className="w-full h-[500px] relative flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

                <AnimatedSphere />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </Canvas>

            {/* Overlay Text */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-sm font-mono text-primary/80 tracking-widest uppercase">
                    Interactive Core
                </p>
            </div>
        </div>
    )
}
