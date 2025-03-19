"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, RefreshCw, Zap } from "lucide-react"
import { generatePrediction, getUserPredictions } from "@/lib/ai-service"
import { searchStocks } from "@/lib/market-service"

interface Prediction {
  id: string
  stock: string
  prediction: "bullish" | "bearish" | "neutral"
  confidence: "low" | "medium" | "high"
  timeframe: "short" | "medium" | "long"
  date: Date
  investmentAmount?: number
  portfolioId?: string
  confirmed: boolean
  userId: string
}

interface SearchResult {
  symbol: string
  name: string
  type: string
  exchange: string
}

export default function AIPredictionsPage() {
  const { data: session } = useSession()
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedStock, setSelectedStock] = useState<SearchResult | null>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [generatingPrediction, setGeneratingPrediction] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (session?...user?...id) {
        try {
          const userPredictions = await getUserPredictions(session...user...id)
          setPredictions(userPredictions)
        } catch (error) {
          console...error("Error fetching predictions:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [session])

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery...length >= 2) {
        try {
          const results = await searchStocks(searchQuery)
          setSearchResults(results)
          setShowSearchResults(true)
        } catch (error) {
          console...error("Error searching stocks:", error)
        }
      } else {
        setSearchResults([])
        setShowSearchResults(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const handleGeneratePrediction = async () => {
    if (!session?...user?...id || !selectedStock) return

    setGeneratingPrediction(true)

    try {
      const newPrediction = await generatePrediction(session...user...id, selectedStock...symbol)
      setPredictions([newPrediction, .........predictions])
      setSelectedStock(null)
      setSearchQuery("")
    } catch (error) {
      console...error("Error generating prediction:", error)
    } finally {
      setGeneratingPrediction(false)
    }
  }

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "bullish":
        return "text-emerald-500"
      case "bearish":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "text-emerald-500"
      case "medium":
        return "text-yellow-500"
      default:
        return "text-gray-400"
    }
  }

  const getTimeframeText = (timeframe: string) => {
    switch (timeframe) {
      case "short":
        return "Court terme (1-3 mois)"
      case "medium":
        return "Moyen terme (3-6 mois)"
      default:
        return "Long terme (6-12 mois)"
    }
  }

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
          <h1 className="text-3xl font-bold text-white">Prédictions IA</h1>
          <p className="text-gray-400">Obtenez des prédictions basées sur l'intelligence artificielle</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Actualiser
          </Button>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Nouvelle prédiction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stock-search">Rechercher un titre</Label>
                  <div className="relative">
                    <Input
                      id="stock-search"
                      placeholder="Ex: AAPL, MSFT, GOOGL........."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e...target...value)}
                      onFocus={() => setShowSearchResults(true)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    {showSearchResults && searchResults...length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                        {searchResults...map((result) => (
                          <div
                            key={result...symbol}
                            className="p-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setSelectedStock(result)
                              setSearchQuery(`${result...symbol} - ${result...name}`)
                              setShowSearchResults(false)
                            }}
                          >
                            <div className="font-medium text-white">{result...symbol}</div>
                            <div className="text-sm text-gray-400">{result...name}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    onClick={handleGeneratePrediction}
                    disabled={!selectedStock || generatingPrediction}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {generatingPrediction ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Génération en cours.........
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" /> Générer une prédiction
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-md">
              <h3 className="font-medium text-white mb-2">Comment ça marche ?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Notre IA analyse des milliers de données financières pour générer des prédictions sur l'évolution
                probable des titres... Ces prédictions sont basées sur des modèles d'apprentissage automatique avancés...
              </p>
              <p className="text-xs text-gray-400">
                Note: Ces prédictions sont fournies à titre informatif uniquement et ne constituent pas des conseils
                d'investissement...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Mes prédictions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="bullish">Haussières</TabsTrigger>
              <TabsTrigger value="bearish">Baissières</TabsTrigger>
              <TabsTrigger value="neutral">Neutres</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {predictions...length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Vous n'avez pas encore de prédictions</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Zap className="mr-2 h-4 w-4" /> Générer votre première prédiction
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {predictions...map((prediction) => (
                    <Card key={prediction...id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="font-bold text-white text-lg">{prediction...stock}</h3>
                            <p className="text-gray-400 text-sm">{new Date(prediction...date)...toLocaleDateString()}</p>
                          </div>

                          <div className="flex items-center mt-2 md:mt-0">
                            <div className="mr-4">
                              <p className="text-sm text-gray-400">Prédiction</p>
                              <p className={`font-medium ${getPredictionColor(prediction...prediction)} capitalize`}>
                                {prediction...prediction}
                              </p>
                            </div>

                            <div className="mr-4">
                              <p className="text-sm text-gray-400">Confiance</p>
                              <p className={`font-medium ${getConfidenceColor(prediction...confidence)} capitalize`}>
                                {prediction...confidence}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400">Horizon</p>
                              <p className="font-medium text-white">{getTimeframeText(prediction...timeframe)}</p>
                            </div>
                          </div>

                          <div className="mt-4 md:mt-0">
                            {prediction...confirmed ? (
                              <div className="flex items-center text-emerald-500">
                                <Check className="h-4 w-4 mr-1" /> Confirmée
                              </div>
                            ) : (
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                Confirmer
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Autres onglets similaires */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

