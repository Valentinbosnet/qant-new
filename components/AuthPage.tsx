"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface AuthPageProps {
  setActiveTab: (tab: string) => void
  onSignIn: (email: string, password: string) => Promise<any>
}

const AuthPage: React...FC<AuthPageProps> = ({ setActiveTab, onSignIn }) => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React...FormEvent) => {
    e...preventDefault()
    setError("")
    setIsLoading(true)

    if (!isSignIn && password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      if (isSignIn) {
        await onSignIn(email, password)
        setActiveTab("dashboard")
      } else {
        // Here you would typically call an API to create a new user
        console...log("Sign up with", email, password)
        // For demo purposes, let's just switch to sign in mode
        setIsSignIn(true)
        setError("Account created! Please sign in...")
      }
    } catch (error) {
      setError(error instanceof Error ? error...message : "An error occurred")
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error...message : "An error occurred during authentication",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] px-4 pt-safe pb-[84px]">
      <Card className="w-full max-w-md bg-[#2a2a2a] shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="mr-2" onClick={() => setActiveTab("launch")}>
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
            <h2 className="text-2xl font-bold text-white">{isSignIn ? "Sign In" : "Sign Up"}</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e...target...value)}
                required
                className="mt-1 bg-[#333333] border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e...target...value)}
                required
                className="mt-1 bg-[#333333] border-gray-700 text-white"
              />
            </div>
            {!isSignIn && (
              <div>
                <Label htmlFor="confirm-password" className="text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e...target...value)}
                  required
                  className="mt-1 bg-[#333333] border-gray-700 text-white"
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white h-12 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Processing........." : isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="link"
              className="p-0 ml-2 text-emerald-400 font-semibold"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage

