import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface GlassCardProps {
    children: React.ReactNode
    className?: string
    hoverEffect?: boolean
    onClick?: () => void
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    hoverEffect = true,
    onClick
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300",
                hoverEffect && "hover:border-white/40 hover:bg-white/15 hover:shadow-2xl hover:shadow-blue-500/10",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
