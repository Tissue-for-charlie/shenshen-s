import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { Play, Music as MusicIcon, Heart, Search } from 'lucide-react'
import { useMusicStore } from '../stores/musicStore'
import { AudioPlayer } from '../components/music/AudioPlayer'
import { motion } from 'framer-motion'

interface Song {
    id: string
    title: string
    album?: string
    cover_url: string
    audio_url: string
    lyrics?: string
    duration?: number
}

const Music: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const { setCurrentSong, setPlaylist, currentSong } = useMusicStore()

    useEffect(() => {
        const fetchSongs = async () => {
            const { data, error } = await supabase
                .from('songs')
                .select('*')
                .order('release_date', { ascending: false })

            if (!error && data) {
                setSongs(data)
                setPlaylist(data)
            }
            setLoading(false)
        }
        fetchSongs()
    }, [])

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00B4D8] border-t-transparent" />
        </div>
    )

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 pb-32 md:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">歌曲收听</h2>

            <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
                {/* Left Column: Song List */}
                <div className="space-y-6">
                    <GlassCard className="flex items-center space-x-4 p-4">
                        <Search className="text-white/40" />
                        <input
                            type="text"
                            placeholder="搜索歌曲或专辑..."
                            className="flex-1 bg-transparent text-white outline-none placeholder:text-white/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </GlassCard>

                    <div className="space-y-3">
                        {filteredSongs.map((song, index) => (
                            <motion.div
                                key={song.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard
                                    className={`flex cursor-pointer items-center justify-between p-4 transition-all hover:translate-x-2 ${currentSong?.id === song.id ? 'border-[#00B4D8] bg-[#00B4D8]/10' : ''
                                        }`}
                                    onClick={() => setCurrentSong(song)}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                                            <img src={song.cover_url} alt={song.title} className="h-full w-full object-cover" />
                                            {currentSong?.id === song.id && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                    <div className="flex items-end space-x-1">
                                                        {[1, 2, 3].map((i) => (
                                                            <motion.div
                                                                key={i}
                                                                animate={{ height: [4, 12, 4] }}
                                                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                                className="w-0.5 bg-[#00B4D8]"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{song.title}</h4>
                                            <p className="text-xs text-white/50">{song.album}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <button className="text-white/30 hover:text-red-500"><Heart size={18} /></button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#00B4D8]">
                                            <Play size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Lyrics & Current Song Info */}
                <div className="hidden flex-col space-y-6 lg:flex">
                    <GlassCard className="aspect-square overflow-hidden p-0">
                        {currentSong ? (
                            <img src={currentSong.cover_url} alt={currentSong.title} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-white/5">
                                <MusicIcon size={64} className="text-white/10" />
                            </div>
                        )}
                    </GlassCard>

                    <GlassCard className="flex-1 overflow-hidden p-8">
                        <h3 className="mb-6 text-xl font-bold text-[#00B4D8]">歌词展示</h3>
                        <div className="max-h-[300px] overflow-y-auto pr-4 text-center leading-loose text-white/40 scrollbar-hide">
                            {currentSong?.lyrics ? (
                                currentSong.lyrics.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 transition-colors hover:text-white">{line}</p>
                                ))
                            ) : (
                                <p>选择一首歌曲开始聆听...</p>
                            )}
                        </div>
                    </GlassCard>
                </div>
            </div>

            <AudioPlayer />
        </div>
    )
}

export default Music
