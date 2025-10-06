import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { VideoListAtom, type Video } from "../recoil/atoms/videoAtom";

export function useGetVideos() {

  const [videos, setVideos] = useRecoilState(VideoListAtom);
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  
  const fetchVideos = async (pageNumber: number) => {

    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${BACKEND_URL}/video/get?page=${pageNumber}&limit=6`
      );

      const newVideos: Video[] = res.data.videos;

      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos(prev => [...prev, ...newVideos]);
        console.log("url is ");
        
        console.log(newVideos[0].channelUrl);
        
        setPage(pageNumber);
      }
    } catch (err) {
      console.error("Error fetching thumbnails:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos(1);
    }
  }, []);

  return {
    videos,
    fetchNextPage: () => fetchVideos(page + 1),
    loading,
    hasMore,
  };
}