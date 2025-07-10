import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

export default function Home(){
    const location = useLocation();
    const isProfileRoute = location.pathname=== "/home/profile" || location.pathname === "/home/channel-info"
    return<>
    
      <div className="flex h-screen bg-gradient-to-br bg-white ">

        <Sidebar></Sidebar>
        
        <div className="flex-1 overflow-auto ">
            {!isProfileRoute && <Header></Header>}
            <Outlet></Outlet>
        </div>

      </div>
      
    </>
}