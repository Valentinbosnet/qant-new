"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface SettingsProps {
  user: {
    username: string
    email: string
  }
  onSignOut: () => void
}

const Settings: React.FC<SettingsProps> = ({ user, onSignOut }) => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [currency, setCurrency] = useState("USD")
  const [riskTolerance, setRiskTolerance] = useState("moderate")

  const handleSaveSettings = () => {
    // Here you would typically save these settings to your backend
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
      variant: "default",
    })
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Settings</h2>

      <Card className="bg-[#2a2a2a] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-gray-300">
              Username
            </Label>
            <Input id="username" value={user.username} disabled className="bg-[#333333] text-white" />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input id="email" value={user.email} disabled className="bg-[#333333] text-white" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2a2a2a] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-gray-300">
              Enable Notifications
            </Label>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="text-gray-300">
              Dark Mode
            </Label>
            <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div>
            <Label htmlFor="currency" className="text-gray-300">
              Preferred Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="bg-[#333333] text-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-[#333333] text-white">
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="riskTolerance" className="text-gray-300">
              Risk Tolerance
            </Label>
            <Select value={riskTolerance} onValueChange={setRiskTolerance}>
              <SelectTrigger id="riskTolerance" className="bg-[#333333] text-white">
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent className="bg-[#333333] text-white">
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={handleSaveSettings} className="bg-emerald-500 hover:bg-emerald-600">
          Save Settings
        </Button>
        <Button onClick={onSignOut} variant="destructive">
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Settings

