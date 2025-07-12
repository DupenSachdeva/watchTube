"use client"

import { Lock, Tv, User } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../hooks/use-auth"
import Error from "../../UtilComponents/error"

export default function Signup() {
  const navigate = useNavigate()
  const [name, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { signup, loading, error } = useAuth()

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-900 text-white p-4 rounded-lg">Loading...</div>
        </div>
      )}
      {error && (
        <Error></Error>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 bg-black bg-opacity-80 p-10 rounded-2xl shadow-2xl backdrop-blur-lg border border-blue-500/30">
          <div className="text-center">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Tv className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome to <span className="text-blue-400">ColorTube</span>
            </h2>
            <p className="text-blue-200 text-lg">Create your account and start your journey</p>
          </div>

          <form className="mt-10 space-y-6">
            <div className="space-y-5">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium text-blue-200 mb-2">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 w-full px-4 py-3 bg-blue-950/50 border border-blue-500/50 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email-address" className="block text-sm font-medium text-blue-200 mb-2">
                  Email Address
                </Label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 w-full px-4 py-3 bg-blue-950/50 border border-blue-500/50 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10 w-full px-4 py-3 bg-blue-950/50 border border-blue-500/50 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-400 rounded bg-blue-950/50"
                />
                <Label htmlFor="remember-me" className="ml-3 block text-sm text-blue-200">
                  I agree to the Terms & Conditions
                </Label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="button"
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => {
                  signup(name, email, password)
                }}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                      <User className="h-6 w-6 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    </span>
                    Create Your Account
                  </>
                )}
              </Button>
            </div>

            <div className="text-center pt-6 border-t border-blue-500/30">
              <p className="text-blue-200 mb-3">Already have an account?</p>
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign in here
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
