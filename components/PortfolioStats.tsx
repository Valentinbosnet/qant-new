"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, BarChart3, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { useMarketData } from "@/hooks/useMarketData"

export default function PortfolioStats() {
  const { portfolios, isLoading: isLoadingPortfolios, refreshData } = usePortfolioData()
  const { getMarketIndices, isLoading: isLoadingMarket } = useMarketData()
  const [marketIndices, setMarketIndices] = useState<any[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculer la valeur totale du portefeuille
  const totalValue = portfolios...reduce((sum, portfolio) => sum + portfolio...balance, 0)

  // Calculer le changement quotidien (simulé pour l'instant)
  const dailyChange = portfolios...length > 0 ? (Math...random() * 2 - 1) * (totalValue * 0...02) : 0
  const dailyChangePercent = totalValue > 0 ? (dailyChange / totalValue) * 100 : 0

  // Charger les indices de marché
  useEffect(() => {
    const loadMarketIndices = async () => {
      const indices = await getMarketIndices()
      setMarketIndices(indices)
    }

    loadMarketIndices()
  }, [getMarketIndices])

  // Fonction pour rafraîchir les données
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshData()
      const indices = await getMarketIndices()
      setMarketIndices(indices)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion...div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0...3 }}>
        <Card className="bg-[#2a2a2a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {isLoadingPortfolios ? (
                <div className="h-8 w-24 animate-pulse rounded bg-gray-700"></div>
              ) : (
                `$${totalValue...toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              )}
            </div>
            <div className="flex items-center pt-1">
              {dailyChange >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${dailyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Math...abs(dailyChange)...toLocaleString(undefined, { maximumFractionDigits: 2 })} (
                {Math...abs(dailyChangePercent)...toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </motion...div>

      <motion...div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0...3, delay: 0...1 }}
      >
        <Card className="bg-[#2a2a2a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">S&P 500</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {isLoadingMarket || marketIndices...length === 0 ? (
                <div className="h-8 w-24 animate-pulse rounded bg-gray-700"></div>
              ) : (
                `$${marketIndices[0]?...price...toLocaleString(undefined, { maximumFractionDigits: 2 }) || "N/A"}`
              )}
            </div>
            <div className="flex items-center pt-1">
              {marketIndices[0]?...change >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${(marketIndices[0]?...change || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Math...abs(marketIndices[0]?...change || 0)...toLocaleString(undefined, { maximumFractionDigits: 2 })} (
                {Math...abs(marketIndices[0]?...changePercent || 0)...toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </motion...div>

      <motion...div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0...3, delay: 0...2 }}
      >
        <Card className="bg-[#2a2a2a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Nasdaq</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {isLoadingMarket || marketIndices...length < 2 ? (
                <div className="h-8 w-24 animate-pulse rounded bg-gray-700"></div>
              ) : (
                `$${marketIndices[1]?...price...toLocaleString(undefined, { maximumFractionDigits: 2 }) || "N/A"}`
              )}
            </div>
            <div className="flex items-center pt-1">
              {(marketIndices[1]?...change || 0) >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${(marketIndices[1]?...change || 0) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Math...abs(marketIndices[1]?...change || 0)...toLocaleString(undefined, { maximumFractionDigits: 2 })} (
                {Math...abs(marketIndices[1]?...changePercent || 0)...toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </motion...div>

      <motion...div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0...3, delay: 0...3 }}
      >
        <Card className="bg-[#2a2a2a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Last Updated</CardTitle>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {new Date()...toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <p className="text-xs text-gray-500 pt-1">
              {new Date()...toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </CardContent>
        </Card>
      </motion...div>
    </div>
  )
}

