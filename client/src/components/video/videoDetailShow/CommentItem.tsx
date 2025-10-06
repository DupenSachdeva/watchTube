import { MoreVertical, ThumbsDown, ThumbsUp } from "lucide-react"
import type { comment } from "./CommentSection"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { useState } from "react"

interface props {
  c: comment
}

export default function CommentItem(prop: props) {

  const [replies , setReplies] = useState([]);
  const [showReplies , setShowReplies] = useState(false);
  const [showCommentBox , setShowCommentBox] = useState(false);
  const [newReply , setNewReply] = useState("");

  const formatDate = (date: Date) => {
    const now = new Date()
    const commentDate = new Date(date)
    const diffInHours = Math.floor((now.getTime() - commentDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`
    return commentDate.toLocaleDateString()
  }
  
  async function handleSubmit() {
     
    if(!showReplies){
      
    }

    setShowReplies(!showReplies)
  }

  return (
    <div className="flex items-start space-x-3 py-2">
      <Avatar className="w-10 h-10 bg-blue-300">
                  <AvatarImage src={ "/placeholder.svg"} alt={'d'} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm text-gray-900">@username</span>
          <span className="text-gray-500 text-xs">{formatDate(prop.c.createdAt)}</span>
        </div>

        <p className="text-sm text-gray-900 leading-relaxed mb-2">{prop.c.content}</p>

        <div className="space-y-2">  

  <div className="flex items-center space-x-4">
    <button
      className="text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors"
      onClick={() => setShowCommentBox(!showCommentBox)}
    >
      Reply
    </button>

    <button
      className="text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors"
      onClick={handleSubmit}
    >
      {showReplies ? "Hide Replies" : "Show Replies"}
    </button>
  </div>

  {showCommentBox && (
    <div className="flex-1">
      <input
        type="text"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Add a reply..."
        className="w-full pb-2 border-b border-gray-300 focus:border-gray-900 outline-none bg-transparent text-sm placeholder-gray-500"
        onKeyPress={(e) => {
          if (e.key === "Enter" && newReply.trim()) {
            handleSubmit();
          }
        }}
      />

      {newReply.trim() && (
        <div className="flex justify-end mt-3 space-x-2">
          <button
            onClick={() => setNewReply("")}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  )}
</div>


          
        </div>
      </div>
    
  )
}
