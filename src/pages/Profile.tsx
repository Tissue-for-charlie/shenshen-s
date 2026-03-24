import React from 'react'
import { GlassCard } from '../components/common/GlassCard'
import { motion } from 'framer-motion'
import { User, Star, Mic2, Music, Heart } from 'lucide-react'

const Profile: React.FC = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center text-4xl font-bold md:text-5xl"
            >
                个人简介
            </motion.h2>

            <div className="grid gap-12 lg:grid-cols-[400px_1fr]">
                {/* Left: Info Card */}
                <div className="space-y-8">
                    <GlassCard className="overflow-hidden p-0">
                        <div className="aspect-[3/4] overflow-hidden">
                            <img
                                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=zhou+shen+official+portrait+blue+background&image_size=portrait_4_3"
                                alt="Zhou Shen"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="mb-4 text-2xl font-bold">周深 Charlie</h3>
                            <div className="space-y-4 text-white/70">
                                <div className="flex items-center space-x-3">
                                    <Star size={18} className="text-[#00B4D8]" />
                                    <span>出生日期：1992年9月29日</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mic2 size={18} className="text-[#00B4D8]" />
                                    <span>职业：歌手、音乐人</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Music size={18} className="text-[#00B4D8]" />
                                    <span>风格：流行、美声、国风</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Heart size={18} className="text-[#00B4D8]" />
                                    <span>粉丝名：生米 (Raw Rice)</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right: Detailed Content */}
                <div className="space-y-12">
                    {/* Artistic Features */}
                    <section>
                        <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold">
                            <div className="h-8 w-1 bg-[#00B4D8] rounded-full" />
                            <span>艺术特色</span>
                        </h3>
                        <GlassCard className="p-8 leading-relaxed text-white/70">
                            <p className="mb-4">
                                周深以其独特的“天籁之声”闻名，其音色纯净、空灵，且具备极强的可塑性。他不仅能完美驾驭高难度的美声唱法，还能在流行、国风等多种曲风间自由切换。
                            </p>
                            <p>
                                他的演唱技巧娴熟，情感表达细腻入微，被誉为“治愈系歌手”。在多国语言演唱方面也展现出惊人的天赋，曾用多种语言演绎经典作品，跨越文化边界触动人心。
                            </p>
                        </GlassCard>
                    </section>

                    {/* Debut History */}
                    <section>
                        <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold">
                            <div className="h-8 w-1 bg-[#00B4D8] rounded-full" />
                            <span>出道历程</span>
                        </h3>
                        <div className="space-y-6">
                            {[
                                { year: '2014', title: '梦想起航', desc: '参加《中国好声音》第三季，以一首《欢颜》惊艳全场，正式开启演艺生涯。' },
                                { year: '2016', title: '成名之作', desc: '为动画电影《大鱼海棠》演唱印象曲《大鱼》，凭借极具辨识度的空灵嗓音迅速走红。' },
                                { year: '2020', title: '实力绽放', desc: '参加《歌手·当打之年》，在舞台上展现了极其宽广的音域和深厚的艺术造诣。' },
                                { year: '2021-至今', title: '巅峰跨越', desc: '活跃于各大晚会舞台，发行多部影视金曲，成为当今华语乐坛最具影响力的歌手之一。' }
                            ].map((item, i) => (
                                <GlassCard key={i} className="flex items-start space-x-6 p-6">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#00B4D8]/10 text-xl font-bold text-[#00B4D8]">
                                        {item.year}
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-white/50">{item.desc}</p>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Profile
