"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaGoogle } from "react-icons/fa"
import { useToast } from "@/components/ui/use-toast"

interface SignInPageProps {
  setActiveTab: (tab: string) => void
}

export default function SignInPage({ setActiveTab }: SignInPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React...FormEvent) => {
    e...preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?...error) {
        toast({
          title: "Authentication failed",
          description: "Please check your credentials and try again...",
          variant: "destructive",
        })
      } else {
        router...push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later...",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-4">
      <Card className="w-full max-w-md bg-[#2a2a2a] shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-white">Sign in to Qant</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example...com"
                value={email}
                onChange={(e) => setEmail(e...target...value)}
                required
                className="bg-[#333333] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setActiveTab("forgotPassword")}
                  className="text-xs text-emerald-400 hover:text-emerald-300"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e...target...value)}
                required
                className="bg-[#333333] border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in........." : "Sign in"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#2a2a2a] px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-700 text-white hover:bg-[#333333]"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className="text-emerald-400 hover:text-emerald-300"
            >
              Sign up
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

