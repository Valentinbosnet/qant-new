"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, AlertTriangle, DollarSign, RefreshCw } from "lucide-react"
import Link from "next/link"
import PortfolioSummary from "@/components/PortfolioSummary"
import AIInsights from "@/components/AIInsights"
import MarketNews from "@/components/MarketNews"
import QuickActions from "@/components/QuickActions"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
    riskLevel: "Moderate",
  })
  const [marketIndices, setMarketIndices] = useState([
    { name: "S&P 500", value: 0, change: 0 },
    { name: "NASDAQ", value: 0, change: 0 },
    { name: "Dow Jones", value: 0, change: 0 },
  ])

  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      try {
        // Dans une application réelle, ces données viendraient d'une API
        setTimeout(() => {
          setPortfolioData({
            totalValue: 125000,
            dailyChange: 1250,
            dailyChangePercent: 1.01,
            riskLevel: "Moderate",
          })

          setMarketIndices([
            { name: "S&P 500", value: 4892.37, change: 0.87 },
            { name: "NASDAQ", value: 15628.95, change: 1.24 },
            { name: "Dow Jones", value: 38654.42, change: 0.35 },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (status === "loading" || isLoading) {
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
          <p className="text-emerald-500">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-4">Accès non autorisé</h1>
          <p className="text-gray-300 mb-6">Vous devez être connecté pour accéder à cette page.</p>
          <div className="flex space-x-4 justify-center">
            <Link href="/login">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Se connecter</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-emerald-600 text-emerald-500 hover:bg-emerald-900/20">
                S'inscrire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
            <p className="text-gray-400">Bienvenue, {session?.user?.name || "Utilisateur"}</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Link href="/portfolio">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Voir le portfolio</Button>
            </Link>
          </div>
        </div>

        {/* Résumé du portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Valeur du portfolio</p>
                  <p className="text-2xl font-bold text-white mt-1">${portfolioData.totalValue.toLocaleString()}</p>
                </div>
                <div className="bg-emerald-500/20 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div
                  className={`px-2 py-1 rounded text-xs ${portfolioData.dailyChange >= 0 ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}
                >
                  {portfolioData.dailyChange >= 0 ? "+" : ""}
                  {portfolioData.dailyChangePercent.toFixed(2)}%
                </div>
                <span className="text-gray-400 text-xs ml-2">aujourd'hui</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">S&P 500</p>
                  <p className="text-2xl font-bold text-white mt-1">${marketIndices[0].value.toLocaleString()}</p>
                </div>
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div
                  className={`px-2 py-1 rounded text-xs ${marketIndices[0].change >= 0 ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}
                >
                  {marketIndices[0].change >= 0 ? "+" : ""}
                  {marketIndices[0].change.toFixed(2)}%
                </div>
                <span className="text-gray-400 text-xs ml-2">aujourd'hui</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Niveau de risque</p>
                  <p className="text-2xl font-bold text-yellow-500 mt-1">{portfolioData.riskLevel}</p>
                </div>
                <div className="bg-yellow-500/20 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/risk-analysis"
                  className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center"
                >
                  Voir l'analyse de risque <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Résumé du portfolio */}
          <div className="lg:col-span-2">
            <PortfolioSummary />
          </div>

          {/* Actions rapides */}
          <div>
            <QuickActions />
          </div>

          {/* Insights IA */}
          <div className="lg:col-span-2">
            <AIInsights />
          </div>

          {/* Actualités du marché */}
          <div>
            <MarketNews />
          </div>
        </div>
      </div>
    </main>
  )
}

