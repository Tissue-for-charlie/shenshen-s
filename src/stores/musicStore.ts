import { create } from 'zustand'

interface Song {
    id: string
    title: string
    album?: string
    cover_url: string
    audio_url: string
    lyrics?: string
    duration?: number
}

interface MusicState {
    currentSong: Song | null
    isPlaying: boolean
    playlist: Song[]
    volume: number
    setCurrentSong: (song: Song | null) => void
    setIsPlaying: (isPlaying: boolean) => void
    setPlaylist: (playlist: Song[]) => void
    setVolume: (volume: number) => void
    nextSong: () => void
    prevSong: () => void
}

export const useMusicStore = create<MusicState>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    playlist: [],
    volume: 0.8,
    setCurrentSong: (song) => set({ currentSong: song, isPlaying: !!song }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setPlaylist: (playlist) => set({ playlist }),
    setVolume: (volume) => set({ volume }),
    nextSong: () => {
        const { currentSong, playlist } = get()
        if (!currentSong || playlist.length === 0) return
        const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
        const nextIndex = (currentIndex + 1) % playlist.length
        set({ currentSong: playlist[nextIndex], isPlaying: true })
    },
    prevSong: () => {
        const { currentSong, playlist } = get()
        if (!currentSong || playlist.length === 0) return
        const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
        set({ currentSong: playlist[prevIndex], isPlaying: true })
    }
}))
