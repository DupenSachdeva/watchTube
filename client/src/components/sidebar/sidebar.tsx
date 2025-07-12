"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { BookMarked, Compass, Home, ThumbsUp, Tv } from "lucide-react"

export default function Sidebar() {
  const navigate = useNavigate()
  const handleHomeClick = () => navigate("/home")
  const handleExploreClick = () => navigate("/explore")
  const handleSubscriptionsClick = () => navigate("/subscriptions")
  const handleLikedVideosClick = () => navigate("/liked")

  return (
    <>
      <aside className="w-16 md:w-56 bg-white backdrop-blur-sm shadow-md flex flex-col items-center md:items-start py-8 space-y-8 border-r border-slate-200">
        <div className="w-full flex justify-center md:justify-start px-4">
          <Tv className="w-8 h-8 text-sky-500" />
        </div>

        <nav className="flex flex-col items-center md:items-start space-y-6 w-full">
          {[
            { icon: Home, label: "Home", onClick: handleHomeClick },
            { icon: Compass, label: "Explore", onClick: handleExploreClick },
            { icon: BookMarked, label: "Subscriptions", onClick: handleSubscriptionsClick },
            { icon: ThumbsUp, label: "Liked Videos", onClick: handleLikedVideosClick },
          ].map(({ icon: Icon, label, onClick }) => (
            <Button
              key={label}
              variant="ghost"
              size="lg"
              className="w-full justify-center md:justify-start text-slate-800 hover:bg-sky-50 hover:text-sky-700 active:bg-sky-100 rounded-full p-4 transition-colors duration-200"
              onClick={onClick}
            >
              <Icon className="w-6 h-6 md:mr-2" />
              <span className="hidden md:inline font-medium">{label}</span>
            </Button>
          ))}
        </nav>
      </aside>
    </>
  )
}
