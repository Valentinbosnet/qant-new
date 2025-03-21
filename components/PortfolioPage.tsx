"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  PieChart,
  Clock,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import type { Portfolio } from "@/lib/portfolio-types"

interface PortfolioPageProps {
  onTabChange: (tab: string) => void
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onTabChange }) => {
  const { portfolios, isLoading, refreshData, getPortfolioPerformance, lastUpdated } = usePortfolioData()

  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("")
  const [timeframe, setTimeframe] = useState<string>("1m")
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | undefined>(undefined)
  const [sectorAllocation, setSectorAllocation] = useState<any[]>([])
  const [geographicAllocation, setGeographicAllocation] = useState<any[]>([])
  const [transactionData, setTransactionData] = useState<any[]>([])
  const [riskMetrics, setRiskMetrics] = useState({
    volatility: 0,
    sharpeRatio: 0,
    beta: 0,
    alpha: 0,
    maxDrawdown: 0,
    riskLevel: "Low",
  })

  // Set the first portfolio as selected when data loads
  useEffect(() => {
    if (portfolios.length > 0 && !selectedPortfolio) {
      setSelectedPortfolio(portfolios[0].id)
    }
  }, [portfolios, selectedPortfolio])

  // Update current portfolio when selection changes
  useEffect(() => {
    if (selectedPortfolio) {
      const portfolio = portfolios.find((p) => p.id === selectedPortfolio)
      setCurrentPortfolio(portfolio)

      // Load performance data for the selected portfolio
      const loadPerformanceData = async () => {
        const data = await getPortfolioPerformance(selectedPortfolio)
        setPerformanceData(data)
        // Example of fetching other data based on selected portfolio
        // You'll need to implement these functions in your backend
        const sectorData = await getSectorAllocation(selectedPortfolio)
        setSectorAllocation(sectorData)
        const geoData = await getGeographicAllocation(selectedPortfolio)
        setGeographicAllocation(geoData)
        const transactionData = await getTransactionData(selectedPortfolio)
        setTransactionData(transactionData)
        const riskData = await getRiskMetrics(selectedPortfolio)
        setRiskMetrics(riskData)
      }

      loadPerformanceData()
    }
  }, [selectedPortfolio, portfolios, getPortfolioPerformance])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshData()

    // Also refresh performance data if a portfolio is selected
    if (selectedPortfolio) {
      const data = await getPortfolioPerformance(selectedPortfolio)
      setPerformanceData(data)
      // Refresh other data as well
      const sectorData = await getSectorAllocation(selectedPortfolio)
      setSectorAllocation(sectorData)
      const geoData = await getGeographicAllocation(selectedPortfolio)
      setGeographicAllocation(geoData)
      const transactionData = await getTransactionData(selectedPortfolio)
      setTransactionData(transactionData)
      const riskData = await getRiskMetrics(selectedPortfolio)
      setRiskMetrics(riskData)
    }

    setIsRefreshing(false)
  }

  const handleAddPortfolio = () => {
    // Navigate to the connect account page
    onTabChange("getStarted")
    // In a real app, you would set a specific step in the onboarding process
    localStorage.setItem("currentOnboardingStep", "account")
  }

  const totalValue = currentPortfolio?.balance || 0
  const dailyChange = currentPortfolio ? (Math.random() * 6 - 3).toFixed(2) : "0.00" // Mock daily change
  const monthlyReturn = currentPortfolio ? (Math.random() * 20 - 5).toFixed(2) : "0.00" // Mock monthly return

  // Format the last updated time
  const formatLastUpdated = () => {
    if (!currentPortfolio) return "N/A"

    const now = new Date()
    const lastUpdatedDate = new Date(currentPortfolio.lastUpdated)
    const diff = now.getTime() - lastUpdatedDate.getTime()

    // If less than a minute ago, show "Just now"
    if (diff < 60000) {
      return "Just now"
    }

    // If less than an hour ago, show minutes
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000)
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    }

    // Otherwise show the time
    return lastUpdatedDate.toLocaleTimeString()
  }

  // Placeholder functions - replace with your actual data fetching logic
  const getSectorAllocation = async (portfolioId: string) => {
    // Fetch sector allocation data from your backend
    // ... your code here ...
    return [
      { name: "Technology", value: 30 },
      { name: "Financials", value: 25 },
      { name: "Healthcare", value: 15 },
      { name: "Consumer Discretionary", value: 10 },
      { name: "Energy", value: 10 },
      { name: "Utilities", value: 10 },
    ]
  }

  const getGeographicAllocation = async (portfolioId: string) => {
    // Fetch geographic allocation data from your backend
    // ... your code here ...
    return [
      { name: "United States", value: 60 },
      { name: "China", value: 20 },
      { name: "Japan", value: 10 },
      { name: "Other", value: 10 },
    ]
  }

  const getTransactionData = async (portfolioId: string) => {
    // Fetch transaction data from your backend
    // ... your code here ...
    return [
      { id: 1, date: "2024-03-08", type: "buy", symbol: "AAPL", price: 170.34, quantity: 10, total: 1703.4 },
      { id: 2, date: "2024-03-07", type: "sell", symbol: "MSFT", price: 280.0, quantity: 5, total: 1400.0 },
      { id: 3, date: "2024-03-06", type: "buy", symbol: "GOOG", price: 100.5, quantity: 20, total: 2010.0 },
    ]
  }

  const getRiskMetrics = async (portfolioId: string) => {
    // Fetch risk metrics data from your backend
    // ... your code here ...
    return {
      volatility: 15,
      sharpeRatio: 1.2,
      beta: 1.1,
      alpha: 5,
      maxDrawdown: 10,
      riskLevel: "Medium",
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] pt-safe pb-[84px]">
      <header className="bg-[#2a2a2a] shadow-md p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2" onClick={() => onTabChange("dashboard")}>
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-5 w-5 text-white ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-5 w-5 text-white" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 pb-6">
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
            <Button onClick={handleAddPortfolio} className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="h-4 w-4 mr-1" /> Add Portfolio
            </Button>
          </div>

          {isLoading ? (
            // Loading skeleton
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-[#2a2a2a] text-white">
                    <CardContent className="p-4">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Portfolio Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#2a2a2a] text-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-gray-400 text-sm">Total Value</p>
                      <Wallet className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                    {currentPortfolio?.type === "linked" && (
                      <p className="text-xs text-gray-400 mt-1">
                        Via {currentPortfolio.provider} * Updated {formatLastUpdated()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-[#2a2a2a] text-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-gray-400 text-sm">Daily Change</p>
                      {Number.parseFloat(dailyChange) >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div
                      className={`text-2xl font-bold ${Number.parseFloat(dailyChange) >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {Number.parseFloat(dailyChange) >= 0 ? "+" : ""}
                      {dailyChange}%
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ${Math.abs((totalValue * Number.parseFloat(dailyChange)) / 100).toLocaleString()} today
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-[#2a2a2a] text-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-gray-400 text-sm">Monthly Return</p>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div
                      className={`text-2xl font-bold ${Number.parseFloat(monthlyReturn) >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {Number.parseFloat(monthlyReturn) >= 0 ? "+" : ""}
                      {monthlyReturn}%
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ${Math.abs((totalValue * Number.parseFloat(monthlyReturn)) / 100).toLocaleString()} this month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Time Period Selector */}
              <div className="flex justify-between items-center bg-[#2a2a2a] rounded-lg p-2">
                <div className="flex space-x-2">
                  {["1w", "1m", "3m", "6m", "1y", "All"].map((period) => (
                    <Button
                      key={period}
                      variant={timeframe === period ? "default" : "ghost"}
                      size="sm"
                      className={timeframe === period ? "bg-emerald-500" : "text-gray-400"}
                      onClick={() => setTimeframe(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Clock className="h-4 w-4 mr-1" /> Custom
                </Button>
              </div>

              {/* Main Content Tabs */}
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-[#2a2a2a]">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="holdings" className="data-[state=active]:bg-emerald-500">
                    Holdings
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="data-[state=active]:bg-emerald-500">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="data-[state=active]:bg-emerald-500">
                    Analysis
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-4 space-y-6">
                  {/* Performance Chart */}
                  <Card className="bg-[#2a2a2a] shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performanceData}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                              contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
                              labelStyle={{ color: "#fff" }}
                              formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
                            />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#10b981"
                              fillOpacity={1}
                              fill="url(#colorValue)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Asset Allocation */}
                  <Card className="bg-[#2a2a2a] shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={currentPortfolio?.assets || []}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="symbol"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {(currentPortfolio?.assets || []).map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
                                contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                          {(currentPortfolio?.assets || []).map((asset, index) => (
                            <div key={asset.symbol} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="text-white">
                                  {asset.symbol} - {asset.name}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-white font-medium">${asset.value.toLocaleString()}</div>
                                <div className="text-gray-400 text-xs">{asset.allocation}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sector & Geographic Allocation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-[#2a2a2a] shadow-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-lg">Sector Allocation</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectorAllocation} layout="vertical">
                              <XAxis type="number" stroke="#6b7280" />
                              <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                              <Tooltip
                                formatter={(value: any) => [`${value}%`, "Allocation"]}
                                contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
                              />
                              <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#2a2a2a] shadow-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-lg">Geographic Allocation</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={geographicAllocation}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {geographicAllocation.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value: any) => [`${value}%`, "Allocation"]}
                                contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Holdings Tab */}
                <TabsContent value="holdings" className="mt-4 space-y-6">
                  <Card className="bg-[#2a2a2a] shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Your Holdings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      {(currentPortfolio?.assets || []).length > 0 ? (
                        <div className="space-y-4">
                          {/* Table Header */}
                          <div className="grid grid-cols-5 text-sm text-gray-400 pb-2 border-b border-gray-700">
                            <div>Symbol</div>
                            <div>Name</div>
                            <div className="text-right">Quantity</div>
                            <div className="text-right">Value</div>
                            <div className="text-right">Allocation</div>
                          </div>

                          {/* Table Rows */}
                          {(currentPortfolio?.assets || []).map((asset) => (
                            <div
                              key={asset.symbol}
                              className="grid grid-cols-5 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors"
                            >
                              <div className="font-medium text-white">{asset.symbol}</div>
                              <div className="text-gray-300">{asset.name}</div>
                              <div className="text-right text-gray-300">{asset.quantity}</div>
                              <div className="text-right text-white">${asset.value.toLocaleString()}</div>
                              <div className="text-right text-emerald-400">{asset.allocation}%</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-yellow-500/70" />
                          <p>No holdings found for this portfolio.</p>
                          <Button
                            variant="outline"
                            className="mt-4 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                            onClick={handleAddPortfolio}
                          >
                            Add Assets
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Transactions Tab */}
                <TabsContent value="transactions" className="mt-4 space-y-6">
                  <Card className="bg-[#2a2a2a] shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Table Header */}
                        <div className="grid grid-cols-6 text-sm text-gray-400 pb-2 border-b border-gray-700">
                          <div>Date</div>
                          <div>Type</div>
                          <div>Symbol</div>
                          <div className="text-right">Price</div>
                          <div className="text-right">Quantity</div>
                          <div className="text-right">Total</div>
                        </div>

                        {/* Table Rows */}
                        {transactionData.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="grid grid-cols-6 py-3 border-b border-gray-700/50 hover:bg-[#333333] transition-colors"
                          >
                            <div className="text-gray-300">{transaction.date}</div>
                            <div>
                              <Badge
                                className={
                                  transaction.type === "buy"
                                    ? "bg-green-500"
                                    : transaction.type === "sell"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                }
                              >
                                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              </Badge>
                            </div>
                            <div className="font-medium text-white">{transaction.symbol}</div>
                            <div className="text-right text-gray-300">
                              $
                              {transaction.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div className="text-right text-gray-300">{transaction.quantity}</div>
                            <div className="text-right text-white">
                              $
                              {transaction.total.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Analysis Tab */}
                <TabsContent value="analysis" className="mt-4 space-y-6">
                  {/* Risk Metrics */}
                  <Card className="bg-[#2a2a2a] shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Risk Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#333333] p-4 rounded-lg">
                          <p className="text-gray-400 text-sm mb-1">Volatility (Annualized)</p>
                          <p className="text-xl font-bold text-white">{riskMetrics.volatility}%</p>
                        </div>
                        <div className="bg-[#333333] p-4 rounded-lg">
                          <p className="text-gray-400 text-sm mb-1">Sharpe Ratio</p>
                          <p className="text-xl font-bold text-white">{riskMetrics.sharpeRatio}</p>
                        </div>
                        <div className="bg-[#333333] p-4 rounded-lg">
                          <p className="text-gray-400 text-sm mb-1">Beta (vs S&P 500)</p>
                          <p className="text-xl font-bold text-white">{riskMetrics.beta}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#333333] p-4 rounded-lg">
                          <p className="text-gray-400 text-sm mb-1">Alpha (Annualized)</p>
                          <p className="text-xl font-bold text-emerald-400">+{riskMetrics.alpha}%</p>
                        </div>
                        <div className="bg-[#333333] p-4 rounded-lg">
                          <p className="text-gray-400 text-sm mb-1">Maximum Drawdown</p>
                          <p className="text-xl font-bold text-red-400">{riskMetrics.maxDrawdown}%</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-gray-400 text-sm mb-2">Risk Level</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={60} className="h-2" />
                          <span className="text-white font-medium">{riskMetrics.riskLevel}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Comparison */}
                  <Card className="bg-[#2a2a2a] shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Performance Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart>
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                              contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
                              labelStyle={{ color: "#fff" }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              data={performanceData}
                              dataKey="value"
                              name="Your Portfolio"
                              stroke="#10b981"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              data={performanceData.map((d) => ({ ...d, value: d.value * 0.9 }))}
                              dataKey="value"
                              name="S&P 500"
                              stroke="#3b82f6"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default PortfolioPage

