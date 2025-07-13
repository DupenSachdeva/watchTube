"use client"

import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function VideoSection() {
  const [selected, setSelected] = useState("trending")
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col overflow-hidden z-0">
      <div className="bg-white backdrop-blur-sm p-2 flex justify-start border-b border-slate-200">
        <Button
          variant="secondary"
          className={`rounded-full py-4 px-4 ${
            selected == "trending" ? "bg-sky-100 text-sky-700" : "text-slate-500"
          } border-none shadow-none text-sm hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200`}
          onClick={() => {
            setSelected("trending")
            navigate("trending")
          }}
        >
          Trending
        </Button>
        <Button
          className={`rounded-full py-4 px-4 ${
            selected == "new" ? "bg-sky-100 text-sky-700" : "text-slate-500"
          } border-none shadow-none text-sm hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200`}
          onClick={() => {
            setSelected("new")
            navigate("new")
          }}
        >
          New
        </Button>
        <Button
          className={`rounded-full py-4 px-4 ${
            selected == "following" ? "bg-sky-100 text-sky-700" : "text-slate-500"
          } border-none shadow-none text-sm hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200`}
          onClick={() => {
            setSelected("following")
            navigate("following")
          }}
        >
          Following
        </Button>
      </div>
      <div className="flex-1 relative">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
