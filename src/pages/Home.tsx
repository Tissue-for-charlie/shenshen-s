import React from 'react'
import { GlassCard } from '../components/common/GlassCard'
import { motion } from 'framer-motion'
import { ArrowRight, Music, Mic2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md">
            <span className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] bg-clip-text text-sm font-bold text-transparent">
              绝美天籁 · 纯净之声
            </span>
          </div>
          <h1 className="mb-6 text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl">
            ZHOU <span className="text-[#00B4D8]">SHEN</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
            用音乐温暖每一个灵魂，用歌声点亮每一个梦想。
            探索周深的音乐世界，感受跨越时空的艺术魅力。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/music">
              <button className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#00B4D8] to-[#0077B6] px-8 py-4 font-bold shadow-xl shadow-blue-500/20 transition-transform hover:scale-105 active:scale-95">
                <span>立即听歌</span>
                <Music size={20} />
              </button>
            </Link>
            <Link to="/profile">
              <button className="flex items-center space-x-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
                <span>了解更多</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating elements decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-10 top-1/4 opacity-20"
          >
            <Mic2 size={120} className="text-[#00B4D8]" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-10 bottom-1/4 opacity-20"
          >
            <Star size={100} className="text-[#0077B6]" />
          </motion.div>
        </div>
      </section>

      {/* Quick Entry Grid */}
      <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: '个人简介', desc: '出道历程与艺术特色', path: '/profile', icon: Star },
          { title: '演艺之路', desc: '重要演出与里程碑', path: '/career', icon: Mic2 },
          { title: '近期视频', desc: '最新舞台与MV', path: '/videos', icon: Music },
          { title: '图片画廊', desc: '高清写真与舞台照', path: '/gallery', icon: Music },
        ].map((item, i) => (
          <Link key={i} to={item.path}>
            <GlassCard className="p-8 h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00B4D8]/10 text-[#00B4D8]">
                <item.icon size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </GlassCard>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Home
