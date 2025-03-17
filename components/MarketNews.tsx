"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Newspaper, ChevronRight } from "lucide-react"
import Link from "next/link"

// Données simulées
const newsItems = [
  {
    id: 1,
    title: "La Fed maintient les taux d'intérêt et signale des baisses potentielles",
    source: "Financial Times",
    time: "Il y a 2 heures",
    category: "Économie",
    url: "#",
  },
  {
    id: 2,
    title: "Apple dévoile de nouveaux produits lors de son événement annuel",
    source: "TechCrunch",
    time: "Il y a 5 heures",
    category: "Technologie",
    url: "#",
  },
  {
    id: 3,
    title: "Les marchés européens en hausse suite aux données économiques positives",
    source: "Bloomberg",
    time: "Il y a 8 heures",
    category: "Marchés",
    url: "#",
  },
]

export default function MarketNews() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-blue-500" />
          Actualités du marché
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium text-white hover:text-emerald-400 transition-colors">
                <Link href={item.url} className="flex items-start">
                  {item.title}
                </Link>
              </h3>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <span className="text-gray-400 text-xs">{item.source}</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-gray-400 text-xs">{item.time}</span>
                </div>
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                  {item.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-700 flex justify-between items-center bg-gray-800/50">
        <p className="text-xs text-gray-400">Actualités mises à jour en temps réel</p>
        <Link href="/market-news">
          <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/10">
            Plus d'actualités <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

