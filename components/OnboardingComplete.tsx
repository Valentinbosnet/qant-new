"use client"

import { motion } from "framer-motion"
import { Rocket, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react"
import confetti from "canvas-confetti"

interface OnboardingCompleteProps {
  onFinish: () => void
  completedSteps: string[]
}

export default function OnboardingComplete({ onFinish, completedSteps }: OnboardingCompleteProps) {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-[#2a2a2a] shadow-lg border-gray-800">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Rocket className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">You're All Set!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400 mb-6">
            You've successfully completed the onboarding process and your Qant account is ready to use.
          </p>

          <div className="bg-[#333333] rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-3">Completed Steps:</h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-center text-gray-300">
                <Check
                  className={`mr-2 h-5 w-5 ${completedSteps.includes("profile") ? "text-emerald-500" : "text-gray-600"}`}
                />
                <span className={completedSteps.includes("profile") ? "text-white" : "text-gray-500"}>
                  Profile Setup
                </span>
              </li>
              <li className="flex items-center text-gray-300">
                <Check
                  className={`mr-2 h-5 w-5 ${completedSteps.includes("account") ? "text-emerald-500" : "text-gray-600"}`}
                />
                <span className={completedSteps.includes("account") ? "text-white" : "text-gray-500"}>
                  Account Connection
                </span>
              </li>
              <li className="flex items-center text-gray-300">
                <Check
                  className={`mr-2 h-5 w-5 ${completedSteps.includes("predictions") ? "text-emerald-500" : "text-gray-600"}`}
                />
                <span className={completedSteps.includes("predictions") ? "text-white" : "text-gray-500"}>
                  AI Predictions Exploration
                </span>
              </li>
              <li className="flex items-center text-gray-300">
                <Check
                  className={`mr-2 h-5 w-5 ${completedSteps.includes("notifications") ? "text-emerald-500" : "text-gray-600"}`}
                />
                <span className={completedSteps.includes("notifications") ? "text-white" : "text-gray-500"}>
                  Notifications Setup
                </span>
              </li>
            </ul>
          </div>

          <p className="text-white font-medium">
            What's next? Start exploring your dashboard to see AI-powered investment insights!
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            onClick={onFinish}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white px-8"
          >
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

