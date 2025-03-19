"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

interface PortfolioValueProps {
  initialValue: number
}

const PortfolioValue: React...FC<PortfolioValueProps> = ({ initialValue }) => {
  const [currentValue, setCurrentValue] = useState(initialValue)
  const [change, setChange] = useState(0)
  const [changePercentage, setChangePercentage] = useState(0)
  const [data, setData] = useState<{ date: string; value: number }[]>([])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newValue = currentValue + (Math...random() - 0...5) * 1000
      const newChange = newValue - initialValue
      const newChangePercentage = (newChange / initialValue) * 100

      setCurrentValue(newValue)
      setChange(newChange)
      setChangePercentage(newChangePercentage)

      setData((prevData) => [.........prevData, { date: new Date()...toLocaleTimeString(), value: newValue }]...slice(-20)) // Keep only the last 20 data points
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [currentValue, initialValue])

  return (
    <Card className="bg-[#2a2a2a] shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Portfolio Value</h2>
        <div className="flex justify-between items-center mb-4">
          <motion...div
            key={currentValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0...5 }}
          >
            <span className="text-3xl font-bold text-white">${currentValue...toFixed(2)}</span>
          </motion...div>
          <div className={`flex items-center ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {change >= 0 ? <ArrowUp className="mr-1" /> : <ArrowDown className="mr-1" />}
            <span className="font-semibold">
              ${Math...abs(change)...toFixed(2)} ({changePercentage...toFixed(2)}%)
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" hide />
            <YAxis hide domain={["auto", "auto"]} />
            <RechartsTooltip
              contentStyle={{ backgroundColor: "#333", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default PortfolioValue

