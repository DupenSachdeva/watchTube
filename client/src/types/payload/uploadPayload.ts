export interface UploadPayload {
  videoFile: File | null
  title: string
  description: string
  tags: string[]
  category: string
  visibility: "public" | "unlisted" | "private"
  language: string
  thumbnail?: File | null
  captions?: File
  isShort: boolean
  monetizationEnabled: boolean
  ageRestricted: boolean
  scheduledPublish: boolean
  publishDate?: string
  publishTime?: string
  license: string
  location?: string
  playlist?: string
  premiumContent: boolean
  commentsEnabled: boolean
  ratingsEnabled: boolean
}
