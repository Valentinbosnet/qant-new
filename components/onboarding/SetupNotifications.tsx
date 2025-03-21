"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Check, Bell, RefreshCw, TrendingUp, TrendingDown, AlertTriangle, DollarSign } from "lucide-react"

interface SetupNotificationsProps {
  onComplete: () => void
}

export default function SetupNotifications({ onComplete }: SetupNotificationsProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: true,
    priceChangeThreshold: 5,
    newPredictions: true,
    marketSummaries: true,
    portfolioUpdates: true,
    newsAlerts: false,
  })

  const handleSwitchChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSliderChange = (value: number[]) => {
    setNotificationSettings((prev) => ({
      ...prev,
      priceChangeThreshold: value[0],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simuler un appel API pour enregistrer les préférences
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enregistrer les données dans localStorage pour la démo
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
      localStorage.setItem("notificationsSetup", "true")

      toast({
        title: "Notifications configurées",
        description: "Vos préférences de notification ont été enregistrées avec succès.",
        variant: "default",
      })

      onComplete()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la configuration des notifications.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6 space-y-6">
          <div className="text-center mb-4">
            <Bell className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
            <h3 className="text-lg font-medium text-white">Configurez vos notifications</h3>
            <p className="text-gray-400 text-sm">
              Personnalisez les alertes que vous souhaitez recevoir pour rester informé des mouvements du marché.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <Label htmlFor="priceAlerts" className="text-gray-300">
                  Alertes de prix
                </Label>
              </div>
              <Switch
                id="priceAlerts"
                checked={notificationSettings.priceAlerts}
                onCheckedChange={() => handleSwitchChange("priceAlerts")}
              />
            </div>

            {notificationSettings.priceAlerts && (
              <div className="ml-6 space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="priceChangeThreshold" className="text-sm text-gray-400">
                    Seuil de variation de prix
                  </Label>
                  <span className="text-sm text-emerald-500">{notificationSettings.priceChangeThreshold}%</span>
                </div>
                <Slider
                  id="priceChangeThreshold"
                  value={[notificationSettings.priceChangeThreshold]}
                  min={1}
                  max={10}
                  step={0.5}
                  onValueChange={handleSliderChange}
                />
                <p className="text-xs text-gray-500">
                  Vous recevrez une alerte lorsqu'un titre de votre portfolio varie de plus de{" "}
                  {notificationSettings.priceChangeThreshold}%.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <Label htmlFor="newPredictions" className="text-gray-300">
                  Nouvelles prédictions IA
                </Label>
              </div>
              <Switch
                id="newPredictions"
                checked={notificationSettings.newPredictions}
                onCheckedChange={() => handleSwitchChange("newPredictions")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-blue-500" />
                <Label htmlFor="marketSummaries" className="text-gray-300">
                  Résumés de marché
                </Label>
              </div>
              <Switch
                id="marketSummaries"
                checked={notificationSettings.marketSummaries}
                onCheckedChange={() => handleSwitchChange("marketSummaries")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <Label htmlFor="portfolioUpdates" className="text-gray-300">
                  Mises à jour du portfolio
                </Label>
              </div>
              <Switch
                id="portfolioUpdates"
                checked={notificationSettings.portfolioUpdates}
                onCheckedChange={() => handleSwitchChange("portfolioUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-purple-500" />
                <Label htmlFor="newsAlerts" className="text-gray-300">
                  Alertes d'actualités
                </Label>
              </div>
              <Switch
                id="newsAlerts"
                checked={notificationSettings.newsAlerts}
                onCheckedChange={() => handleSwitchChange("newsAlerts")}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            {loading ? (
              <span className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </span>
            ) : (
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Enregistrer mes préférences
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

