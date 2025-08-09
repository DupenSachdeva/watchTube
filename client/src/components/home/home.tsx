import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useRecoilState } from "recoil";
import { channelAtom } from "../../recoil/atoms/channelAtom";
import { useFetchChannelData } from "../../hooks/use-fetch";
import SuccessMessage from "../../UtilComponents/Success";
import Success from "../../UtilComponents/Success";
import Error from "../../UtilComponents/error";

export default function Home(){
  
    const location = useLocation();
    const isProfileRoute = location.pathname=== "/home/profile" || location.pathname === "/home/channel-info"
    

    const { success, loading, error } = useFetchChannelData(); 

    return<>
      
      {success && <Success></Success>}
      {error && <Error></Error>}

      <div className="flex h-screen bg-gradient-to-br bg-white ">

        <Sidebar></Sidebar>
        
        <div className="flex-1 overflow-auto ">
            {!isProfileRoute && <Header></Header>}
            <Outlet></Outlet>
        </div>

      </div>
      
    </>
}