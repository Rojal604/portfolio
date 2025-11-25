"use client"

import { useRef, useState } from 'react'

interface TiltedCardProps {
    imageSrc: React.ComponentProps<'img'>['src']
    altText?: string
    captionText?: string
    containerHeight?: React.CSSProperties['height']
    containerWidth?: React.CSSProperties['width']
    imageHeight?: React.CSSProperties['height']
    imageWidth?: React.CSSProperties['width']
    scaleOnHover?: number
    rotateAmplitude?: number
    showMobileWarning?: boolean
    showTooltip?: boolean
    overlayContent?: React.ReactNode
    displayOverlayContent?: boolean
}

export default function TiltedCard({
    imageSrc,
    altText = 'Tilted card image',
    captionText = '',
    containerHeight = '300px',
    containerWidth = '100%',
    imageHeight = '300px',
    imageWidth = '300px',
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = true,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const [scale, setScale] = useState(1)
    const [opacity, setOpacity] = useState(0)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, rotate: 0 })

    function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left - rect.width / 2
        const offsetY = e.clientY - rect.top - rect.height / 2

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

        setRotateX(rotationX)
        setRotateY(rotationY)

        setTooltipPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            rotate: -((offsetY - (tooltipPos.y - (rect.height / 2))) * 0.1) // Simple tilt approximation
        })
    }

    function handleMouseEnter() {
        setScale(scaleOnHover)
        setOpacity(1)
    }

    function handleMouseLeave() {
        setOpacity(0)
        setScale(1)
        setRotateX(0)
        setRotateY(0)
    }

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-center perspective-[1000px]"
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-xs z-10 backdrop-blur-md border border-white/10">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <div
                className="relative overflow-hidden rounded-2xl shadow-2xl preserve-3d transition-all duration-100 ease-out will-change-transform"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: "preserve-3d"
                }}
            >
                <img
                    src={imageSrc}
                    alt={altText}
                    className="block object-cover rounded-2xl select-none w-full h-full"
                />

                {displayOverlayContent && overlayContent && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        {overlayContent}
                    </div>
                )}
            </div>

            {showTooltip && (
                <div
                    className="absolute bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm pointer-events-none whitespace-nowrap z-20 shadow-lg border border-white/10 transition-opacity duration-200"
                    style={{
                        left: 0,
                        top: 0,
                        transform: `translate(${tooltipPos.x}px, ${tooltipPos.y}px) rotate(${tooltipPos.rotate}deg)`,
                        opacity: opacity
                    }}
                >
                    {captionText}
                </div>
            )}
        </div>
    )
}
