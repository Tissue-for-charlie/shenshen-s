import React, { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { Play, Pause, SkipForward, SkipBack, Volume2, Music as MusicIcon, ListMusic, Maximize2 } from 'lucide-react'
import { useMusicStore } from '../../stores/musicStore'
import { GlassCard } from '../common/GlassCard'
import { motion, AnimatePresence } from 'framer-motion'

export const AudioPlayer: React.FC = () => {
    const { currentSong, isPlaying, setIsPlaying, nextSong, prevSong, volume, setVolume } = useMusicStore()
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const soundRef = useRef<Howl | null>(null)
    const requestRef = useRef<number | null>(null)

    useEffect(() => {
        if (currentSong) {
            if (soundRef.current) {
                soundRef.current.unload()
            }

            soundRef.current = new Howl({
                src: [currentSong.audio_url],
                html5: true,
                volume: volume,
                onplay: () => {
                    setDuration(soundRef.current?.duration() || 0)
                    requestRef.current = requestAnimationFrame(updateProgress)
                },
                onend: () => {
                    nextSong()
                }
            })

            if (isPlaying) {
                soundRef.current.play()
            }
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.unload()
            }
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [currentSong])

    useEffect(() => {
        if (soundRef.current) {
            if (isPlaying) {
                soundRef.current.play()
            } else {
                soundRef.current.pause()
            }
        }
    }, [isPlaying])

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volume)
        }
    }, [volume])

    const updateProgress = () => {
        if (soundRef.current) {
            const seek = soundRef.current.seek() as number
            setProgress(seek)
            requestRef.current = requestAnimationFrame(updateProgress)
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value)
        setProgress(val)
        if (soundRef.current) {
            soundRef.current.seek(val)
        }
    }

    const formatTime = (time: number) => {
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60)
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    if (!currentSong) return null

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
            <GlassCard className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4 shadow-2xl shadow-blue-500/20">
                {/* Album Art */}
                <div className="relative hidden h-16 w-16 overflow-hidden rounded-xl md:block">
                    <img src={currentSong.cover_url} alt={currentSong.title} className="h-full w-full object-cover" />
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/40"
                            >
                                <div className="flex items-end space-x-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [4, 16, 4] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-1 bg-[#00B4D8]"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Info & Controls */}
                <div className="flex flex-1 flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-white line-clamp-1">{currentSong.title}</h4>
                            <p className="text-xs text-white/50">{currentSong.album || '单曲'}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={prevSong} className="text-white/60 hover:text-white"><SkipBack size={20} /></button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                            >
                                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                            </button>
                            <button onClick={nextSong} className="text-white/60 hover:text-white"><SkipForward size={20} /></button>
                        </div>
                        <div className="hidden items-center space-x-4 md:flex">
                            <div className="flex items-center space-x-2">
                                <Volume2 size={18} className="text-white/40" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="h-1 w-20 accent-[#00B4D8]"
                                />
                            </div>
                            <button className="text-white/40 hover:text-white"><ListMusic size={20} /></button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3">
                        <span className="text-[10px] text-white/40 w-8">{formatTime(progress)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            step="0.1"
                            value={progress}
                            onChange={handleSeek}
                            className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#00B4D8]"
                        />
                        <span className="text-[10px] text-white/40 w-8">{formatTime(duration)}</span>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    )
}
