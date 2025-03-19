"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, Moon, Sun, Bell, BellOff, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

interface SettingsPageProps {
  onTabChange: (tab: string) => void
  onSignOut: () => void
  user: {
    username: string
    email: string
  }
}

const SettingsPage: React...FC<SettingsPageProps> = ({ onTabChange, onSignOut, user }) => {
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [riskTolerance, setRiskTolerance] = useState("medium")

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage...getItem("userSettings")
    if (savedSettings) {
      const settings = JSON...parse(savedSettings)
      setDarkMode(settings...darkMode)
      setEmailNotifications(settings...emailNotifications)
      setPushNotifications(settings...pushNotifications)
      setRiskTolerance(settings...riskTolerance)
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = {
      darkMode,
      emailNotifications,
      pushNotifications,
      riskTolerance,
    }
    localStorage...setItem("userSettings", JSON...stringify(settings))
  }, [darkMode, emailNotifications, pushNotifications, riskTolerance])

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    // Apply dark mode to the document
    if (!darkMode) {
      document...documentElement...classList...add("dark")
    } else {
      document...documentElement...classList...remove("dark")
    }
  }

  const handleRiskToleranceChange = (e: React...ChangeEvent<HTMLSelectElement>) => {
    setRiskTolerance(e...target...value)
  }

  const handleSaveSettings = () => {
    // Save settings to localStorage
    const settings = {
      darkMode,
      emailNotifications,
      pushNotifications,
      riskTolerance,
    }
    localStorage...setItem("userSettings", JSON...stringify(settings))

    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully...",
      variant: "default",
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] pt-safe pb-[84px]">
      <header className="bg-[#2a2a2a] shadow-md p-4 mb-6 flex items-center">
        <Button variant="ghost" className="mr-2" onClick={() => onTabChange("dashboard")}>
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </header>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 pb-6">
          <Card className="bg-[#2a2a2a] shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-gray-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={user...username}
                    disabled
                    className="mt-1 bg-[#333333] border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user...email}
                    disabled
                    className="mt-1 bg-[#333333] border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">App Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {darkMode ? <Moon className="text-white" /> : <Sun className="text-white" />}
                    <Label htmlFor="dark-mode" className="text-gray-300">
                      Dark Mode
                    </Label>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                </div>
                <div>
                  <Label htmlFor="risk-tolerance" className="text-gray-300">
                    Risk Tolerance
                  </Label>
                  <select
                    id="risk-tolerance"
                    value={riskTolerance}
                    onChange={handleRiskToleranceChange}
                    className="mt-1 w-full bg-[#333333] border-gray-700 text-white rounded-md p-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <Button
                  onClick={handleSaveSettings}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {emailNotifications ? <Bell className="text-white" /> : <BellOff className="text-white" />}
                    <Label htmlFor="email-notifications" className="text-gray-300">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {pushNotifications ? <Bell className="text-white" /> : <BellOff className="text-white" />}
                    <Label htmlFor="push-notifications" className="text-gray-300">
                      Push Notifications
                    </Label>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center space-x-2"
            onClick={onSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}

export default SettingsPage

