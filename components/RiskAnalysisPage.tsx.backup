"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, AlertTriangle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPortfolios, type Portfolio } from "@/lib/portfolio-types"

interface RiskAnalysisPageProps {
  onTabChange: (tab: string) => void
}

const RiskAnalysisPage: React.FC<RiskAnalysisPageProps> = ({ onTabChange }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock risk metrics
  const riskMetrics = {
    volatility: 12.5,
    sharpeRatio: 1.8,
    beta: 0.92,
    alpha: 2.4,
    maxDrawdown: -15.3,
    riskLevel: "Moderate",
    varDaily: 2.1,
    varWeekly: 4.8,
    stressTestResults: -8.7,
  }

  // Mock stress test scenarios
  const stressTestScenarios = [
    { scenario: "Market Crash (-20%)", impact: -12.5 },
    { scenario: "Interest Rate Hike (+2%)", impact: -5.8 },
    { scenario: "Economic Recession", impact: -15.2 },
    { scenario: "Inflation Spike (+5%)", impact: -8.7 },
    { scenario: "Currency Crisis", impact: -7.3 },
  ]

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const data = await getPortfolios()
        setPortfolios(data)
        if (data.length > 0) {
          setSelectedPortfolio(data[0].id)
        }
      } catch (error) {
        console.error("Failed to load portfolios:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolios()
  }, [])

  const currentPortfolio = portfolios.find((p) => p.id === selectedPortfolio)

  const riskData = [
    { name: "AAPL", risk: 35 },
    { name: "MSFT", risk: 42 },
    { name: "GOOGL", risk: 58 },
    { name: "AMZN", risk: 65 },
    { name: "TSLA", risk: 85 },
  ]

  function RiskCard({ title, value, color }: { title: string; value: string; color: string }) {
    return (
      <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
        <h3 className="text-gray-400 font-medium mb-2">{title}</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </Card>
    )
  }

  function RiskFactor({ name, value, description }: { name: string; value: number; description: string }) {
    const getColor = (val: number) => {
      if (val < 40) return "bg-emerald-500"
      if (val < 70) return "bg-yellow-500"
      return "bg-red-500"
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm font-medium">{value}%</p>
        </div>
        <div className="w-full bg-[#333] h-2 rounded-full mb-2">
          <div className={`h-2 rounded-full ${getColor(value)}`} style={{ width: `${value}%` }}></div>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    )
  }

  function Recommendation({ title, description }: { title: string; description: string }) {
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
        <h3 className="font-medium text-emerald-500 mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] pt-safe pb-[84px]">
      <header className="bg-[#2a2a2a] shadow-md p-4 mb-6 flex items-center">
        <Button variant="ghost" className="mr-2" onClick={() => onTabChange("dashboard")}>
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Risk Analysis</h1>
      </header>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 pb-6">
          {/* Demo Alert */}
          <div className="bg-yellow-500/10 border border-yellow-500 rounded-md p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-500 font-semibold">Demo Version</p>
            </div>
            <p className="text-yellow-400 mt-2">
              This is a demo version with simulated risk analysis data. In a production environment, this would use real
              portfolio data and advanced risk models.
            </p>
          </div>

          {/* Portfolio Selector */}
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-2">
              <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
                <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-gray-700 text-white">
                  {portfolios.map((portfolio) => (
                    <SelectItem key={portfolio.id} value={portfolio.id}>
                      {portfolio.name} (${portfolio.balance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Risk Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RiskCard title="Risque global" value="Modéré" color="bg-yellow-500" />
            <RiskCard title="Volatilité" value="15.3%" color="bg-emerald-500" />
            <RiskCard title="Diversification" value="Bonne" color="bg-emerald-500" />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-[#2a2a2a]">
              <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500">
                Overview
              </TabsTrigger>
              <TabsTrigger value="comparison" className="data-[state=active]:bg-emerald-500">
                Comparison
              </TabsTrigger>
              <TabsTrigger value="stress" className="data-[state=active]:bg-emerald-500">
                Stress Tests
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-4 space-y-6">
              {/* Risk Metrics */}
              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Key Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Sharpe Ratio</p>
                      <p className="text-xl font-bold text-white">{riskMetrics.sharpeRatio}</p>
                      <p className="text-xs text-gray-400 mt-1">Return per unit of risk</p>
                    </div>
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Beta (vs S&P 500)</p>
                      <p className="text-xl font-bold text-white">{riskMetrics.beta}</p>
                      <p className="text-xs text-gray-400 mt-1">Market sensitivity</p>
                    </div>
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Alpha (Annualized)</p>
                      <p className="text-xl font-bold text-emerald-400">+{riskMetrics.alpha}%</p>
                      <p className="text-xs text-gray-400 mt-1">Excess return</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Value at Risk (Daily, 95%)</p>
                      <p className="text-xl font-bold text-red-400">-{riskMetrics.varDaily}%</p>
                      <p className="text-xs text-gray-400 mt-1">Potential daily loss</p>
                    </div>
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Value at Risk (Weekly, 95%)</p>
                      <p className="text-xl font-bold text-red-400">-{riskMetrics.varWeekly}%</p>
                      <p className="text-xs text-gray-400 mt-1">Potential weekly loss</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Radar */}
              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Risk Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">Risk radar chart (disabled for deployment)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Historical Volatility */}
              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Historical Volatility</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">Historical volatility chart (disabled for deployment)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="mt-4 space-y-6">
              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Risk-Return Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">Risk-return comparison chart (disabled for deployment)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Risk Metrics Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 text-sm text-gray-400 pb-2 border-b border-gray-700">
                      <div>Portfolio</div>
                      <div className="text-right">Volatility</div>
                      <div className="text-right">Return</div>
                      <div className="text-right">Sharpe Ratio</div>
                    </div>

                    {/* Table Rows */}
                    <div className="grid grid-cols-4 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors bg-emerald-500/10">
                      <div className="font-medium text-white">Your Portfolio</div>
                      <div className="text-right text-white">12.5%</div>
                      <div className="text-right text-emerald-400">15.2%</div>
                      <div className="text-right text-white">1.8</div>
                    </div>
                    <div className="grid grid-cols-4 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors">
                      <div className="font-medium text-white">S&P 500</div>
                      <div className="text-right text-white">14.2%</div>
                      <div className="text-right text-emerald-400">12.8%</div>
                      <div className="text-right text-white">1.2</div>
                    </div>
                    <div className="grid grid-cols-4 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors">
                      <div className="font-medium text-white">Bonds</div>
                      <div className="text-right text-white">5.3%</div>
                      <div className="text-right text-emerald-400">4.1%</div>
                      <div className="text-right text-white">0.9</div>
                    </div>
                    <div className="grid grid-cols-4 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors">
                      <div className="font-medium text-white">60/40 Portfolio</div>
                      <div className="text-right text-white">9.8%</div>
                      <div className="text-right text-emerald-400">9.5%</div>
                      <div className="text-right text-white">1.4</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stress Tests Tab */}
            <TabsContent value="stress" className="mt-4 space-y-6">
              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Stress Test Scenarios</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Table Header */}
                    <div className="grid grid-cols-2 text-sm text-gray-400 pb-2 border-b border-gray-700">
                      <div>Scenario</div>
                      <div className="text-right">Portfolio Impact</div>
                    </div>

                    {/* Table Rows */}
                    {stressTestScenarios.map((scenario) => (
                      <div
                        key={scenario.scenario}
                        className="grid grid-cols-2 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors"
                      >
                        <div className="font-medium text-white">{scenario.scenario}</div>
                        <div className="text-right text-red-400">{scenario.impact}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Stress Test Visualization</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">Stress test visualization (disabled for deployment)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Risk Mitigation Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <h3 className="text-white font-medium flex items-center">
                        <Shield className="h-4 w-4 text-emerald-500 mr-2" />
                        Diversification
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        Consider adding more non-correlated assets to reduce overall portfolio volatility.
                      </p>
                    </div>
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <h3 className="text-white font-medium flex items-center">
                        <Shield className="h-4 w-4 text-emerald-500 mr-2" />
                        Hedging Strategies
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        Implement strategic hedges to protect against market downturns and reduce maximum drawdown.
                      </p>
                    </div>
                    <div className="bg-[#333333] p-4 rounded-lg">
                      <h3 className="text-white font-medium flex items-center">
                        <Shield className="h-4 w-4 text-emerald-500 mr-2" />
                        Rebalancing
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        Regular portfolio rebalancing can help maintain your target risk level and potentially improve
                        returns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Risque par actif</h2>
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-400">Graphique de risque par actif (désactivé pour le déploiement)</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Facteurs de risque</h2>
              <div className="space-y-4">
                <RiskFactor
                  name="Concentration sectorielle"
                  value={65}
                  description="Votre portefeuille est fortement concentré dans le secteur technologique."
                />
                <RiskFactor
                  name="Volatilité du marché"
                  value={42}
                  description="La volatilité actuelle du marché est modérée."
                />
                <RiskFactor
                  name="Corrélation des actifs"
                  value={78}
                  description="Vos actifs sont fortement corrélés, ce qui augmente le risque global."
                />
              </div>
            </Card>

            <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recommandations</h2>
              <div className="space-y-4">
                <Recommendation
                  title="Diversifier les secteurs"
                  description="Envisagez d'ajouter des actifs dans d'autres secteurs que la technologie."
                />
                <Recommendation
                  title="Ajouter des actifs défensifs"
                  description="Ajoutez des actifs moins volatils pour réduire le risque global."
                />
                <Recommendation
                  title="Rééquilibrer le portefeuille"
                  description="Rééquilibrez votre portefeuille pour maintenir votre allocation cible."
                />
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default RiskAnalysisPage

