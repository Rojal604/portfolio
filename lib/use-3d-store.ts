import { create } from "zustand"

interface ThreeDStore {
  cameraPosition: [number, number, number]
  setCameraPosition: (position: [number, number, number]) => void
  scrollProgress: number
  setScrollProgress: (progress: number) => void
}

export const use3DStore = create<ThreeDStore>((set) => ({
  cameraPosition: [0, 0, 5],
  setCameraPosition: (position) => set({ cameraPosition: position }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}))
