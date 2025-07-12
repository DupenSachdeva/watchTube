import { Camera, Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { UploadContext, useUploadContext } from "../../../contexts/uploadVideoContext";
import { useRef, useState } from "react";
import DetailsSpecify from "./detailsSpecify";
import type { ChildProps } from "./showUpload";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  currentStep: string
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>
}

function Details(){

        const { currentStep , setCurrentStep } = useOutletContext<ContextType>()

      const togglePlayPause = () => {

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

      const { video, setVideo , videoUrl , setVideoUrl } = useUploadContext()

      const [isPlaying , setIsPlaying] = useState(false);

      const videoRef = useRef<HTMLVideoElement>(null);

    return <>

       <div className={`grid grid-cols-1 ${currentStep !== "settings" ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-8`}>

       {  currentStep=="details" && (
       

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden bg-black">

                  <video
                    ref={videoRef}
                    src={videoUrl}

                    className="w-full aspect-video"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <Button variant="secondary" size="sm" className="absolute bottom-4 left-4" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">{video?.name}</p>
                  <p className="text-xs text-gray-500">Size: {(video?.size || 1 / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
           


        )}
        
        { (currentStep=="details" || currentStep=="settings") &&  (<div>
        <UploadContext.Provider value={{ video, setVideo , videoUrl , setVideoUrl}}>
                          
                          <DetailsSpecify currentStep = {currentStep} setCurrentStep={setCurrentStep} ></DetailsSpecify>

           </UploadContext.Provider>
        </div>)}

        </div>

        </>

}

    

export default Details;