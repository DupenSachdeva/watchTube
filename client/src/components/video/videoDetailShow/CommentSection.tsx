"use client"

import { useState } from "react"
import axios from "axios"
import CommentItem from "./CommentItem"
import { useGetComments } from "../../../hooks/useGetComments"
import { BACKEND_URL } from "../../../config/config"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { useRecoilValue } from "recoil"
import { channelAtom } from "../../../recoil/atoms/channelAtom"

export interface props {
  videoId: string | undefined
}

export interface comment {
  id: number
  content: string | undefined
  likes: number
  dislikes: number
  createdAt: Date
}

export default function CommentSection(videoId: props) {

  const channel = useRecoilValue(channelAtom);

  console.log(channel);
  
  const { comments, setComments } = useGetComments(videoId)
  const [newComment, setNewComment] = useState("")

  return (
    <div className="mt-6">
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-900 mb-4">{comments.length} Comments</h3>

        <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10 bg-blue-300">
                  <AvatarImage src={channel.pictureUrl || "/placeholder.svg"} alt={channel.name} />
                  <AvatarFallback>{channel.name[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>


          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full pb-2 border-b border-gray-300 focus:border-gray-900 outline-none bg-transparent text-sm placeholder-gray-500"
              onKeyPress={(e) => {
                if (e.key === "Enter" && newComment.trim()) {
                  handleSubmit()
                }
              }}
            />

            {newComment.trim() && (
              <div className="flex justify-end mt-3 space-x-2">
                <button
                  onClick={() => setNewComment("")}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((c: comment) => (
          <CommentItem key={c.id} c={c} />
        ))}
      </div>
    </div>
  )

  async function handleSubmit() {
    if (!newComment.trim()) return

    try {
      const res = await axios.post(
        `${BACKEND_URL}/video/comment`,
        { content: newComment },
        {
          params: {
            videoId: videoId.videoId,
            parentId: -1,
          },
        },
      )

      const commentObj = {
        id: res.data.comment.id,
        content: res.data.comment.content,
        likes: res.data.comment.likes,
        dislikes: res.data.comment.dislikes,
        createdAt: res.data.comment.createdAt,
      }

      setComments((prev) => [...prev, commentObj])
      setNewComment("")
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }
}
