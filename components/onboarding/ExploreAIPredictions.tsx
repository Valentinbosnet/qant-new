"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw, Check, Info } from "lucide-react"

interface ExploreAIPredictionsProps {
  onComplete: () => void
}

export default function ExploreAIPredictions({ onComplete }: ExploreAIPredictionsProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [prediction, setPrediction] = useState<{
    stock: string
    name: string
    prediction: "bullish" | "bearish" | "neutral"
    confidence: "low" | "medium" | "high"
    reasoning: string[]
  } | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un symbole boursier.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simuler un appel API pour obtenir une prédiction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Générer une prédiction aléatoire pour la démo
      const predictions = ["bullish", "bearish", "neutral"] as const
      const confidences = ["low", "medium", "high"] as const

      const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)]
      const randomConfidence = confidences[Math.floor(Math.random() * confidences.length)]

      // Générer des raisons basées sur la prédiction
      let reasons: string[] = []
      if (randomPrediction === "bullish") {
        reasons = [
          "Tendance haussière sur les indicateurs techniques",
          "Résultats financiers supérieurs aux attentes",
          "Expansion sur de nouveaux marchés",
        ]
      } else if (randomPrediction === "bearish") {
        reasons = [
          "Tendance baissière sur les indicateurs techniques",
          "Résultats financiers inférieurs aux attentes",
          "Concurrence accrue dans le secteur",
        ]
      } else {
        reasons = [
          "Indicateurs techniques mixtes",
          "Résultats financiers conformes aux attentes",
          "Stabilité du marché dans ce secteur",
        ]
      }

      setPrediction({
        stock: searchQuery.toUpperCase(),
        name: getCompanyName(searchQuery.toUpperCase()),
        prediction: randomPrediction,
        confidence: randomConfidence,
        reasoning: reasons,
      })

      toast({
        title: "Prédiction générée",
        description: `Prédiction pour ${searchQuery.toUpperCase()} générée avec succès.`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de la prédiction.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getCompanyName = (symbol: string) => {
    const companies: Record<string, string> = {
      AAPL: "Apple Inc.",
      MSFT: "Microsoft Corporation",
      GOOGL: "Alphabet Inc.",
      AMZN: "Amazon.com, Inc.",
      META: "Meta Platforms, Inc.",
      TSLA: "Tesla, Inc.",
      NVDA: "NVIDIA Corporation",
      JPM: "JPMorgan Chase & Co.",
      V: "Visa Inc.",
      JNJ: "Johnson & Johnson",
    }

    return companies[symbol] || `${symbol} Corporation`
  }

  const handleComplete = () => {
    localStorage.setItem("aiPredictionsExplored", "true")
    onComplete()
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6 space-y-4">
          <div className="text-center mb-4">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
            <h3 className="text-lg font-medium text-white">Explorez les prédictions IA</h3>
            <p className="text-gray-400 text-sm">
              Découvrez comment notre intelligence artificielle peut vous aider à prendre de meilleures décisions
              d'investissement.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="searchQuery" className="text-gray-300">
                Rechercher un titre
              </Label>
              <div className="relative">
                <Input
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Entrez un symbole boursier (ex: AAPL, MSFT)"
                  className="bg-gray-700 border-gray-600 text-gray-200 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? (
                <span className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Génération de la prédiction...
                </span>
              ) : (
                <span className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Générer une prédiction
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {prediction && (
        <Card
          className={`border-l-4 ${
            prediction.prediction === "bullish"
              ? "border-l-green-500 bg-green-900/20"
              : prediction.prediction === "bearish"
                ? "border-l-red-500 bg-red-900/20"
                : "border-l-yellow-500 bg-yellow-900/20"
          } border-t-0 border-r-0 border-b-0`}
        >
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">{prediction.stock}</h3>
                <p className="text-gray-400 text-sm">{prediction.name}</p>
              </div>
              <div
                className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  prediction.prediction === "bullish"
                    ? "bg-green-500/20 text-green-400"
                    : prediction.prediction === "bearish"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {prediction.prediction === "bullish" && <TrendingUp className="mr-1 h-4 w-4" />}
                {prediction.prediction === "bearish" && <TrendingDown className="mr-1 h-4 w-4" />}
                {prediction.prediction === "neutral" && <Minus className="mr-1 h-4 w-4" />}
                {prediction.prediction === "bullish" && "Haussier"}
                {prediction.prediction === "bearish" && "Baissier"}
                {prediction.prediction === "neutral" && "Neutre"}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Info className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">Niveau de confiance: </span>
                <span
                  className={`ml-1 text-sm ${
                    prediction.confidence === "high"
                      ? "text-green-400"
                      : prediction.confidence === "medium"
                        ? "text-yellow-400"
                        : "text-gray-400"
                  }`}
                >
                  {prediction.confidence === "high" && "Élevé"}
                  {prediction.confidence === "medium" && "Moyen"}
                  {prediction.confidence === "low" && "Faible"}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Analyse IA:</h4>
                <ul className="space-y-1">
                  {prediction.reasoning.map((reason, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <Button onClick={handleComplete} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Check className="mr-2 h-4 w-4" />
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

