"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Check, User, Briefcase, TrendingUp, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProfileSetupProps {
  onComplete: () => void
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    occupation: "",
    experienceLevel: "intermediate",
    riskTolerance: 50,
    investmentGoals: [] as string[],
    notificationsEnabled: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceLevelChange = (value: string) => {
    setFormData((prev) => ({ ...prev, experienceLevel: value }))
  }

  const handleRiskToleranceChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, riskTolerance: value[0] }))
  }

  const handleInvestmentGoalToggle = (goal: string) => {
    setFormData((prev) => {
      const goals = [...prev.investmentGoals]
      if (goals.includes(goal)) {
        return { ...prev, investmentGoals: goals.filter((g) => g !== goal) }
      } else {
        return { ...prev, investmentGoals: [...goals, goal] }
      }
    })
  }

  const handleNotificationsToggle = () => {
    setFormData((prev) => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simuler un appel API pour enregistrer les préférences
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enregistrer les données dans localStorage pour la démo
      localStorage.setItem("userProfile", JSON.stringify(formData))
      localStorage.setItem("profileCompleted", "true")

      toast({
        title: "Profil mis à jour",
        description: "Vos préférences ont été enregistrées avec succès.",
        variant: "default",
      })

      onComplete()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre profil.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-300 flex items-center gap-2">
              <User className="h-4 w-4" /> Nom complet
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Entrez votre nom complet"
              className="bg-gray-700 border-gray-600 text-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-gray-300 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Profession
            </Label>
            <Input
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              placeholder="Entrez votre profession"
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Niveau d'expérience en investissement
            </Label>
            <RadioGroup
              value={formData.experienceLevel}
              onValueChange={handleExperienceLevelChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="text-gray-300">
                  Débutant
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="text-gray-300">
                  Intermédiaire
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="text-gray-300">
                  Avancé
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Tolérance au risque
            </Label>
            <div className="space-y-4">
              <Slider
                value={[formData.riskTolerance]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleRiskToleranceChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Faible risque</span>
                <span>Risque modéré</span>
                <span>Risque élevé</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Objectifs d'investissement</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["Croissance à long terme", "Revenu passif", "Retraite", "Préservation du capital"].map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Switch
                    checked={formData.investmentGoals.includes(goal)}
                    onCheckedChange={() => handleInvestmentGoalToggle(goal)}
                  />
                  <Label className="text-gray-300">{goal}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={formData.notificationsEnabled} onCheckedChange={handleNotificationsToggle} />
            <Label className="text-gray-300">Activer les notifications</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Enregistrement...
              </span>
            ) : (
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Enregistrer mon profil
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

