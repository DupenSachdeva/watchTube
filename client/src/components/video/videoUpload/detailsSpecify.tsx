import {
  Badge, DollarSign, Eye, EyeOff, FileText, Globe,
  ImageIcon, MessageSquare, Settings, Shield, Sparkles, X
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../../ui/select"
import { Separator } from "../../ui/separator"
import { Button } from "../../ui/button"
import { useUploadContext } from "../../../contexts/uploadVideoContext"
import { useRef, useState, type ChangeEvent } from "react"
import type { UploadPayload } from "../../../types/payload/uploadPayload"
import type { ChildProps } from "./showUpload"
import { useNavigate } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "../../ui/switch"
import { cn } from "../../../lib/utils"

const DetailsSpecify: React.FC<ChildProps> = ({ currentStep, setCurrentStep }) => {
  const { video } = useUploadContext()
  const navigate = useNavigate()

  const [videoPayload, setVideoPayload] = useState<UploadPayload>({
    videoFile: video,
    title: "",
    description: "",
    tags: [],
    category: "",
    visibility: "public",
    language: "en",
    isShort: false,
    monetizationEnabled: false,
    ageRestricted: false,
    scheduledPublish: false,
    license: "standard",
    premiumContent: false,
    commentsEnabled: true,
    ratingsEnabled: true,
  })

  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState("")

  const handleThumbnailSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file")
      return
    }

    setVideoPayload((prev) => ({
      ...prev,
      thumbnail: file,
    }))

    const previewUrl = URL.createObjectURL(file)
    setThumbnailUrl(previewUrl)
  }

  return (
    <>
      {currentStep === "details" && (
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Video Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* Basic Info */}
                <TabsContent value="basic" className="space-y-6 mt-6">
                  <div>
                    <Label htmlFor="title" className="flex items-center gap-2">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={videoPayload.title}
                      onChange={(e) =>
                        setVideoPayload((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter an engaging title for your video"
                      maxLength={100}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Make it catchy and descriptive</span>
                      <span>{videoPayload.title.length}/100</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={videoPayload.description}
                      onChange={(e) =>
                        setVideoPayload((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Tell viewers about your video (first 125 characters appear in search)"
                      rows={6}
                      maxLength={5000}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Include relevant keywords and timestamps</span>
                      <span>{videoPayload.description.length}/5000</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Thumbnail Upload */}
                <TabsContent value="thumbnails" className="space-y-6 mt-6">
                  <div>
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Custom Thumbnail
                    </Label>
                    <p className="text-sm text-gray-600 mb-4">Upload eye-catching thumbnails to attract viewers</p>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="w-full mb-4"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Thumbnail (JPG, PNG)
                    </Button>

                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />

                    {thumbnailUrl && (
                      <div className="relative">
                        <img
                          src={thumbnailUrl}
                          alt="Thumbnail preview"
                          className="w-1/2 aspect-video object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setThumbnailUrl("")
                            setVideoPayload((prev) => ({
                              ...prev,
                              thumbnail: undefined,
                            }))
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6 mt-6">
                  {/* Advanced tab content here (if needed) */}
                </TabsContent>
              </Tabs>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => {
                  setCurrentStep("upload")
                  navigate('/home/uploadVideo')
                }}>
                  Back to Upload
                </Button>
                <Button
                  onClick={() => setCurrentStep("settings")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Next: Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === "settings" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Visibility & Publishing
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <Label>Visibility</Label>
                  <RadioGroup
                    value={videoPayload.visibility}
                    onValueChange={(value: "public" | "unlisted" | "private") =>
                      setVideoPayload((prev) => ({ ...prev, visibility: value }))
                    }
                    className="mt-3 space-y-3"
                  >
                    {[
                      {
                        label: "Public",
                        value: "public",
                        description: "Anyone can search for and view",
                        icon: <Globe className="w-4 h-4 text-green-600" />,
                      },
                      {
                        label: "Unlisted",
                        value: "unlisted",
                        description: "Anyone with the link can view",
                        icon: <EyeOff className="w-4 h-4 text-yellow-600" />,
                      },
                      {
                        label: "Private",
                        value: "private",
                        description: "Only you can view",
                        icon: <Shield className="w-4 h-4 text-red-600" />,
                      },
                    ].map((item) => (
                      <div
                        key={item.value}
                        className={cn(
                          "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all",
                          videoPayload.visibility === item.value
                            ? "border-blue-500 bg-blue-50"
                            : "hover:border-gray-400"
                        )}
                        onClick={() =>
                          setVideoPayload((prev) => ({
                            ...prev,
                            visibility: item.value as any,
                          }))
                        }
                      >
                        <RadioGroupItem value={item.value} id={item.value} className="hidden" />
                        <div className="flex-1">
                          <label htmlFor={item.value} className="flex items-center gap-2 font-medium cursor-pointer">
                            {item.icon}
                            {item.label}
                          </label>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Separator />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setCurrentStep("details")}>
              Back to Details
            </Button>
            <div className="space-x-4">
              <Button
                 onClick={()=>{

                    
                 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                                              >
                Publish Video
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailsSpecify
