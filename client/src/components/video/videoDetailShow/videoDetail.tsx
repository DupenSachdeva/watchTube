// pages/VideoDetail.tsx
"use client";

import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { VideoListAtom } from "@/recoil/atoms/videoAtom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal } from "lucide-react";
import VideoPlayer from "../../videoPlayer/videoPlayer";

export default function VideoDetail() {
  const { id } = useParams();
  const videos = useRecoilValue(VideoListAtom);
  const video = videos.find((v) => String(v.id) === id);

  if (!video) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        Video not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      {/* Main Video Section */}
      <div className="flex flex-col">
        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <VideoPlayer src={video.videoUrl} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-3">{video.title}</h1>

        {/* Channel + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={video.channelUrl} alt={video.channel} />
              <AvatarFallback>{video.channel[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-base">{video.channel}</p>
              <p className="text-sm text-gray-600">Subscriber count</p>
            </div>
            <Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2">
              Subscribe
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Button variant="ghost" className="flex items-center gap-1 rounded-full px-3">
              <ThumbsUp className="w-4 h-4" />
              <span>12K</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1 rounded-full px-3">
              <ThumbsDown className="w-4 h-4" />
              <span>Dislike</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1 rounded-full px-3">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-1 rounded-full px-3">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </Button>
            <Button variant="ghost" className="rounded-full px-3">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Description */}
        <div className="bg-gray-100 p-4 rounded-lg text-sm">
          <p className="font-semibold mb-1">
            { "100K"} views •{" "}
            {new Date(video.uploadedAt).toLocaleDateString()}
          </p>
          <p className="whitespace-pre-wrap">{video.description}</p>
        </div>

        {/* Comments Section Placeholder */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="text-gray-500">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        </div>
      </div>

      {/* Sidebar for Suggestions (optional for now) */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-2">Up Next</h2>
        {/* Placeholder for suggested videos */}
      </div>
    </div>
  );
}
