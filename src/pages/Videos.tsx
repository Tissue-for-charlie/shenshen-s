import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { LazyImage } from '../components/common/LazyImage'
import { Play, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface Video {
    id: string
    title: string
    description: string
    thumbnail_url: string
    video_url: string
    platform: string
    publish_date: string
}

const Videos: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabase.from('videos').select('*').order('publish_date', { ascending: false })
            if (!error && data) setVideos(data)
            setLoading(false)
        }
        fetchVideos()
    }, [])

    if (loading) return null

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">近期视频</h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <GlassCard className="group relative overflow-hidden h-full">
                            <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="block">
                                <div className="aspect-video overflow-hidden">
                                    <LazyImage
                                        src={video.thumbnail_url}
                                        alt={video.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="rounded-md bg-[#00B4D8]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00B4D8]">
                                            {video.platform}
                                        </span>
                                        <span className="text-[10px] text-white/30">
                                            {new Date(video.publish_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold group-hover:text-[#00B4D8]">{video.title}</h3>
                                    <p className="text-sm leading-relaxed text-white/50 line-clamp-2">{video.description}</p>
                                </div>
                            </a>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Videos
