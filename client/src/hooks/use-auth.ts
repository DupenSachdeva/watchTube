import { useEffect, useState } from "react"
import axios from "axios"
interface User{
    name:string,
    email:string,
    password:string
}
export function useAuth(userobj:User){
    
    const [loading,setLoading] = useState(true);
    const [data,setData] = useState();
    const [error,setError] = useState("");

    axios.post("http://localhost:3000/auth/signup",{
        username:userobj.name,
        email:userobj.email,
        password:userobj.password
    }).then((res)=>{

        if(!res.data.success)
            setError(res.data.message)

        else{
            localStorage.setItem("token",res.data.token)
        }

    }).catch((err)=>{
        setError(err)
    }).finally(()=>{setLoading(false)})

    return [loading,error];
}