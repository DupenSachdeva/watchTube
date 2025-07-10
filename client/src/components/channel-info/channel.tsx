'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, User } from "lucide-react"
import axios from 'axios'
import SuccessMessage from '@/UtilComponents/Success/Success'

export default function CreateChannel() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [channelData, setChannelData] = useState({
    name: '',
    description: '',
    pictureUrl: null as string | null
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setChannelData(prev => ({ ...prev, pictureUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!picture || !channelData.name || !channelData.description) {
      setError("All fields including picture are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', picture);
      formData.append('channelName', channelData.name);
      formData.append('channelDescription', channelData.description);

      await axios.put('http://localhost:3000/channel/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token') || ''
        },
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      const message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <>
      {isSuccess && (
        <SuccessMessage message="Channel updated successfully" setIsSuccess={setIsSuccess} />
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 max-w-2xl mx-auto text-sm">
          {error}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
            Your Channel
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle>Channel Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="block">Channel Avatar</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={channelData.pictureUrl || ''} />
                      <AvatarFallback className="bg-purple-100">
                        <User className="w-12 h-12 text-purple-500" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label
                        htmlFor="avatar-upload"
                        className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 cursor-pointer group"
                      >
                        <div className="space-y-2 text-center">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-purple-500" />
                          <span className="text-sm text-gray-500 group-hover:text-purple-500">Upload Avatar</span>
                        </div>
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel-name">Channel Name</Label>
                  <Input
                    id="channel-name"
                    placeholder="Enter your channel name"
                    value={channelData.name}
                    onChange={(e) => setChannelData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-white bg-opacity-50 border-none placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel-description">Channel Description</Label>
                  <Textarea
                    id="channel-description"
                    placeholder="Tell viewers about your channel..."
                    value={channelData.description}
                    onChange={(e) => setChannelData(prev => ({ ...prev, description: e.target.value }))}
                    className="h-32 bg-white bg-opacity-50 border-none placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white hover:opacity-90"
                  onClick={handleSubmit}
                >
                  Update Channel
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="bg-white bg-opacity-80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle>Channel Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={channelData.pictureUrl || ''} />
                    <AvatarFallback className="bg-purple-100">
                      <User className="w-8 h-8 text-purple-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {channelData.name || 'Your Channel Name'}
                    </h3>
                    <p className="text-sm text-gray-500">0 subscribers • 0 videos</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">About</h4>
                  <p className="text-sm text-gray-600">
                    {channelData.description || 'Your channel description will appear here...'}
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-purple-50 bg-opacity-50">
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Camera className="w-4 h-4" />
                    <span>Preview how your channel will appear to viewers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
