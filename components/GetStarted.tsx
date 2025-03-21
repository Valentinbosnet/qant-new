"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Step {
  id: string
  title: string
  description: string
  action: string
}

const steps: Step[] = [
  {
    id: "profile",
    title: "Complete Your Profile",
    description: "Add your investment experience and goals to get personalized recommendations.",
    action: "Update Profile",
  },
  {
    id: "account",
    title: "Connect Your First Account",
    description: "Link a brokerage account to start tracking your investments.",
    action: "Connect Account",
  },
  {
    id: "predictions",
    title: "Explore AI Predictions",
    description: "Check out our AI-powered market predictions to inform your investment decisions.",
    action: "View Predictions",
  },
  {
    id: "notifications",
    title: "Set Up Notifications",
    description: "Customize your alert preferences to stay informed about market changes.",
    action: "Set Alerts",
  },
]

interface GetStartedProps {
  setActiveTab: (tab: string) => void
}

const GetStarted: React.FC<GetStartedProps> = ({ setActiveTab }) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    // Check localStorage for completed steps
    const profileCompleted = localStorage.getItem("profileCompleted") === "true"
    const accountConnected = localStorage.getItem("accountConnected") === "true"
    const aiPredictionsExplored = localStorage.getItem("aiPredictionsExplored") === "true"
    const notificationsSetup = localStorage.getItem("notificationsSetup") === "true"

    const completed: string[] = []
    if (profileCompleted) completed.push("profile")
    if (accountConnected) completed.push("account")
    if (aiPredictionsExplored) completed.push("predictions")
    if (notificationsSetup) completed.push("notifications")

    setCompletedSteps(completed)
  }, [])

  const handleStepAction = (stepId: string) => {
    // Navigate to the full onboarding experience with the specific step
    setActiveTab("getStarted")

    // We'll pass the current step through localStorage
    localStorage.setItem("currentOnboardingStep", stepId)
  }

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <Card className="bg-[#2a2a2a] shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Get Started with Qant</h2>
        <Progress value={progress} className="mb-6" />
        <div className="space-y-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: steps.indexOf(step) * 0.1 }}
            >
              <Card
                className={`bg-[#333333] ${completedSteps.includes(step.id) ? "border-emerald-500" : "border-gray-700"}`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  <Button
                    onClick={() => handleStepAction(step.id)}
                    className={`ml-4 ${
                      completedSteps.includes(step.id)
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90"
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <>
                        {step.action} <ChevronRight className="h-5 w-5 ml-1" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {completedSteps.length > 0 && completedSteps.length < steps.length && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => setActiveTab("getStarted")}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
            >
              Continue Setup <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        )}

        {completedSteps.length === steps.length && (
          <div className="mt-6 bg-emerald-500/10 border border-emerald-500 rounded-md p-4 text-emerald-400">
            <p className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              All steps completed! Your Qant experience is fully set up.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GetStarted

