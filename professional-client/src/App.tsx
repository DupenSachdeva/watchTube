
import {Link, Routes,Route,} from "react-router-dom"
import { useState } from "react"
import { Main } from "./components/main"
import Analytics from "./components/analytics/analytics"
import { Upload } from "./components/upload"
import { ShowContent } from "./components/showContent"
import { Dashboard } from "./components/dashboard"
export default function App(){

    return<>
       
       <Routes>
         <Route path="/" element={<Main></Main>}>
            <Route path="/analytics" element={<Analytics></Analytics>}></Route>
            <Route path="/upload" element={<Upload></Upload>}></Route>
            <Route path="/content" element={<ShowContent></ShowContent>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
         </Route>
       </Routes>
       
    
    </>  

  
  
}

 