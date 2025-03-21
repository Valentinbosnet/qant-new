"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, ChevronRight } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export default function GetStartedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const { toast } = useToast()

  // Définition des étapes
  const steps = [
    {
      id: "profile",
      title: "Complétez votre profil",
      description: "Ajoutez vos informations personnelles et vos préférences d'investissement.",
      component: <ProfileSetup onComplete={() => handleComplete(0)} />,
    },
    {
      id: "account",
      title: "Connectez votre compte",
      description: "Liez votre compte bancaire ou de courtage pour suivre vos investissements.",
      component: <ConnectAccount onComplete={() => handleComplete(1)} />,
    },
    {
      id: "predictions",
      title: "Explorez les prédictions IA",
      description: "Découvrez comment notre IA peut vous aider à prendre de meilleures décisions d'investissement.",
      component: <ExploreAIPredictions onComplete={() => handleComplete(2)} />,
    },
    {
      id: "notifications",
      title: "Configurez vos notifications",
      description: "Personnalisez vos alertes pour rester informé des mouvements du marché.",
      component: <SetupNotifications onComplete={() => handleComplete(3)} />,
    },
  ]

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Check if there's a stored current step
  useEffect(() => {
    const storedStep = localStorage.getItem("currentOnboardingStep")
    if (storedStep) {
      const stepIndex = steps.findIndex((step) => step.id === storedStep)
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex)
      }
      localStorage.removeItem("currentOnboardingStep")
    }

    // Check for completed steps
    const completedSteps = []
    if (localStorage.getItem("profileCompleted") === "true") completedSteps.push(0)
    if (localStorage.getItem("accountConnected") === "true") completedSteps.push(1)
    if (localStorage.getItem("aiPredictionsExplored") === "true") completedSteps.push(2)
    if (localStorage.getItem("notificationsSetup") === "true") completedSteps.push(3)

    setCompleted(completedSteps)
  }, [steps]) // Ajout de steps comme dépendance

  const handleComplete = (stepIndex: number) => {
    if (!completed.includes(stepIndex)) {
      const newCompleted = [...completed, stepIndex]
      setCompleted(newCompleted)

      // Save completion status
      switch (stepIndex) {
        case 0:
          localStorage.setItem("profileCompleted", "true")
          break
        case 1:
          localStorage.setItem("accountConnected", "true")
          break
        case 2:
          localStorage.setItem("aiPredictionsExplored", "true")
          break
        case 3:
          localStorage.setItem("notificationsSetup", "true")
          break
      }

      // Move to next step if not the last one
      if (stepIndex < steps.length - 1) {
        setCurrentStep(stepIndex + 1)
      }
    }
  }

  const progress = (completed.length / steps.length) * 100

  useEffect(() => {
    // If all steps are completed, mark onboarding as completed
    if (completed.length === steps.length) {
      const markOnboardingComplete = async () => {
        try {
          const response = await fetch("/api/user/complete-onboarding", {
            method: "POST",
          })

          if (!response.ok) {
            console.error("Failed to mark onboarding as completed")
          }
        } catch (error) {
          console.error("Error marking onboarding as completed:", error)
        }
      }

      markOnboardingComplete()
    }
  }, [completed, steps.length]) // Ajout de steps.length comme dépendance

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-emerald-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-emerald-500">Chargement...</p>
        </div>
      </div>
    )
  }

  // All steps completed
  if (completed.length === steps.length) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white text-center">Configuration terminée !</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500 rounded-md p-6 text-center">
                <Check className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Félicitations !</h3>
                <p className="text-gray-300 mb-6">
                  Vous avez terminé toutes les étapes de configuration. Votre compte est maintenant prêt à être utilisé.
                </p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Accéder au tableau de bord <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-white">Configurez votre compte</CardTitle>
            <p className="text-gray-400 mt-2">
              Suivez ces étapes pour configurer votre compte et commencer à utiliser TradeAssist.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Progression</p>
              <p className="text-sm text-gray-400">
                {completed.length}/{steps.length} étapes
              </p>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {steps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`bg-gray-700 border-gray-600 cursor-pointer transition-all ${
                    currentStep === index ? "ring-2 ring-emerald-500" : ""
                  } ${completed.includes(index) ? "border-emerald-500" : ""}`}
                  onClick={() => setCurrentStep(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          completed.includes(index) ? "bg-emerald-500" : "bg-gray-600"
                        }`}
                      >
                        {completed.includes(index) ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <span className="text-xs text-white">{index + 1}</span>
                        )}
                      </div>
                      {currentStep === index && !completed.includes(index) && (
                        <div className="animate-pulse bg-emerald-500/20 px-2 py-1 rounded text-xs text-emerald-500">
                          En cours
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-white">{step.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{steps[currentStep].title}</h3>
              <p className="text-gray-300 mb-6">{steps[currentStep].description}</p>

              {/* Current step component */}
              {steps[currentStep].component}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Placeholder components for the steps
function ProfileSetup({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">Complétez votre profil pour obtenir des recommandations personnalisées.</p>
      <Button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Compléter le profil
      </Button>
    </div>
  )
}

function ConnectAccount({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">Connectez votre compte bancaire ou de courtage pour suivre vos investissements.</p>
      <Button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Connecter un compte
      </Button>
    </div>
  )
}

function ExploreAIPredictions({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Découvrez comment notre IA peut vous aider à prendre de meilleures décisions d'investissement.
      </p>
      <Button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Explorer les prédictions
      </Button>
    </div>
  )
}

function SetupNotifications({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">Personnalisez vos alertes pour rester informé des mouvements du marché.</p>
      <Button onClick={onComplete} className="bg-emerald-600 hover:bg-emerald-700 text-white">
        Configurer les notifications
      </Button>
    </div>
  )
}
