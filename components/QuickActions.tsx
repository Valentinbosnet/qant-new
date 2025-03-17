"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, BarChart4, Zap } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white">Actions rapides</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-3">
          <Link href="/portfolio/add">
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:border-emerald-500 hover:bg-gray-700 text-white"
            >
              <PlusCircle className="h-5 w-5 mr-3 text-emerald-500" />
              Ajouter un actif
            </Button>
          </Link>

          <Link href="/market/search">
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:border-blue-500 hover:bg-gray-700 text-white"
            >
              <Search className="h-5 w-5 mr-3 text-blue-500" />
              Rechercher un titre
            </Button>
          </Link>

          <Link href="/risk-analysis">
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:border-yellow-500 hover:bg-gray-700 text-white"
            >
              <BarChart4 className="h-5 w-5 mr-3 text-yellow-500" />
              Analyser mon risque
            </Button>
          </Link>

          <Link href="/ai-predictions/new">
            <Button
              variant="outline"
              className="w-full justify-start border-gray-700 hover:border-purple-500 hover:bg-gray-700 text-white"
            >
              <Zap className="h-5 w-5 mr-3 text-purple-500" />
              Nouvelle prédiction IA
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

