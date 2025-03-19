"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Download, RefreshCw } from "lucide-react"
import { getOrCreateDefaultPortfolio } from "@/lib/portfolio-service"

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

export default function RiskAnalysisPage() {
  const { data: session } = useSession()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (session?...user?...id) {
        try {
          // Récupérer ou créer le portfolio par défaut
          const portfolioData = await getOrCreateDefaultPortfolio(session...user...id)
          setPortfolio(portfolioData)
        } catch (error) {
          console...error("Error fetching portfolio data:", error)
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
          <h1 className="text-3xl font-bold text-white">Analyse de risque</h1>
          <p className="text-gray-400">Évaluez et optimisez le risque de votre portfolio</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Actualiser
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score de risque */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Niveau de risque</p>
                <h2 className="text-3xl font-bold text-yellow-500">Moderate</h2>
                <div className="flex items-center mt-2">
                  <span className="text-gray-400 text-sm">Score: 65/100</span>
                </div>
              </div>
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <AlertTriangle className="text-yellow-500 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volatilité */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1">Volatilité</p>
                <h2 className="text-3xl font-bold text-white">15...8%</h2>
                <div className="flex items-center mt-2">
                  <span className="text-emerald-500 bg-emerald-500/10 px-1...5 py-0...5 rounded text-xs font-medium">
                    -2...3%
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
                <p className="text-gray-400 mb-1">Diversification</p>
                <h2 className="text-3xl font-bold text-blue-500">Bon</h2>
                <div className="flex items-center mt-2">
                  <span className="text-gray-400 text-sm">4 classes d'actifs</span>
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
                <CardTitle className="text-white">Facteurs de risque</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Concentration sectorielle</span>
                    <span className="text-yellow-500">Modéré</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Exposition aux marchés émergents</span>
                    <span className="text-emerald-500">Faible</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Corrélation entre actifs</span>
                    <span className="text-yellow-500">Modéré</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Exposition aux devises</span>
                    <span className="text-emerald-500">Faible</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Liquidité</span>
                    <span className="text-emerald-500">Élevée</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
                  <h3 className="font-medium text-yellow-500 mb-1">Diversifiez davantage</h3>
                  <p className="text-sm text-gray-300">
                    Votre portfolio est concentré dans le secteur technologique... Envisagez d'ajouter des actifs d'autres
                    secteurs...
                  </p>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
                  <h3 className="font-medium text-emerald-500 mb-1">Bon équilibre d'actifs</h3>
                  <p className="text-sm text-gray-300">
                    Votre répartition entre actions, obligations et liquidités est bien équilibrée...
                  </p>
                </div>

                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-md">
                  <h3 className="font-medium text-blue-500 mb-1">Considérez des ETF</h3>
                  <p className="text-sm text-gray-300">
                    Les ETF pourraient vous aider à diversifier davantage votre portfolio à moindre coût...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Simulation de scénarios</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="market-crash">
            <TabsList className="mb-4">
              <TabsTrigger value="market-crash">Krach boursier</TabsTrigger>
              <TabsTrigger value="recession">Récession</TabsTrigger>
              <TabsTrigger value="inflation">Inflation élevée</TabsTrigger>
              <TabsTrigger value="interest-rates">Hausse des taux</TabsTrigger>
            </TabsList>

            <TabsContent value="market-crash">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-4">Impact sur votre portfolio</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Perte potentielle</span>
                        <span className="text-red-500">-28...5%</span>
                      </div>
                      <Progress value={28...5} className="h-2 bg-gray-700">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "28...5%" }}></div>
                      </Progress>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Temps de récupération estimé</span>
                        <span className="text-gray-300">18-24 mois</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-700 rounded-md">
                      <h4 className="font-medium text-white mb-2">Actifs les plus impactés</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Actions</span>
                          <span className="text-red-500">-42%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Crypto</span>
                          <span className="text-red-500">-65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Obligations</span>
                          <span className="text-red-500">-8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-white mb-4">Stratégies de protection</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-700 rounded-md">
                      <h4 className="font-medium text-white mb-1">Augmenter les liquidités</h4>
                      <p className="text-sm text-gray-300">
                        Maintenir 20-25% de votre portfolio en liquidités pour saisir les opportunités après une chute...
                      </p>
                    </div>

                    <div className="p-3 bg-gray-700 rounded-md">
                      <h4 className="font-medium text-white mb-1">Diversifier géographiquement</h4>
                      <p className="text-sm text-gray-300">
                        Répartir vos investissements sur différents marchés pour réduire l'impact d'un krach régional...
                      </p>
                    </div>

                    <div className="p-3 bg-gray-700 rounded-md">
                      <h4 className="font-medium text-white mb-1">Considérer des actifs refuge</h4>
                      <p className="text-sm text-gray-300">
                        L'or et certaines obligations d'État peuvent offrir une protection en période de turbulences...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Autres onglets similaires */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

