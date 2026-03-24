import React from 'react'
import { Link } from 'react-router-dom'
import { Music, Youtube, Twitter, Instagram, Globe } from 'lucide-react'
import { GlassCard } from './GlassCard'

export const Footer: React.FC = () => {
    return (
        <footer className="mt-20 border-t border-white/10 bg-black/20 pb-12 pt-12 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white shadow-xl">
                                <span className="text-2xl font-bold italic">周</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">ZHOU SHEN</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-white/60">
                            用天籁之声治愈人心，在音乐世界中探索无限可能。
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white">快速导航</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link to="/profile" className="text-sm text-white/60 transition-colors hover:text-white">个人简介</Link>
                            <Link to="/music" className="text-sm text-white/60 transition-colors hover:text-white">音乐播放</Link>
                            <Link to="/career" className="text-sm text-white/60 transition-colors hover:text-white">演艺之路</Link>
                            <Link to="/gallery" className="text-sm text-white/60 transition-colors hover:text-white">图片画廊</Link>
                        </nav>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white">粉丝专区</h4>
                        <nav className="flex flex-col space-y-2">
                            <Link to="/memes" className="text-sm text-white/60 transition-colors hover:text-white">表情包合集</Link>
                            <Link to="/fanworks" className="text-sm text-white/60 transition-colors hover:text-white">粉丝混剪</Link>
                            <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">官方后援会</a>
                        </nav>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white">关注周深</h4>
                        <div className="flex space-x-3">
                            {[Music, Youtube, Instagram, Globe].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-lg"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-white/10 pt-8 md:flex-row md:space-y-0">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} ZHOU SHEN Official Fan Site. Created with ❤️ for Zhou Shen.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-xs text-white/40 hover:text-white/60">隐私政策</a>
                        <a href="#" className="text-xs text-white/40 hover:text-white/60">使用条款</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
