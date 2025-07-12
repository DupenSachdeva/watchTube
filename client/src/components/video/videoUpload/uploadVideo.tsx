"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Upload,
  X,
  Play,
  Pause,
  Eye,
  EyeOff,
  ImageIcon,
  Settings,
  Calendar,
  Globe,
  MessageSquare,
  Star,
  DollarSign,
  FileText,
  Camera,
  Sparkles,
  Clock,
  Shield,
} from "lucide-react"
import ShowUpload from "./showUpload"
import { Outlet, useNavigate } from "react-router-dom"
import { UploadContext } from "../../../contexts/uploadVideoContext"

interface VideoDetails {
  title: string
  description: string
  tags: string[]
  category: string
  visibility: "public" | "unlisted" | "private"
  language: string
  thumbnail?: File
  customThumbnails: File[]
  selectedThumbnailIndex: number
  captions?: File
  // Advanced settings
  commentsEnabled: boolean
  ratingsEnabled: boolean
  ageRestricted: boolean
  monetizationEnabled: boolean
  scheduledPublish: boolean
  publishDate: string
  publishTime: string
  license: string
  location: string
  playlist: string
  shorts: boolean
  premiumContent: boolean
}

export default function VideoUpload() {
  const [video, setVideo] = useState<File | null>(null)


  const [videoUrl, setVideoUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const [currentStep, setCurrentStep] = useState<string>("upload")

  const [videoDetails, setVideoDetails] = useState<VideoDetails>
  
  ({
    title: "",
    description: "",
    tags: [],
    category: "",
    visibility: "public",
    language: "en",
    customThumbnails: [],
    selectedThumbnailIndex: 0,
    commentsEnabled: true,
    ratingsEnabled: true,
    ageRestricted: false,
    monetizationEnabled: false,
    scheduledPublish: false,
    publishDate: "",
    publishTime: "",
    license: "standard",
    location: "",
    playlist: "",
    shorts: false,
    premiumContent: false,
  })



  const fileInputRef = useRef<HTMLInputElement>(null)
  

  
  const navigate = useNavigate();

  const handleVideoSelect = (event: ChangeEvent<HTMLInputElement>) => {

          const file = event.target.files?.[0]

          if (file) {
            if (!file.type.startsWith("video/")) {
              alert("Please select a valid video file")
              return
            }
      
            if (file.size > 500 * 1024 * 1024) {
              alert("File size must be less than 500MB")
              return
            }
      
            setVideo(file)

            const url = URL.createObjectURL(file)

            setVideoUrl(url)

            setCurrentStep("details")

             navigate("details")
          }
        }


  
  return (
    <div className="max-w-6xl mx-auto p-6">
      
      

      <ShowUpload currentStep={currentStep } setCurrentStep={setCurrentStep}></ShowUpload>
      
      
      { currentStep=='upload' && (<Card className="border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-12" >
            <div
              className="text-center cursor-pointer transition-all hover:scale-105"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Upload className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Video</h3>
              <p className="text-gray-600 mb-4">Drag and drop or click to select your video file</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span>• MP4, AVI, MOV, WMV</span>
                <span>• Up to 500MB</span>
                <span>• HD Quality Supported</span>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />
          </CardContent>
       </Card>)}
       
       <UploadContext.Provider value={{ video, setVideo , videoUrl , setVideoUrl}}>

          <Outlet context={{currentStep , setCurrentStep}}></Outlet>

       </UploadContext.Provider>
       



       


      

      
    </div>
  )
}
