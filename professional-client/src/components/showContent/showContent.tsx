"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileVideo, Globe, Lock, MessageSquare, MoreVertical, Pencil, Search, Trash2 } from 'lucide-react'

// Mock data for demonstration
const videos = [
  { id: 1, title: "Introduction to React", views: 1200, likes: 45, comments: 12, visibility: "public", uploadDate: "2024-11-10" },
  { id: 2, title: "Advanced TypeScript Techniques", views: 800, likes: 30, comments: 8, visibility: "unlisted", uploadDate: "2024-11-08" },
  { id: 3, title: "Building a YouTube Clone", views: 1500, likes: 60, comments: 20, visibility: "public", uploadDate: "2024-11-05" },
]

const posts = [
  { id: 1, content: "Excited to announce our new video series!", likes: 25, comments: 5, uploadDate: "2024-11-11" },
  { id: 2, content: "What topics would you like to see covered next?", likes: 15, comments: 10, uploadDate: "2024-11-09" },
  { id: 3, content: "Behind the scenes of our latest project", likes: 30, comments: 8, uploadDate: "2024-11-07" },
]

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("videos")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === "date") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    if (sortBy === "views") return b.views - a.views
    if (sortBy === "likes") return b.likes - a.likes
    return 0
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "date") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    if (sortBy === "likes") return b.likes - a.likes
    return 0
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Content</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="videos" className="flex items-center">
              <FileVideo className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="likes">Likes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Your Videos</CardTitle>
              <CardDescription>Manage and analyze your uploaded videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Likes</TableHead>
                    <TableHead className="text-right">Comments</TableHead>
                    <TableHead className="text-right">Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedVideos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">{video.title}</TableCell>
                      <TableCell>
                        {video.visibility === "public" ? (
                          <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> Public</span>
                        ) : video.visibility === "unlisted" ? (
                          <span className="flex items-center"><Eye className="w-4 h-4 mr-1" /> Unlisted</span>
                        ) : (
                          <span className="flex items-center"><Lock className="w-4 h-4 mr-1" /> Private</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{video.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{video.likes}</TableCell>
                      <TableCell className="text-right">{video.comments}</TableCell>
                      <TableCell className="text-right">{new Date(video.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Your Posts</CardTitle>
              <CardDescription>Manage and analyze your community posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Post #{post.id}</CardTitle>
                      <CardDescription>{new Date(post.uploadDate).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}