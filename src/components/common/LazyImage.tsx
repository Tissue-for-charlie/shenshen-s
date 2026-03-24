import React, { useState, useEffect } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface LazyImageProps {
    src: string
    alt: string
    className?: string
    placeholderSrc?: string
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className,
    placeholderSrc = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=placeholder%20image&image_size=square"
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(placeholderSrc)

    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => {
            setIsLoaded(true)
            setCurrentSrc(src)
        }
    }, [src])

    return (
        <div className={cn("relative overflow-hidden bg-white/5", className)}>
            <img
                src={currentSrc}
                alt={alt}
                className={cn(
                    "h-full w-full object-cover transition-opacity duration-700",
                    isLoaded ? "opacity-100" : "opacity-30 blur-sm"
                )}
            />
        </div>
    )
}
