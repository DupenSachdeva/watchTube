import { useEffect, useState, useCallback } from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  hasReplies: boolean;
  parentId?: string;
}

export function useGetReply(commentId: string) {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReplies = useCallback(async () => {
    if (!commentId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/comments/${commentId}/replies`);
      if (!res.ok) throw new Error("Failed to fetch replies");
      const data: Comment[] = await res.json();
      setReplies(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [commentId]);



  return { replies, loading, error, fetchReplies };
}
