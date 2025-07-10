import { Divide, Lock, Tv, User } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

export default function Signup(){
    const navigate = useNavigate();
    const [name,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const[error,setError] = useState(false);
    const[loading,setLoading] = useState(false)

    
    return<>

    {loading && <div>
       loading
      </div>}

    {error && <div>
      error
      </div>}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black bg-opacity-50 p-8 rounded-lg shadow-xl backdrop-blur-md">
        
        <div className="text-center">
          <Tv className="mx-auto h-16 w-16 text-yellow-400 animate-pulse" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
             'Join the ColorTube Family!'
          </h2>
        </div>
        
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            
              <div className="mb-4">
                <Label htmlFor="username" className="sr-only">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-white"
                  placeholder="username"
                  onChange={(e)=>{
                      setUsername (e.target.value)
                  }}
                />
              </div>
            
            <div>
              <Label htmlFor="email-address" className="sr-only">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm bg-white "
                placeholder=" email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="py-2">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white"
                placeholder=" password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-100">
                Remember me
              </Label>
            </div>

            
              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-400 hover:text-yellow-300">
                  Forgot your password?
                </a>
              </div>
              
            </div>

          <div>

            <Button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              onClick={()=>{
                console.log("hi");
                
                axios.post("http://localhost:3000/auth/signup",{
                  username:name,
                  email:email,
                  password:password
              },{
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then((res)=>{
                  
                  console.log("hi there");
                  
                  if(!res.data.success)
                      setError(res.data.message)
          
                  else{
                      localStorage.setItem("token",res.data.token)
                      navigate("/home")
                  }
          
              }).catch((err)=>{
                  console.log("hi");
                  
                  setError(err)

              }).finally(()=>{setLoading(false)
                
              })
          
               }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                 <User className="h-5 w-5 text-pink-500 group-hover:text-pink-400" aria-hidden="true" /> : 
                            <Lock className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" aria-hidden="true" />
              </span>
              'Start Your ColorTube Journey!' :
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300" onClick={()=>navigate("/signin")}>
            'Already part of the crew? Sign in!'
          </button>
        </div>
      </div>
    </div>
    </>
}