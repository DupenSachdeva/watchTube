// pages/Home.tsx

import { useRecoilValue } from "recoil";
import { VideoListAtom } from "../../../recoil/atoms/videoAtom";
import { useGetVideos } from "../../../hooks/useGetVideos";
import VideoCard from "../videoCard.tsx/videoCard";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { searchAtom } from "../../../recoil/atoms/searchAtom";


export default function VideoFeed() {

  const videos = useRecoilValue(VideoListAtom);
  const search = useRecoilValue(searchAtom);


  let newvideos;

  if(search == ""){
    newvideos = videos;
  }
  else{
    newvideos = videos.filter((v) => {
      const query = search.toLowerCase();
      return (
        v.title.toLowerCase().includes(query))||
        v.channel.toLowerCase().includes(query)
    })
  }
  
  const { fetchNextPage, loading, hasMore } = useGetVideos();

  return (

    <ScrollArea className="h-[calc(100vh-9rem)]">

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
        {newvideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="p-4 flex justify-center">

        {hasMore && (

          <Button disabled={loading} onClick={fetchNextPage}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
        {!hasMore && <p className="text-gray-500">No more videos.</p>}
      </div>
    </ScrollArea>
  );
}
