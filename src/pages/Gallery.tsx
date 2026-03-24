import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { LazyImage } from '../components/common/LazyImage'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Maximize2 } from 'lucide-react'

interface Photo {
    id: string
    title: string
    image_url: string
    category: string
}

const Gallery: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('全部')

    const categories = ['全部', '写真', '舞台', '生活照']

    useEffect(() => {
        const fetchPhotos = async () => {
            const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false })
            if (!error && data) setPhotos(data)
            setLoading(false)
        }
        fetchPhotos()
    }, [])

    const filteredPhotos = activeCategory === '全部'
        ? photos
        : photos.filter(p => p.category === activeCategory)

    if (loading) return null

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">高清图片</h2>

            {/* Category Filter */}
            <div className="mb-12 flex flex-wrap justify-center gap-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-full px-8 py-2 font-medium transition-all ${activeCategory === cat
                                ? 'bg-[#00B4D8] text-white shadow-lg shadow-blue-500/20'
                                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="columns-2 gap-6 sm:columns-3 lg:columns-4">
                <AnimatePresence mode="popLayout">
                    {filteredPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="mb-6"
                        >
                            <GlassCard className="group relative overflow-hidden p-0">
                                <LazyImage
                                    src={photo.image_url}
                                    alt={photo.title || 'Photo'}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#00B4D8]">
                                        {photo.category}
                                    </span>
                                    <h4 className="font-bold text-white">{photo.title}</h4>
                                    <button className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40">
                                        <Maximize2 size={18} />
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPhotos.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-xl text-white/20">暂无该分类下的图片...</p>
                </div>
            )}
        </div>
    )
}

export default Gallery
