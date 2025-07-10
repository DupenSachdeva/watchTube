import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ChevronUp, Eye, MessageSquare, ThumbsUp, TrendingUp, Upload, Users } from 'lucide-react'
import { Link } from "react-router-dom"

// Mock data for demonstration
const recentVideos = [
  { id: 1, title: "Getting Started with Next.js", views: 1200, likes: 45, comments: 12, uploadDate: "2024-11-10" },
  { id: 2, title: "React Hooks Explained", views: 800, likes: 30, comments: 8, uploadDate: "2024-11-08" },
  { id: 3, title: "Building a Responsive Layout", views: 1500, likes: 60, comments: 20, uploadDate: "2024-11-05" },
]

const channelStats = {
  subscribers: 10000,
  totalViews: 500000,
  watchTime: 25000,
  latestVideoViews: 2500,
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Channel Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.subscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watch Time (hours)</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.watchTime.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Video Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.latestVideoViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +18% from previous video
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Videos Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentVideos.map((video) => (
                <div key={video.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{video.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {new Date(video.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{video.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span>{video.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{video.comments}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your channel and content</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full" asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-4 w-4" /> Upload New Video
              </Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/analytics">
                <TrendingUp className="mr-2 h-4 w-4" /> View Analytics
              </Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/content">
                <Eye className="mr-2 h-4 w-4" /> Manage Content
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Channel Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600">
              <ChevronUp className="inline-block h-8 w-8 mr-2" />
              15%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your channel has grown 15% in the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}