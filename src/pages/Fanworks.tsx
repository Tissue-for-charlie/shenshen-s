import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { LazyImage } from '../components/common/LazyImage'
import { Heart, MessageCircle, Upload, User } from 'lucide-react'
import { motion } from 'framer-motion'

interface Fanwork {
    id: string
    title: string
    description: string
    video_url: string
    likes_count: number
    created_at: string
    users: {
        username: string
        avatar_url: string
    }
}

const Fanworks: React.FC = () => {
    const [fanworks, setFanworks] = useState<Fanwork[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFanworks = async () => {
            const { data, error } = await supabase
                .from('fanworks')
                .select('*, users(username, avatar_url)')
                .order('created_at', { ascending: false })

            if (!error && data) setFanworks(data as any)
            setLoading(false)
        }
        fetchFanworks()
    }, [])

    if (loading) return null

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                    <h2 className="text-4xl font-bold md:text-5xl">粉丝混剪</h2>
                    <p className="mt-2 text-white/50">在这里分享和发现更多关于周深的精彩创作</p>
                </div>
                <button className="group flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#00B4D8] to-[#0077B6] px-8 py-4 font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/40 active:scale-95">
                    <Upload size={20} className="transition-transform group-hover:-translate-y-1" />
                    <span>参与投稿</span>
                </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {fanworks.length > 0 ? fanworks.map((work, index) => (
                    <motion.div
                        key={work.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <GlassCard className="group flex flex-col h-full overflow-hidden">
                            <div className="aspect-video relative overflow-hidden">
                                <LazyImage
                                    src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=fan+made+video+tribute+zhou+shen+${index}&image_size=landscape_16_9`}
                                    alt={work.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                                        <Heart size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-lg font-bold group-hover:text-[#00B4D8] line-clamp-1">{work.title}</h3>
                                <p className="mb-6 text-sm leading-relaxed text-white/50 line-clamp-2">{work.description}</p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 overflow-hidden rounded-full bg-white/10">
                                            {work.users?.avatar_url ? (
                                                <img src={work.users.avatar_url} alt={work.users.username} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-white/40">
                                                    <User size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-white/70">{work.users?.username || '神秘粉丝'}</span>
                                    </div>

                                    <div className="flex items-center space-x-4 text-white/40">
                                        <button className="flex items-center space-x-1.5 transition-colors hover:text-red-500">
                                            <Heart size={16} />
                                            <span className="text-xs">{work.likes_count}</span>
                                        </button>
                                        <button className="flex items-center space-x-1.5 transition-colors hover:text-[#00B4D8]">
                                            <MessageCircle size={16} />
                                            <span className="text-xs">讨论</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                )) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-xl text-white/20">暂无作品投稿，快来成为第一个吧！</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Fanworks
