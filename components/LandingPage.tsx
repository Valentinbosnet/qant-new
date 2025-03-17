"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  setActiveTab: (tab: string) => void
}

const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Qant</h1>
      <p className="text-xl md:text-2xl mb-8">Your AI-Powered Quant for Smarter Stock Market Decisions</p>
      <div className="space-y-4 w-full max-w-md">
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600" onClick={() => setActiveTab("signup")}>
          Sign Up
        </Button>
        <Button className="w-full bg-gray-700 hover:bg-gray-600" onClick={() => setActiveTab("signin")}>
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default LandingPage

