"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import PaymentStep from "./PaymentStep"

interface SignUpPageProps {
  setActiveTab: (tab: string) => void
  onSignUp: (username: string, email: string, password: string) => Promise<{ email: string; password: string }>
  onAutoLogin: (email: string, password: string) => Promise<void>
}

const SignUpPage: React.FC<SignUpPageProps> = ({ setActiveTab, onSignUp, onAutoLogin }) => {
  useEffect(() => {
    console.log("SignUpPage mounted")
    return () => console.log("SignUpPage unmounted")
  }, [])

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState("signup") // "signup" or "payment"
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match and try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Call the API directly instead of using the prop
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Registration failed")
      }

      const data = await response.json()
      console.log("Sign up successful, new user:", data.user)

      // Use the original onSignUp for compatibility
      await onSignUp(username, email, password)

      // Use requestAnimationFrame to schedule state update outside of render
      requestAnimationFrame(() => {
        setStep("payment")
      })
    } catch (error) {
      console.error("Sign up error:", error)
      toast({
        title: "Sign up failed",
        description:
          error instanceof Error ? error.message : "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentComplete = async (paymentDetails: { plan: string; cardNumber: string }) => {
    console.log("Payment completed:", paymentDetails)
    toast({
      title: "Payment Successful",
      description: `Your ${paymentDetails.plan} plan has been activated.`,
      variant: "default",
    })

    try {
      await onAutoLogin(email, password)
      // Don't update state here, let the parent component handle it
    } catch (error) {
      console.error("Auto-login error:", error)
      toast({
        title: "Auto-login failed",
        description: "Please try signing in manually.",
        variant: "destructive",
      })
      // Use requestAnimationFrame to schedule state update outside of render
      requestAnimationFrame(() => {
        setActiveTab("signin")
      })
    }
  }

  if (step === "payment") {
    return <PaymentStep onComplete={handlePaymentComplete} onBack={() => setStep("signup")} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] px-4 pt-safe pb-[84px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-[#2a2a2a] shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <Button variant="ghost" className="mr-2" onClick={() => setActiveTab("launch")}>
                <ChevronLeft className="h-6 w-6 text-white" />
              </Button>
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 bg-[#333333] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 bg-[#333333] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 bg-[#333333] border-gray-700 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm-password" className="text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 bg-[#333333] border-gray-700 text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white h-12 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <p className="mt-4 text-center text-gray-400">
              Already have an account?
              <Button
                variant="link"
                className="p-0 ml-2 text-emerald-400 font-semibold"
                onClick={() => setActiveTab("signin")}
              >
                Sign In
              </Button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default SignUpPage

