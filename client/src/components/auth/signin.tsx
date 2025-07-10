import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tv, Lock } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export default function Signin(){
    const navigate = useNavigate();
    
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-purple-600 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-black bg-opacity-50 p-8 rounded-lg shadow-xl backdrop-blur-md">
            
            <div className="text-center">
              <Tv className="mx-auto h-16 w-16 text-yellow-400 animate-pulse" />
              <h2 className="mt-6 text-3xl font-extrabold text-white">
                 'Welcome Back to ColorTube!'
              </h2>
            </div>
            
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                
                <div>
                  <Label htmlFor="email-address" className="sr-only">Email address</Label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm bg-white bg-opacity-80"
                    placeholder="Your groovy email"
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
                    className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-white bg-opacity-80"
                    placeholder="Your secret password"
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
    
                
              </div>
    
              <div>
                <Button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                 onClick={()=>navigate("/home")}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            
                                <Lock className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400" aria-hidden="true" />
                  </span>
                 'Dive Back In!'
                </Button>
              </div>
            </form>
            <div className="text-center mt-4">
              <button  className="text-blue-400 hover:text-blue-300 transition-colors duration-300" onClick={()=>navigate("/")} >
             "New to the party? Join us!"
              </button>
            </div>
          </div>
        </div>
      )
    }
