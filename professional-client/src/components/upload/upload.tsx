"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, ImageIcon, FileVideo, Tags, Globe, Lock, Eye, Clock, DollarSign, AlertCircle, FileText } from 'lucide-react'
import { Value } from "@radix-ui/react-select"

export default function UploadPage() {

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState("private")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [ageRestriction, setAgeRestriction] = useState(false)
  const [monetization, setMonetization] = useState(false)
  const [premiereDate, setPremiereDate] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const [postContent, setPostContent] = useState("")
  const [postImage, setPostImage] = useState<File | null>(null)
  const [postOption, setPostOption] = useState("option1")

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setVideoFile(file)
    }
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setThumbnailFile(file)
  }

  const handlePostImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setPostImage(file)
  }

  const handleVideoSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    
    
  }

  const handlePostSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Submitting post:", { postContent, postImage, postOption })
  }

  return (

    <div className="container mx-auto p-6 h-full overflow-y-hidden">

      <h1 className="text-3xl font-bold mb-6">Upload Content</h1>


      <Tabs defaultValue="video">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="video">Upload Video</TabsTrigger>
          <TabsTrigger value="post">Create Post</TabsTrigger>
        </TabsList>

        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Provide information about your video</CardDescription>
            </CardHeader>
            <CardContent>

              <form onSubmit={handleVideoSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="video-upload">Video File</Label>

                  <div className="flex items-center space-x-2">
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="flex-1"
                    />
                    <Button type="button" size="icon">
                      <FileVideo className="h-4 w-4" />
                      <span className="sr-only">Upload video</span>
                    </Button>
                  </div>

                  {videoFile && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Uploading: {videoFile.name}</p>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label htmlFor="thumbnail-upload">Thumbnail Image</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="flex-1"
                    />
                    <Button type="button" size="icon">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">Upload thumbnail</span>
                    </Button>
                  </div>
                  {thumbnailFile && <p className="text-sm text-muted-foreground">Selected: {thumbnailFile.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter video title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter video description" 
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <RadioGroup value={visibility} onValueChange={setVisibility}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="flex items-center"><Globe className="h-4 w-4 mr-2" /> Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unlisted" id="unlisted" />
                      <Label htmlFor="unlisted" className="flex items-center"><Eye className="h-4 w-4 mr-2" /> Unlisted</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="flex items-center"><Lock className="h-4 w-4 mr-2" /> Private</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">

                  <Label htmlFor="category">Category</Label>

                  <Select value={category} onValueChange={setCategory}>

                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="science">Science & Technology</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                    </SelectContent>

                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="tags" 
                      placeholder="Enter tags, separated by commas" 
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                    <Button type="button" size="icon">
                      <Tags className="h-4 w-4" />
                      <span className="sr-only">Add tags</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="age-restriction"
                    checked={ageRestriction}
                    onCheckedChange={setAgeRestriction}
                  />
                  <Label htmlFor="age-restriction" className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Age Restriction
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="monetization"
                    checked={monetization}
                    onCheckedChange={setMonetization}
                  />
                  <Label htmlFor="monetization" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Monetization
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="premiere-date">Schedule Premiere (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="premiere-date"
                      type="datetime-local"
                      value={premiereDate}
                      onChange={(e) => setPremiereDate(e.target.value)}
                    />
                    <Button type="button" size="icon">
                      <Clock className="h-4 w-4" />
                      <span className="sr-only">Set premiere date</span>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">Upload Video</Button>
              </form>

            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="post">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Post</CardTitle>
              <CardDescription>Share updates with your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="post-content">Post Content</Label>
                  <Textarea
                    id="post-content"
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-image">Add Image (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="post-image" 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePostImageUpload}
                      className="flex-1"
                    />
                    <Button type="button" size="icon">
                      <ImageIcon className="h-4 w-4" />
                      <span className="sr-only">Upload image</span>
                    </Button>
                  </div>
                  {postImage && <p className="text-sm text-muted-foreground">Selected: {postImage.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Post Options (Optional)</Label>
                  <RadioGroup value={postOption} onValueChange={setPostOption}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="option1" />
                      <Label htmlFor="option1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="option2" />
                      <Label htmlFor="option2">Option 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option3" id="option3" />
                      <Label htmlFor="option3">Option 3</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option4" id="option4" />
                      <Label htmlFor="option4">Option 4</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full">Create Post</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}