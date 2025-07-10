import { Outlet,useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VideoSection(){
   const [selected,setSelected] = useState("trending")
   const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col overflow-hidden z-0">

        <div className="bg-white  backdrop-blur-sm p-2 flex justify-start">
          <Button
           variant="secondary" className= {`rounded-full py-4 px-4 ${selected=="trending" ? 'bg-purple-100 text-purple-700': 'text-gray-500'}  border-none shadow-none text-sm   hover:bg-purple-100 hover:text-purple-700  `}
          
          onClick={()=>{
            setSelected("trending")
            navigate('trending')}}>
          Trending
          </Button>
          <Button
          className= {`rounded-full py-4 px-4 ${selected=="new" ? 'bg-purple-100 text-purple-700': 'text-gray-500'}  border-none shadow-none text-sm   hover:bg-purple-100 hover:text-purple-700  `}
           onClick={()=>{
            setSelected("new")
            navigate("new")}}
          >
            New
          </Button>
          <Button
           className= {`rounded-full py-4 px-4 ${selected=="following" ? 'bg-purple-100 text-purple-700': 'text-gray-500'}  border-none shadow-none text-sm  hover:bg-purple-100 hover:text-purple-700   `}
           onClick={()=>{
            setSelected("following")
            navigate("following")}}
          >
            Following
          </Button>
        </div>

        <div className="flex-1 relative ">
              <Outlet></Outlet>
 
        </div>

        </div>
)
}