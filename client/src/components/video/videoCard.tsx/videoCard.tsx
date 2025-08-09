// components/VideoCard.tsx
import { Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import  { Video } from "../../../recoil/atoms/videoAtom";
import { useNavigate } from "react-router-dom";

interface Props {
  video: Video;
}

const VideoCard = ({ video }: Props) => {
    const navigate = useNavigate();
  console.log(video.channelUrl);
  
  const handleClick = () => {
    console.log(video.id);
    
    navigate(`/video/${video.id}`);

  };
  return (

<div className="cursor-pointer" onClick={handleClick}>

    <Card className="cursor-pointer bg-white bg-opacity-80 backdrop-blur-sm shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 w-full ">
  <CardHeader className="p-0">
    <div className=" relative w-full h-48 aspect-video bg-gray-200">
      <img
        src={video.thumbnailUrl}
        alt={`Thumbnail for ${video.title}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="w-12 h-12 text-white" />
      </div>
    </div>
  </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2 text-gray-800">{video.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={video.channelUrl} alt={video.channel} />
            <AvatarFallback>{video.channel[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{video.channel}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-gray-500">
        <span>{new Date(video.uploadedAt).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
    </div>
  );
};

export default React.memo(VideoCard);
