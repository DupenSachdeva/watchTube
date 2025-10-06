import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import type { comment, props } from "../components/video/videoDetailShow/CommentSection";


export function useGetComments(videoId: props) {

  const [comments, setComments] = useState<comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchComments = useCallback( async () => {
    try {

      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${BACKEND_URL}/video/comments?videoId=${videoId.videoId}`
      );

      setComments(response.data);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  },[videoId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments,setComments, loading, error,fetchComments };
}
