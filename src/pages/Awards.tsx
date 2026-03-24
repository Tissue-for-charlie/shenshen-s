import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { GlassCard } from '../components/common/GlassCard'
import { Bar, Pie } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

interface Award {
    id: string
    name: string
    category: string
    organization: string
    year: number
    image_url: string
}

const Awards: React.FC = () => {
    const [awards, setAwards] = useState<Award[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAwards = async () => {
            const { data, error } = await supabase.from('awards').select('*').order('year', { ascending: false })
            if (!error && data) setAwards(data)
            setLoading(false)
        }
        fetchAwards()
    }, [])

    const yearCounts = awards.reduce((acc: any, curr) => {
        acc[curr.year] = (acc[curr.year] || 0) + 1
        return acc
    }, {})

    const chartData = {
        labels: Object.keys(yearCounts),
        datasets: [
            {
                label: '获奖数量',
                data: Object.values(yearCounts),
                backgroundColor: 'rgba(0, 180, 216, 0.5)',
                borderColor: '#00B4D8',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: '年度获奖统计',
                color: '#fff',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#fff' }
            }
        }
    }

    if (loading) return null

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">获奖统计</h2>

            <div className="grid gap-8 lg:grid-cols-2">
                <GlassCard className="p-8">
                    <Bar data={chartData} options={options} />
                </GlassCard>

                <GlassCard className="p-8">
                    <h3 className="mb-6 text-xl font-bold text-[#00B4D8]">荣誉榜单</h3>
                    <div className="space-y-4">
                        {awards.map((award) => (
                            <div key={award.id} className="flex items-center space-x-4 border-b border-white/10 pb-4">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-white/20">
                                    <img src={award.image_url} alt={award.name} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{award.name}</h4>
                                    <p className="text-xs text-white/50">{award.year} · {award.organization} · {award.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}

export default Awards
