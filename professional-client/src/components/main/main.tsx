import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import { BarChart2, CircleDot, HelpCircle, LayoutDashboard, PlayCircle, Plus, Menu, Upload } from 'lucide-react';

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="h-full bg-background flex overflow-y-hidden">
        
        <aside
          className={`${
            isSidebarOpen ? 'w-54' : 'w-16'
          } fixed top-0 left-0 h-full border-r bg-white transition-all duration-300 overflow-hidden`}
        >
          <div className="flex flex-col gap-1 p-2 mt-14"> {/* Offset for header */}
            <div className={`flex items-center p-4 ${isSidebarOpen ? '' : 'justify-center'}`}>
              <Avatar className="flex h-10 w-10 bg-teal-500">
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              {isSidebarOpen && (
                <div className="ml-3">
                  <div className="font-semibold">Your channel</div>
                  <div className="text-sm text-muted-foreground">Dupen Sachdeva</div>
                </div>
              )}
            </div>
            {[
              { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
              { href: "/content", icon: PlayCircle, label: "Content" },
              { href: "/analytics", icon: BarChart2, label: "Analytics" },
              { href:"/upload",icon:Upload,label:"Upload"}
            ].map((item) => (
              <Link
                to={item.href}
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-50 ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </aside>
        
        {/* Main Content Wrapper */}
        <div className={`flex-1 ml-${isSidebarOpen ? '54' : '16'} transition-all duration-300`}>
          
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 flex items-center px-4 h-14 border-b bg-white z-10">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
            <div className="flex items-center gap-2 mr-auto">
              <CircleDot className="h-6 w-6 text-red-500" />
              <span className="font-semibold">Studio</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create
              </Button>
              <Avatar className="h-8 w-8 bg-teal-500">
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main Content */}
          <main className={`mt-14 ${ isSidebarOpen ? `ml-44`:`ml-10`} p-6 overflow-y-auto max-h-fit`}>
            <Outlet />
          </main>
          
        </div>
      </div>
    </>
  );
}
