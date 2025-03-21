"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingComplete() {
  const router = useRouter()

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="pt-6 space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-emerald-500" />
        </div>

        <h3 className="text-xl font-semibold text-white">Configuration terminée !</h3>

        <p className="text-gray-400">
          Félicitations ! Vous avez terminé toutes les étapes de configuration. Votre compte est maintenant prêt à être
          utilisé.
        </p>

        <div className="space-y-2 pt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Profil complété</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Compte connecté</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Prédictions IA explorées</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Notifications configurées</span>
          </div>
        </div>

        <Button onClick={handleGoToDashboard} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          <span className="flex items-center">
            Accéder au tableau de bord
            <ChevronRight className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </CardContent>
    </Card>
  )
}

