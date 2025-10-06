"use client"

import { Lock, Tv, User } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../hooks/use-auth"
import Error from "../../UtilComponents/error"
import { useSetRecoilState } from "recoil"
import { isLoggedInatom } from "../../recoil/atoms/isLoggedIn"

export default function Signup() {
  const navigate = useNavigate()
  const [name, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { signup, loading, error } = useAuth()
  const setIsloggedin = useSetRecoilState(isLoggedInatom)

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white text-gray-700 p-4 rounded-lg shadow">Loading...</div>
        </div>
      )}
      {error && <Error />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          
          {/* Logo */}
          <div className="text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Tv className="h-8 w-8 text-gray-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Create your <span className="text-indigo-600">WatchTube</span> account
            </h2>
            <p className="text-gray-500 mt-1">Join now and start your journey</p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6">
            <div className="space-y-5">
              {/* Username */}
              <div>
                <Label htmlFor="username" className="block text-sm text-gray-700 mb-1">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email-address" className="block text-sm text-gray-700 mb-1">
                  Email Address
                </Label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
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
                    className="pl-10 w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="block text-sm text-gray-700 mb-1">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10 w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <span className="text-indigo-600 hover:underline cursor-pointer">Terms & Conditions</span>
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="button"
              className="w-full py-3 rounded-lg font-semibold text-white text-lg bg-indigo-600 hover:bg-indigo-700 shadow transition"
              onClick={() => {
                signup(name, email, password)
                setIsloggedin(true)
              }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Your Account"}
            </Button>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">Already have an account?</p>
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="text-indigo-600 hover:underline font-medium mt-1"
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
