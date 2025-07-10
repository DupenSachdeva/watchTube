import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, BarChart2, Edit, Upload, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
    const navigate = useNavigate();
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">

      <ScrollArea className="h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="John Doe" />
                <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <p className="text-gray-600 mb-4">@johndoe • Joined 2023</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Button variant="outline" className="bg-white bg-opacity-50"
                  onClick={()=>navigate("/home/channel-info")}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Channel
                  </Button>
                  <Button variant="outline" className="bg-white bg-opacity-50">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    View Statistics
                  </Button>
                  <Button variant="outline" className="bg-white bg-opacity-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Channel Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <section className="bg-white bg-opacity-80 backdrop-blur-sm shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-700 mb-4">
                Welcome to my ColorTube channel! I'm passionate about creating vibrant and engaging content that brings color to your day. From art tutorials to lifestyle vlogs, my goal is to inspire creativity and spread positivity.
              </p>
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <ul className="list-disc list-inside text-blue-600">
                <li><a href="#" className="hover:underline">Personal Website</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
              </ul>
            </section>

            <section className="bg-white bg-opacity-80 backdrop-blur-sm shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Channel Description</h2>
              <p className="text-gray-700 mb-4">
                On this channel, you'll find a colorful mix of content including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Art tutorials and techniques</li>
                <li>Color theory explanations</li>
                <li>Creative lifestyle vlogs</li>
                <li>DIY projects and crafts</li>
                <li>Collaborations with other artists</li>
              </ul>
              <p className="text-gray-700">
                New videos are uploaded every Wednesday and Saturday. Don't forget to subscribe and hit the notification bell to stay updated with the latest colorful content!
              </p>
            </section>

            <div className="mt-8 text-center">
              <Button size="lg" className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white hover:from-red-600 hover:via-purple-600 hover:to-blue-600">
                <Upload className="w-5 h-5 mr-2" />
                Upload New Video
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}