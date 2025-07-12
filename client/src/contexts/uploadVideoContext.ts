import { createContext, useContext } from "react"

interface UploadContextType {
  video: File | null
  setVideo: (v: File | null) => void
  videoUrl: string
  setVideoUrl: (v: string) => void
}

export const UploadContext = createContext<UploadContextType | null>(null)

export const useUploadContext = () => {
  const context = useContext(UploadContext)
  if (!context) throw new Error("useUploadContext must be used within UploadContext.Provider")

  return context
}
