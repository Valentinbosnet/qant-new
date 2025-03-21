"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface Asset {
  name: string
  value: number
}

interface PerformanceData {
  name: string
  return: number
}

const PortfolioAnalysis: React.FC = () => {
  const [assets] = useState<Asset[]>([
    { name: "Stocks", value: 45000 },
    { name: "Bonds", value: 25000 },
    { name: "Real Estate", value: 15000 },
    { name: "Crypto", value: 10000 },
    { name: "Cash", value: 5000 },
  ])

  const [performanceData] = useState<PerformanceData[]>([
    { name: "Jan", return: 5.2 },
    { name: "Feb", return: -2.1 },
    { name: "Mar", return: 3.5 },
    { name: "Apr", return: 1.8 },
    { name: "May", return: -0.7 },
    { name: "Jun", return: 4.2 },
  ])

  // Historical data for the line chart
  const historicalData = [
    { date: "Jan", value: 100000 },
    { date: "Feb", value: 98000 },
    { date: "Mar", value: 101500 },
    { date: "Apr", value: 103300 },
    { date: "May", value: 102600 },
    { date: "Jun", value: 107000 },
  ]

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Portfolio Analysis</h2>

      <Tabs defaultValue="allocation" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#333333]">
          <TabsTrigger value="allocation" className="data-[state=active]:bg-emerald-500">
            Asset Allocation
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-emerald-500">
            Performance
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-emerald-500">
            Historical
          </TabsTrigger>
        </TabsList>

        <TabsContent value="allocation">
          <Card className="bg-[#2a2a2a] shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RPieChart>
                      <Pie
                        data={assets}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {assets.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
                        contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
                      />
                    </RPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-3">
                  {assets.map((asset, index) => (
                    <div key={asset.name} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-white">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${asset.value.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">{((asset.value / totalValue) * 100).toFixed(2)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="bg-[#2a2a2a] shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Bar dataKey="return" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-[#2a2a2a] shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Value History</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PortfolioAnalysis

