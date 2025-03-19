"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, RefreshCw } from "lucide-react"
import Link from "next/link"

// Données simulées
const mockInsights = [
  {
    id: 1,
    type: "buy",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.92,
    confidence: 87,
    reason: "Forte prévision de résultats et annonces de nouveaux produits attendues",
  },
  {
    id: 2,
    type: "sell",
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 610.34,
    confidence: 72,
    reason: "Concurrence croissante et ralentissement potentiel de la croissance des abonnés",
  },
  {
    id: 3,
    type: "watch",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 175.34,
    confidence: 65,
    reason: "Volatilité attendue en raison du prochain rapport sur les résultats",
  },
]

export default function AIInsights() {
  const [insights, setInsights] = useState(mockInsights)
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simuler une requête API
    setTimeout(() => {
      const refreshedInsights = [
        ...insights.slice(0, 1),
        {
          id: 4,
          type: "buy",
          symbol: "MSFT",
          name: "Microsoft Corp.",
          price: 415.22,
          confidence: 83,
          reason: "Croissance de l'activité cloud et intégration de l'IA stimulant les revenus",
        },
        ...insights.slice(2),
      ]
      setInsights(refreshedInsights)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
          Insights IA
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-700"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 text-gray-400 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <Badge
                    className={`
                      ${
                        insight.type === "buy"
                          ? "bg-emerald-500"
                          : insight.type === "sell"
                            ? "bg-red-500"
                            : "bg-blue-500"
                      } 
                      mr-2
                    `}
                  >
                    {insight.type === "buy" ? "ACHAT" : insight.type === "sell" ? "VENTE" : "SURVEILLER"}
                  </Badge>
                  <span className="text-white font-medium">
                    {insight.symbol} - {insight.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-white font-medium">${insight.price}</span>
                  {insight.type === "buy" ? (
                    <TrendingUp className="h-4 w-4 ml-1 text-emerald-500" />
                  ) : insight.type === "sell" ? (
                    <TrendingDown className="h-4 w-4 ml-1 text-red-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 ml-1 text-blue-500" />
                  )}
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-1">{insight.reason}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">
                  <span className="text-gray-400">Confiance: </span>
                  <span
                    className={`font-medium ${
                      insight.confidence > 80
                        ? "text-emerald-400"
                        : insight.confidence > 60
                          ? "text-amber-400"
                          : "text-red-400"
                    }`}
                  >
                    {insight.confidence}%
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-emerald-400 hover:bg-emerald-500/10 h-7 px-2">
                  Détails
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-700 flex justify-between items-center bg-gray-800/50">
        <p className="text-xs text-gray-400">Insights IA mis à jour toutes les 15 minutes</p>
        <Link href="/ai-predictions">
          <Button variant="ghost" size="sm" className="text-emerald-400 hover:bg-emerald-500/10">
            Voir tous les insights <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

