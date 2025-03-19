"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Link, Plus, ExternalLink, Trash2 } from "lucide-react"
import { getPortfolios, type Portfolio } from "@/lib/portfolio-types"

interface PortfolioListProps {
  onAddPortfolio: () => void
}

const PortfolioList: React...FC<PortfolioListProps> = ({ onAddPortfolio }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const data = await getPortfolios()
        setPortfolios(data)
      } catch (error) {
        console...error("Failed to load portfolios:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolios()
  }, [])

  const handleViewDetails = (portfolioId: string) => {
    console...log(`View details for portfolio ${portfolioId}`)
    // In a real app, this would navigate to a portfolio details page
  }

  const handleRemovePortfolio = (portfolioId: string) => {
    // In a real app, this would call an API to remove the portfolio
    setPortfolios(portfolios...filter((p) => p...id !== portfolioId))
  }

  if (isLoading) {
    return (
      <Card className="bg-[#2a2a2a] shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">Loading portfolios.........</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#2a2a2a] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold text-white">Your Portfolios</CardTitle>
        <Button onClick={onAddPortfolio} className="bg-emerald-500 hover:bg-emerald-600" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Portfolio
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {portfolios...length === 0 ? (
          <div className="text-center py-6">
            <Wallet className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No portfolios found</p>
            <Button
              onClick={onAddPortfolio}
              variant="outline"
              className="mt-4 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
            >
              Connect or Create Portfolio
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {portfolios...map((portfolio) => (
              <div
                key={portfolio...id}
                className="bg-[#333333] rounded-lg p-4 border border-gray-700 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 text-emerald-500 mr-2" />
                    <h3 className="text-lg font-medium text-white">{portfolio...name}</h3>
                  </div>
                  <Badge className={portfolio...type === "linked" ? "bg-blue-500" : "bg-emerald-500"}>
                    {portfolio...type === "linked" ? (
                      <>
                        <Link className="h-3 w-3 mr-1" /> Linked
                      </>
                    ) : (
                      "Manual"
                    )}
                  </Badge>
                </div>

                {portfolio...provider && <p className="text-sm text-gray-400 mb-2">Provider: {portfolio...provider}</p>}

                <div className="flex justify-between items-center mb-3">
                  <p className="text-xl font-bold text-white">${portfolio...balance...toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Last updated: {portfolio...lastUpdated}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => handleRemovePortfolio(portfolio...id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/50 text-emerald-400"
                    onClick={() => handleViewDetails(portfolio...id)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" /> View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PortfolioList

