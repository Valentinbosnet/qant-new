"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Download, Plus, RefreshCw, Search } from "lucide-react"
import { getOrCreateDefaultPortfolio } from "@/lib/portfolio-service"
import { getHistoricalData } from "@/lib/market-service"

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
    quantity?: number
  }[]
}

interface HistoricalData {
  date: string
  value: number
}

export default function PortfolioPage() {
  const { data: session } = useSession()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<"1d" | "1w" | "1m" | "3m" | "1y" | "5y">("1m")

  useEffect(() => {
    const fetchData = async () => {
      if (session?...user?...id) {
        try {
          // Récupérer ou créer le portfolio par défaut
          const portfolioData = await getOrCreateDefaultPortfolio(session...user...id)
          setPortfolio(portfolioData)

          // Récupérer les données historiques
          const data = await getHistoricalData("AAPL", period)
          setHistoricalData(data)
        } catch (error) {
          console...error("Error fetching portfolio data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [session, period])

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
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400">Gérez et suivez vos investissements</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Actualiser
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Exporter
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" /> Ajouter un actif
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Valeur du portfolio */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Valeur totale</p>
                <h2 className="text-3xl font-bold text-white">${portfolio?...balance...toLocaleString()}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 bg-emerald-500/10 px-1...5 py-0...5 rounded text-xs font-medium">
                    +1...01%
                  </span>
                  <span className="text-gray-400 text-xs ml-2">aujourd'hui</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rendement */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Rendement annuel</p>
                <h2 className="text-3xl font-bold text-emerald-500">+8...5%</h2>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 bg-emerald-500/10 px-1...5 py-0...5 rounded text-xs font-medium">
                    +2...3%
                  </span>
                  <span className="text-gray-400 text-xs ml-2">vs marché</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diversification */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Score de diversification</p>
                <h2 className="text-3xl font-bold text-blue-500">Bon</h2>
                <div className="flex items-center mt-2">
                  <Link href="/risk-analysis" className="text-emerald-500 text-sm flex items-center">
                    Voir les détails <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Évolution du portfolio</CardTitle>
                <div className="flex space-x-1">
                  {["1d", "1w", "1m", "3m", "1y", "5y"]...map((p) => (
                    <Button
                      key={p}
                      variant={period === p ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${period === p ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                      onClick={() => setPeriod(p as any)}
                    >
                      {p...toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* Ici, vous pourriez intégrer un graphique avec une bibliothèque comme recharts */}
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-gray-400">Graphique d'évolution du portfolio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Répartition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-gray-300">Actions</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">60%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-300">Obligations</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">20%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-gray-300">Liquidités</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">12%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-300">Crypto</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">8%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Mes actifs</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Search className="h-4 w-4" /> Filtrer
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2" size="sm">
                <Plus className="h-4 w-4" /> Ajouter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="obligations">Obligations</TabsTrigger>
              <TabsTrigger value="liquidites">Liquidités</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Nom</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Symbole</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Quantité</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Valeur</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Allocation</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio?...assets...map((asset) => (
                      <tr key={asset...id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4 text-white">{asset...name}</td>
                        <td className="py-3 px-4 text-white">{asset...symbol}</td>
                        <td className="py-3 px-4 text-white text-right">{asset...quantity || "-"}</td>
                        <td className="py-3 px-4 text-white text-right">${asset...value...toLocaleString()}</td>
                        <td className="py-3 px-4 text-white text-right">{asset...allocation}%</td>
                        <td className="py-3 px-4 text-white text-right capitalize">{asset...assetType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Autres onglets similaires */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

