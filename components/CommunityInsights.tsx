"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, Star, ExternalLink, Eye } from "lucide-react"

interface TrendingAsset {
  symbol: string
  name: string
  change: number
  popularity: number
}

interface TopInvestor {
  id: string
  username: string
  avatar: string
  performance: number
  followers: number
}

const CommunityInsights = () => {
  const [activeTab, setActiveTab] = useState("trending")

  const [trendingAssets] = useState<TrendingAsset[]>([
    { symbol: "NVDA", name: "NVIDIA Corporation", change: 4.2, popularity: 92 },
    { symbol: "AAPL", name: "Apple Inc.", change: 1.8, popularity: 88 },
    { symbol: "TSLA", name: "Tesla, Inc.", change: -2.5, popularity: 85 },
    { symbol: "AMD", name: "Advanced Micro Devices", change: 3.1, popularity: 79 },
    { symbol: "MSFT", name: "Microsoft Corporation", change: 0.9, popularity: 76 },
  ])

  const [topInvestors] = useState<TopInvestor[]>([
    { id: "1", username: "investorpro", avatar: "", performance: 18.5, followers: 1243 },
    { id: "2", username: "stockguru", avatar: "", performance: 15.2, followers: 987 },
    { id: "3", username: "wealthbuilder", avatar: "", performance: 12.8, followers: 756 },
    { id: "4", username: "marketmaster", avatar: "", performance: 10.5, followers: 612 },
    { id: "5", username: "tradingexpert", avatar: "", performance: 9.7, followers: 543 },
  ])

  return (
    <Card className="bg-[#2a2a2a] shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg flex items-center">
          <Users className="h-5 w-5 mr-2 text-emerald-500" />
          Community Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-[#333333]">
            <TabsTrigger value="trending" className="data-[state=active]:bg-emerald-500">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending Assets
            </TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-emerald-500">
              <Star className="h-4 w-4 mr-2" />
              Top Investors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-4">
            <div className="space-y-3">
              {trendingAssets.map((asset) => (
                <div key={asset.symbol} className="p-3 bg-[#333333] rounded-lg hover:bg-[#3a3a3a] transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">{asset.symbol}</h3>
                      <p className="text-sm text-gray-400">{asset.name}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {asset.change >= 0 ? "+" : ""}
                        {asset.change}%
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Eye className="h-3 w-3 mr-1" />
                        {asset.popularity}% watching
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investors" className="mt-4">
            <div className="space-y-3">
              {topInvestors.map((investor) => (
                <div key={investor.id} className="p-3 bg-[#333333] rounded-lg hover:bg-[#3a3a3a] transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold mr-3">
                        {investor.username[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">@{investor.username}</h3>
                        <div className="flex items-center text-xs text-gray-400">
                          <Users className="h-3 w-3 mr-1" />
                          {investor.followers} followers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 font-bold">+{investor.performance}%</div>
                      <Button variant="ghost" size="sm" className="h-7 text-emerald-400">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CommunityInsights

