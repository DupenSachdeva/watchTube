"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { VideoListAtom } from "@/recoil/atoms/videoAtom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal } from "lucide-react"
import { Header } from "../../header"
import VideoPlayer from "../../videoPlayer/videoPlayer"
import { BACKEND_URL } from "../../../config/config"
import { isLoggedInatom } from "../../../recoil/atoms/isLoggedIn"
import CommentSection from "./CommentSection"


export default  function VideoDetail() {
  const { id } = useParams()

  const [videos,setVideos] = useRecoilState(VideoListAtom)
  
  const isLoggedIn = useRecoilValue(isLoggedInatom)
  

  const video = videos.find((v) => String(v.id) === id)


  const [isSubscribed , setIsSubscribed] = useState<boolean>();



  useEffect(() => {

  const checkSubscriptionStatus = async () => {

    try {
      const res = await fetch(`${BACKEND_URL}/channel/subscriptionStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId: video?.channelId }),
      });

      const parsedRes = await res.json();

      setIsSubscribed(parsedRes.isSubscribed ?? false);
    } catch (error) {
      console.error("Error checking subscription status:", error);
      setIsSubscribed(false);
    }
  };

  if (video?.channelId) {
    checkSubscriptionStatus();
  }
}, []);
  

        

  
  const upNextVideos = videos.filter((v) => String(v.id) !== id)

  if (!video) {
    return <div className="flex justify-center items-center h-[80vh] text-gray-500">Video not found.</div>
  }
  return (
    <div>
        <Header></Header>
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="flex flex-col">
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <VideoPlayer src={video.videoUrl} />
            </div>
            <h1 className="text-2xl font-bold mb-3">{video.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={video.channelUrl || "/placeholder.svg"} alt={video.channel} />
                  <AvatarFallback>{video.channel[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{video.channel}</p>
                  <p className="text-sm text-gray-600">{video.subscriptions} subscriptions</p>
                </div>

                {isSubscribed && (<Button className="ml-4 bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2"
                onClick={async ()=>{
                  const res = await fetch(`${BACKEND_URL}/channel/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem('token') || ""
        },
        body: JSON.stringify({ channelId: video?.channelId }),
      });

      setIsSubscribed(false);

      setVideos((videos) =>
  videos.map((vid) =>
    String(vid.id) === id
      ? { ...vid, subscriptions: vid.subscriptions - 1 }
      : vid
  )
);
                }}
                >
                  Unsubscribe
                </Button>)}

                {!isSubscribed && (<Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
                 onClick={async ()=>{

                  if(!isLoggedIn){
                  alert('please login first');
                  return;
                }
                  
                  console.log("channel id is");
                  
                  console.log(video.channelId);
                  console.log(`user id is `);
                  
                  const res = await fetch(`${BACKEND_URL}/channel/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization : localStorage.getItem('token') || ""
        },
        body: JSON.stringify({ channelId: video.channelId }),
      });

      setIsSubscribed(true);

      setVideos((videos) =>
  videos.map((vid) =>
    String(vid.id) === id
      ? { ...vid, subscriptions: vid.subscriptions + 1 }
      : vid
  )
);


                }}
                >
                  Subscribe
                </Button>)}


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
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <p className="font-semibold mb-1">
                {"100K"} views • {new Date(video.uploadedAt).toLocaleDateString()}
              </p>
              <p className="whitespace-pre-wrap">{video.description}</p>
            </div>

            <div className="mt-8">

              <CommentSection videoId={id}></CommentSection>
            </div>

          </div>


          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2">Up Next</h2>
            {upNextVideos.map((upNextVideo) => (

              <div key={upNextVideo.id} className="flex items-start gap-4 relative">
                <Link to={`/video/${upNextVideo.id}`} className="absolute inset-0">
                  <span className="sr-only">View {upNextVideo.title}</span>
                </Link>
                <img
                  src={upNextVideo.thumbnailUrl || "/placeholder.svg?height=94&width=168"}
                  alt={upNextVideo.title}
                  width={168}
                  height={94}
                  className="aspect-video w-80 rounded-lg object-cover"
                />
                <div className="text-sm">
                  <div className="font-medium line-clamp-2">{upNextVideo.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{upNextVideo.channel}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                     &middot; {new Date(upNextVideo.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
