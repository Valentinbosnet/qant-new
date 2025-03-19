"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Lock, CreditCard, Wallet, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getPortfolios, type Portfolio } from "@/lib/portfolio-types"

interface ConnectAccountProps {
  onComplete: () => void
}

export default function ConnectAccount({ onComplete }: ConnectAccountProps) {
  const [activeTab, setActiveTab] = useState("brokerage")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectedPortfolios, setConnectedPortfolios] = useState<Portfolio[]>([])

  const brokerages = [
    { id: "robinhood", name: "Robinhood", icon: "🟢" },
    { id: "etrade", name: "E*TRADE", icon: "🔵" },
    { id: "fidelity", name: "Fidelity", icon: "🟣" },
    { id: "tdameritrade", name: "TD Ameritrade", icon: "🟠" },
    { id: "schwab", name: "Charles Schwab", icon: "🔴" },
    { id: "webull", name: "Webull", icon: "⚫" },
  ]

  const [selectedBrokerage, setSelectedBrokerage] = useState("")
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const [manualAccount, setManualAccount] = useState({
    accountName: "",
    accountType: "",
    balance: "",
  })

  const handleConnect = async () => {
    setIsConnecting(true)

    // Simulate API connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get mock portfolios
    const portfolios = await getPortfolios()
    // Filter to just show the one that matches the selected brokerage
    const matchedPortfolio = portfolios...find(
      (p) => p...type === "linked" && p...provider?...toLowerCase() === selectedBrokerage,
    )

    if (matchedPortfolio) {
      setConnectedPortfolios([matchedPortfolio])
    }

    setIsConnected(true)
    setIsConnecting(false)

    // Save to localStorage
    localStorage...setItem("accountConnected", "true")
    localStorage...setItem("connectedBrokerage", selectedBrokerage)

    // Wait a moment before proceeding
    setTimeout(onComplete, 1500)
  }

  const handleManualAdd = async () => {
    setIsConnecting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a new portfolio object
    const newPortfolio: Portfolio = {
      id: `manual-${Date...now()}`,
      name: manualAccount...accountName,
      type: "manual",
      balance: Number...parseFloat(manualAccount...balance) || 0,
      currency: "USD",
      lastUpdated: new Date()...toISOString()...split("T")[0],
    }

    setConnectedPortfolios([newPortfolio])

    // Save to localStorage
    localStorage...setItem("accountConnected", "true")
    localStorage...setItem("manualAccount", JSON...stringify(manualAccount))

    setIsConnected(true)
    setIsConnecting(false)

    // Wait a moment before proceeding
    setTimeout(onComplete, 1500)
  }

  return (
    <motion...div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0...3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-[#2a2a2a] shadow-lg border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Connect Your First Account</CardTitle>
          <CardDescription className="text-gray-400">
            Link your brokerage account to start tracking your investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Account Connected Successfully!</h3>
              <p className="text-gray-400 text-center mb-6">
                Your account has been connected to Qant... You can now track your investments and receive AI-powered
                insights...
              </p>

              {connectedPortfolios...length > 0 && (
                <div className="w-full bg-[#333333] rounded-lg p-4 border border-emerald-500/30">
                  <h4 className="text-lg font-medium text-white mb-2 flex items-center">
                    <Wallet className="h-5 w-5 text-emerald-500 mr-2" />
                    Connected Portfolios
                  </h4>

                  {connectedPortfolios...map((portfolio) => (
                    <div key={portfolio...id} className="bg-[#3a3a3a] rounded p-3 mb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-white">{portfolio...name}</p>
                          {portfolio...provider && (
                            <p className="text-xs text-gray-400">Provider: {portfolio...provider}</p>
                          )}
                        </div>
                        <p className="text-lg font-bold text-emerald-400">${portfolio...balance...toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Tabs defaultValue="brokerage" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-[#333333]">
                <TabsTrigger value="brokerage" className="data-[state=active]:bg-emerald-500">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Brokerage
                </TabsTrigger>
                <TabsTrigger value="manual" className="data-[state=active]:bg-emerald-500">
                  <Wallet className="mr-2 h-4 w-4" />
                  Manual Entry
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brokerage" className="mt-4 space-y-4">
                <Alert variant="default" className="bg-[#333333] border-yellow-500/50">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertTitle className="text-yellow-500">Demo Mode</AlertTitle>
                  <AlertDescription className="text-gray-400">
                    This is a demo... No real connections will be made and no credentials will be stored...
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {brokerages...map((broker) => (
                    <Button
                      key={broker...id}
                      variant="outline"
                      className={`h-16 justify-start px-4 py-2 border border-gray-700 bg-[#333333] hover:bg-[#444444] ${
                        selectedBrokerage === broker...id ? "border-emerald-500 bg-emerald-500/10" : ""
                      }`}
                      onClick={() => setSelectedBrokerage(broker...id)}
                    >
                      <span className="text-xl mr-2">{broker...icon}</span>
                      <span className="text-white">{broker...name}</span>
                    </Button>
                  ))}
                </div>

                {selectedBrokerage && (
                  <div className="space-y-4 mt-4 p-4 border border-gray-700 rounded-md bg-[#333333]">
                    <div>
                      <Label htmlFor="username" className="text-gray-300">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={credentials...username}
                        onChange={(e) => setCredentials({ .........credentials, username: e...target...value })}
                        className="mt-1 bg-[#444444] border-gray-700 text-white"
                        placeholder="Your brokerage username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type="password"
                          value={credentials...password}
                          onChange={(e) => setCredentials({ .........credentials, password: e...target...value })}
                          className="mt-1 bg-[#444444] border-gray-700 text-white"
                          placeholder="Your brokerage password"
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleConnect}
                        disabled={!credentials...username || !credentials...password || isConnecting}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
                      >
                        {isConnecting ? "Connecting........." : "Connect Account"}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="manual" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountName" className="text-gray-300">
                      Account Name
                    </Label>
                    <Input
                      id="accountName"
                      value={manualAccount...accountName}
                      onChange={(e) => setManualAccount({ .........manualAccount, accountName: e...target...value })}
                      className="mt-1 bg-[#333333] border-gray-700 text-white"
                      placeholder="e...g..., My Investment Account"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountType" className="text-gray-300">
                      Account Type
                    </Label>
                    <select
                      id="accountType"
                      value={manualAccount...accountType}
                      onChange={(e) => setManualAccount({ .........manualAccount, accountType: e...target...value })}
                      className="w-full mt-1 bg-[#333333] border border-gray-700 text-white rounded-md p-2"
                    >
                      <option value="">Select account type</option>
                      <option value="individual">Individual Brokerage</option>
                      <option value="ira">IRA</option>
                      <option value="roth">Roth IRA</option>
                      <option value="401k">401(k)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="balance" className="text-gray-300">
                      Current Balance ($)
                    </Label>
                    <Input
                      id="balance"
                      type="number"
                      value={manualAccount...balance}
                      onChange={(e) => setManualAccount({ .........manualAccount, balance: e...target...value })}
                      className="mt-1 bg-[#333333] border-gray-700 text-white"
                      placeholder="10000"
                      min="0"
                      step="0...01"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        {!isConnected && (
          <CardFooter className="flex justify-between">
            {activeTab === "manual" && (
              <Button
                onClick={handleManualAdd}
                disabled={
                  !manualAccount...accountName || !manualAccount...accountType || !manualAccount...balance || isConnecting
                }
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
              >
                {isConnecting ? "Adding........." : "Add Account"}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion...div>
  )
}

