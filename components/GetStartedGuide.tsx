"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import ProfileSetup from "./onboarding/ProfileSetup"
import ConnectAccount from "./onboarding/ConnectAccount"
import ExploreAIPredictions from "./onboarding/ExploreAIPredictions"
import SetupNotifications from "./onboarding/SetupNotifications"
import OnboardingComplete from "./onboarding/OnboardingComplete"

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

interface GetStartedGuideProps {
  onTabChange: (tab: string) => void
}

const GetStartedGuide: React.FC<GetStartedGuideProps> = ({ onTabChange }) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useEffect(() => {
    const savedCompletedSteps = localStorage.getItem("completedSteps")
    if (savedCompletedSteps) {
      const parsedSteps = JSON.parse(savedCompletedSteps)
      setCompletedSteps(parsedSteps)
      setCurrentStepIndex(parsedSteps.length)
    }
  }, [])

  const handleStepComplete = (stepId: string) => {
    const newCompletedSteps = [...completedSteps, stepId]
    setCompletedSteps(newCompletedSteps)
    localStorage.setItem("completedSteps", JSON.stringify(newCompletedSteps))

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      localStorage.setItem("hasCompletedOnboarding", "true")
      onTabChange("dashboard")
    }
  }

  const renderStepComponent = () => {
    const currentStep = steps[currentStepIndex]
    switch (currentStep.id) {
      case "profile":
        return <ProfileSetup onComplete={() => handleStepComplete("profile")} />
      case "account":
        return <ConnectAccount onComplete={() => handleStepComplete("account")} />
      case "predictions":
        return <ExploreAIPredictions onComplete={() => handleStepComplete("predictions")} />
      case "notifications":
        return <SetupNotifications onComplete={() => handleStepComplete("notifications")} />
      default:
        return null
    }
  }

  const progress = (completedSteps.length / steps.length) * 100

  if (completedSteps.length === steps.length) {
    return <OnboardingComplete onFinish={() => onTabChange("dashboard")} completedSteps={completedSteps} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] px-4 pt-safe pb-[84px]">
      <Card className="w-full max-w-2xl bg-[#2a2a2a] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white mb-4">Get Started with Qant</CardTitle>
          <Progress value={progress} className="mb-6" />
        </CardHeader>
        <CardContent>{renderStepComponent()}</CardContent>
      </Card>
    </div>
  )
}

export default GetStartedGuide

