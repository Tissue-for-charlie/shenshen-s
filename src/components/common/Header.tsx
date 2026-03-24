import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Music, User, Award, Video, Image as ImageIcon, Smile, Users, TrendingUp } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { name: '首页', path: '/', icon: TrendingUp },
    { name: '个人简介', path: '/profile', icon: User },
    { name: '音乐播放', path: '/music', icon: Music },
    { name: '演艺之路', path: '/career', icon: Award },
    { name: '获奖统计', path: '/awards', icon: Video },
    { name: '近期视频', path: '/videos', icon: Video },
    { name: '图片画廊', path: '/gallery', icon: ImageIcon },
    { name: '表情包', path: '/memes', icon: Smile },
    { name: '粉丝混剪', path: '/fanworks', icon: Users },
]

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={cn(
            "fixed left-0 top-0 z-50 w-full px-4 py-4 transition-all duration-500 md:px-8",
            scrolled ? "py-2" : "py-4"
        )}>
            <div className={cn(
                "mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md transition-all duration-300",
                scrolled && "bg-white/15 shadow-lg shadow-blue-500/10"
            )}>
                {/* Logo */}
                <Link to="/" className="group flex items-center space-x-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white shadow-lg transition-transform group-hover:scale-110">
                        <span className="text-xl font-bold italic">周</span>
                    </div>
                    <span className="hidden text-xl font-bold tracking-tight text-white md:block">ZHOU SHEN</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center space-x-1 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                                location.pathname === item.path ? "text-white" : "text-white/60"
                            )}
                        >
                            {location.pathname === item.path && (
                                <motion.div
                                    layoutId="nav-active"
                                    className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-[#00B4D8]/20 to-[#0077B6]/20 backdrop-blur-sm"
                                />
                            )}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute left-0 top-full mt-4 w-full px-4 lg:hidden"
                    >
                        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                            <div className="flex flex-col space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center space-x-3 rounded-2xl px-4 py-3 transition-all",
                                            location.pathname === item.path
                                                ? "bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white shadow-lg"
                                                : "text-white/70 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        <item.icon size={18} />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
