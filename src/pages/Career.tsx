import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Star } from 'lucide-react'

interface CareerEvent {
    id: string
    title: string
    description: string
    type: string
    event_date: string
    image_url: string
}

const Career: React.FC = () => {
    const [events, setEvents] = useState<CareerEvent[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.from('career_events').select('*').order('event_date', { ascending: false })
            if (!error && data) setEvents(data)
            setLoading(false)
        }
        fetchEvents()
    }, [])

    if (loading) return null

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">演艺之路</h2>

            <div className="relative space-y-12 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#00B4D8] before:to-transparent md:before:left-1/2">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative flex flex-col md:flex-row md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.8)] md:left-1/2" />

                        {/* Date Tag */}
                        <div className={`mb-4 md:mb-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-right'}`}>
                            <div className={`inline-flex items-center space-x-2 rounded-full bg-[#00B4D8]/10 px-4 py-1 text-sm font-bold text-[#00B4D8] ${index % 2 === 0 ? '' : 'flex-row-reverse space-x-reverse'
                                }`}>
                                <Calendar size={14} />
                                <span>{new Date(event.event_date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                            <GlassCard className="overflow-hidden p-0">
                                {event.image_url && (
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img src={event.image_url} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                        <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-white/40">
                                            {event.type}
                                        </span>
                                    </div>
                                    <p className="leading-relaxed text-white/60">{event.description}</p>
                                </div>
                            </GlassCard>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Career
