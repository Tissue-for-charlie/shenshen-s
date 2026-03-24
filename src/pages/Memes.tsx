import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { LazyImage } from '../components/common/LazyImage'
import { Search, Download, Tag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Meme {
    id: string
    title: string
    image_url: string
    tags: string[]
    download_count: number
}

const Memes: React.FC = () => {
    const [memes, setMemes] = useState<Meme[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchMemes = async () => {
            const { data, error } = await supabase.from('memes').select('*').order('created_at', { ascending: false })
            if (!error && data) setMemes(data)
            setLoading(false)
        }
        fetchMemes()
    }, [])

    const filteredMemes = memes.filter(meme =>
        meme.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meme.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    if (loading) return null

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <h2 className="mb-8 text-center text-4xl font-bold md:text-5xl">表情包合集</h2>

            {/* Search Bar */}
            <div className="mx-auto mb-12 max-w-2xl">
                <GlassCard className="flex items-center space-x-4 p-5 shadow-2xl shadow-blue-500/10">
                    <Search className="text-white/40" />
                    <input
                        type="text"
                        placeholder="搜索表情包关键词 (如: 可爱, 震惊)..."
                        className="flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </GlassCard>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                    {filteredMemes.map((meme, index) => (
                        <motion.div
                            key={meme.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                        >
                            <GlassCard className="group relative aspect-square overflow-hidden">
                                <LazyImage
                                    src={meme.image_url}
                                    alt={meme.title || 'Meme'}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                    <h4 className="px-4 text-center font-bold text-white">{meme.title}</h4>
                                    <div className="flex flex-wrap justify-center gap-2 px-4">
                                        {meme.tags.map(tag => (
                                            <span key={tag} className="flex items-center space-x-1 rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/60">
                                                <Tag size={10} />
                                                <span>{tag}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleDownload(meme.image_url, `${meme.title || 'meme'}.jpg`)}
                                        className="flex items-center space-x-2 rounded-full bg-[#00B4D8] px-6 py-2 font-bold text-white shadow-lg hover:bg-[#0077B6] active:scale-95"
                                    >
                                        <Download size={18} />
                                        <span>一键下载</span>
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredMemes.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-xl text-white/20">没有找到相关的表情包...</p>
                </div>
            )}
        </div>
    )
}

export default Memes
