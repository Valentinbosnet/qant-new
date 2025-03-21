"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      // Fetch user details to check verification status
      const userResponse = await fetch("/api/user/me")
      const userData = await userResponse.json()

      if (userData.user && !userData.user.emailVerified) {
        // User is not verified, redirect to verification notice
        router.push("/verify-email-notice")
      } else if (userData.user && userData.user.emailVerified && !userData.user.onboardingCompleted) {
        // User is verified but hasn't completed onboarding
        router.push("/get-started")
      } else {
        // User is verified and completed onboarding
        router.push("/dashboard")
      }

      router.refresh()
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <Card className="w-full max-w-md p-8 bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <p className="text-gray-300 mt-2">Welcome back to TradeAssist</p>
          </div>

          {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-md">{error}</div>}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">
              Créer un compte
            </Link>
          </div>
        </form>
      </Card>
    </main>
  )
}

