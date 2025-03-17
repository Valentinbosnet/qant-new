"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BarChart3, LineChart, PieChart, Plus, RefreshCw, Search, Zap } from "lucide-react"
import Link from "next/link"
import { getOrCreateDefaultPortfolio } from "@/lib/portfolio-service"
import { getMarketIndices } from "@/lib/market-service"

interface Portfolio {
  id: string
  name: string
  balance: number
  assets: {
    id: string
    symbol: string
    name: string
    value: number
    allocation: number
    assetType: string
  }[]
}

interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [marketIndex, setMarketIndex] = useState<MarketIndex | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          // Récupérer ou créer le portfolio par défaut
          const portfolioData = await getOrCreateDefaultPortfolio(session.user.id)
          setPortfolio(portfolioData)

          // Récupérer les indices de marché
          const indices = await getMarketIndices()
          if (indices.length > 0) {
            setMarketIndex(indices[0]) // S&P 500
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [session])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-gray-400">Bienvenue, {session?.user?.name || "Utilisateur"}</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Actualiser
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Voir le portfolio</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Valeur du portfolio */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Valeur du portfolio</p>
                <h2 className="text-3xl font-bold text-white">${portfolio?.balance.toLocaleString()}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs font-medium">
                    +1.01%
                  </span>
                  <span className="text-gray-400 text-xs ml-2">aujourd'hui</span>
                </div>
              </div>
              <div className="bg-emerald-500/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-500"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* S&P 500 */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">S&P 500</p>
                <h2 className="text-3xl font-bold text-white">${marketIndex?.value.toLocaleString()}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs font-medium">
                    +{marketIndex?.changePercent.toFixed(2)}%
                  </span>
                  <span className="text-gray-400 text-xs ml-2">aujourd'hui</span>
                </div>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-full">
                <LineChart className="text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Niveau de risque */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Niveau de risque</p>
                <h2 className="text-3xl font-bold text-yellow-500">Moderate</h2>
                <div className="flex items-center mt-2">
                  <Link href="/risk-analysis" className="text-emerald-500 text-sm flex items-center">
                    Voir l'analyse de risque <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-500"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Résumé du portfolio</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <PieChart className="h-3 w-3 mr-1" /> Allocation
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <BarChart3 className="h-3 w-3 mr-1" /> Performance
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="relative w-48 h-48 mb-6 md:mb-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-2xl font-bold text-white">${portfolio?.balance.toLocaleString()}</p>
                    </div>
                  </div>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="12" />
                    {/* Actions - 60% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="188.4"
                    />
                    {/* Obligations - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="62.8"
                      transform="rotate(90 50 50)"
                    />
                    {/* Liquidités - 12% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="12"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="37.68"
                      transform="rotate(162 50 50)"
                    />
                    {/* Crypto - 8% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="12"
                      strokeDasharray="251.2 251.2"
                      strokeDashoffset="25.12"
                      transform="rotate(205.2 50 50)"
                    />
                  </svg>
                </div>

                <div className="md:ml-12 space-y-4 w-full">
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                      <span className="text-gray-300">Actions</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">$75,000</p>
                      <p className="text-xs text-gray-400">60%</p>
                    </div>
                  </div>

                  {/* Obligations */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-gray-300">Obligations</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">$25,000</p>
                      <p className="text-xs text-gray-400">20%</p>
                    </div>
                  </div>

                  {/* Liquidités */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-gray-300">Liquidités</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">$15,000</p>
                      <p className="text-xs text-gray-400">12%</p>
                    </div>
                  </div>

                  {/* Crypto */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-gray-300">Crypto</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">$10,000</p>
                      <p className="text-xs text-gray-400">8%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link href="/portfolio" className="text-emerald-500 text-sm flex items-center justify-end">
                  Voir les détails <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-white mb-6">Actions rapides</h3>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left" size="lg">
                  <Plus className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Ajouter un actif</span>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left" size="lg">
                  <Search className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Rechercher un titre</span>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left" size="lg">
                  <BarChart3 className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Analyser mon risque</span>
                </Button>

                <Button variant="outline" className="w-full justify-start text-left" size="lg">
                  <Zap className="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Nouvelle prédiction IA</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

