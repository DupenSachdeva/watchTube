"use client"

import { Bell, HelpCircle, LayoutDashboardIcon, LogOut, Menu, Search, Settings, User, Video } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { usernameAtom, usernameEmail } from "../../recoil/atoms/userAtom"
import { channelAtom } from "../../recoil/atoms/channelAtom"
import { isLoggedInatom } from "../../recoil/atoms/isLoggedIn"
import { searchAtom } from "../../recoil/atoms/searchAtom"

export default function Header() {
  const navigate = useNavigate()
  const [sidebarOpen, setSideBarOpen] = useState(false)
  const name = useRecoilValue(usernameAtom)
  const email = useRecoilValue(usernameEmail)
  const channel = useRecoilValue(channelAtom)
  const isLoggedIn = useRecoilValue(isLoggedInatom)
  const setSearch = useSetRecoilState(searchAtom);
  console.log(name);
  
  return (
    <>
      <header className="p-4 flex justify-between items-center bg-white backdrop-blur-sm shadow-sm border-b border-slate-200">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2 text-slate-700 hover:text-sky-700 hover:bg-sky-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className=" cursor-pointer text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-slate-700 to-sky-600"
          onClick={()=>{
            navigate('/home')
          }}
          >
            watchTube
          </h1>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search"
              onChange={(e)=>{setSearch(e.target.value)}}
              className="w-full p-6 bg-white bg-opacity-50 border border-slate-200 placeholder-slate-400 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 rounded-full"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button onClick={()=>{
             navigate("/uploadVideo")
          }}
            variant="ghost"
            size="icon"
            className="text-slate-700 hover:text-sky-700 hover:bg-sky-50 rounded-full"
          >
            <Video className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 hover:text-sky-700 hover:bg-sky-50 rounded-full"
          >
            <Bell className="h-6 w-6" />
          </Button>
          <Avatar className="hover:text-sky-700" onClick={() => {
                setSideBarOpen(!sidebarOpen)
              }}>
            <AvatarImage src={`${channel.pictureUrl}`} alt="User" className="w-8 rounded-full cursor-pointer"/>
            <AvatarFallback
              
            >
              <User className="h-6 w-6 cursor-pointer text-slate-700 hover:text-sky-700" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <aside
        className={`z-10 fixed top-20 right-0 h-full w-64 bg-white backdrop-blur-sm shadow-xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 flex items-center">
              <AvatarImage src={`${channel.pictureUrl}`} alt="User"  className="w-12 rounded-full"/>
              <AvatarFallback>
                <User className="h-8 w-8 text-slate-600" />
              </AvatarFallback>
            </Avatar>
            <div className="">
              <h2 className="text-xl font-semibold text-slate-800">{name}</h2>
              <p className="text-sm text-slate-600">{email}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors duration-200"
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors duration-200"
            >
              <LayoutDashboardIcon className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors duration-200"
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors duration-200"
            >
              <HelpCircle className="mr-2 h-5 w-5" />
              Help & Support
            </Button>
          </nav>
          <hr className="border-slate-200" />
          
          
          {isLoggedIn && (<Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"

            onClick={()=>{
              localStorage.removeItem('token');
              navigate('/signin')
            }}
          >
            <LogOut className="mr-2 h-5 w-5"  />
            Log Out
          </Button>)}

          {!isLoggedIn && (<Button
            variant="ghost"
            className="w-full justify-start bg-blue-300 hover:bg-red-50 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            onClick={()=>{
              navigate('/signin')
            }}
          >
            
            Sign In
          </Button>)}


        </div>
      </aside>
    </>
  )
}
