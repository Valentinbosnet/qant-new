"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, PieChart, BarChart3 } from "lucide-react"
import Link from "next/link"

// Données simulées pour le graphique
const portfolioData = [
  { asset: "Actions", value: 75000, allocation: 60, color: "bg-emerald-500" },
  { asset: "Obligations", value: 25000, allocation: 20, color: "bg-blue-500" },
  { asset: "Liquidités", value: 15000, allocation: 12, color: "bg-yellow-500" },
  { asset: "Crypto", value: 10000, allocation: 8, color: "bg-purple-500" },
]

export default function PortfolioSummary() {
  const [view, setView] = useState<"allocation" | "performance">("allocation")

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-white">Résumé du portfolio</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant={view === "allocation" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("allocation")}
            className={view === "allocation" ? "bg-emerald-600 hover:bg-emerald-700" : "border-gray-700 text-gray-300"}
          >
            <PieChart className="h-4 w-4 mr-2" />
            Allocation
          </Button>
          <Button
            variant={view === "performance" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("performance")}
            className={view === "performance" ? "bg-emerald-600 hover:bg-emerald-700" : "border-gray-700 text-gray-300"}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {view === "allocation" ? (
          <div>
            <div className="flex justify-between mb-6">
              <div className="w-1/2">
                {/* Graphique simplifié (à remplacer par un vrai graphique) */}
                <div className="relative h-48 w-48 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-xl font-bold text-white">$125,000</p>
                    </div>
                  </div>
                  <div className="h-full w-full rounded-full bg-gray-700 flex items-center justify-center">
                    <div className="h-3/4 w-3/4 rounded-full bg-gray-800 flex items-center justify-center">
                      <div className="h-1/2 w-1/2 rounded-full bg-gray-900"></div>
                    </div>
                  </div>
                  {/* Ici, nous simulons un graphique circulaire avec des couleurs */}
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-emerald-500"></div>
                  <div className="absolute top-12 right-0 h-6 w-6 rounded-full bg-blue-500"></div>
                  <div className="absolute bottom-12 right-0 h-6 w-6 rounded-full bg-yellow-500"></div>
                  <div className="absolute bottom-0 right-12 h-6 w-6 rounded-full bg-purple-500"></div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="space-y-4">
                  {portfolioData.map((item) => (
                    <div key={item.asset} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${item.color} mr-2`}></div>
                        <span className="text-gray-300">{item.asset}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${item.value.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">{item.allocation}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/portfolio">
                <Button variant="link" className="text-emerald-500 hover:text-emerald-400 p-0">
                  Voir les détails <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Performance sur 6 mois</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-emerald-500">+12.4%</span>
                  <span className="text-gray-400 ml-2">($13,750)</span>
                </div>
                <p className="text-gray-500 mt-4">Graphique de performance à implémenter</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/investment-report">
                <Button variant="link" className="text-emerald-500 hover:text-emerald-400 p-0">
                  Voir le rapport complet <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

