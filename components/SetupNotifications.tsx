"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, BellOff, Clock, Smartphone, Mail, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SetupNotificationsProps {
  onComplete: () => void
}

export default function SetupNotifications({ onComplete }: SetupNotificationsProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    pushEnabled: true,
    emailEnabled: true,
    frequency: "daily",
    priceAlerts: true,
    priceChangeThreshold: 5,
    newsAlerts: true,
    predictionAlerts: true,
    marketSummary: true,
    doNotDisturb: {
      enabled: false,
      startTime: "22:00",
      endTime: "08:00",
    },
  })

  const handleToggle = (field: string) => {
    setNotificationSettings((prev) => ({
      .........prev,
      [field]: !prev[field],
    }))
  }

  const handleDoNotDisturbToggle = () => {
    setNotificationSettings((prev) => ({
      .........prev,
      doNotDisturb: {
        .........prev...doNotDisturb,
        enabled: !prev...doNotDisturb...enabled,
      },
    }))
  }

  const handleTimeChange = (field: string, value: string) => {
    setNotificationSettings((prev) => ({
      .........prev,
      doNotDisturb: {
        .........prev...doNotDisturb,
        [field]: value,
      },
    }))
  }

  const handleFrequencyChange = (value: string) => {
    setNotificationSettings((prev) => ({
      .........prev,
      frequency: value,
    }))
  }

  const handleThresholdChange = (value: number[]) => {
    setNotificationSettings((prev) => ({
      .........prev,
      priceChangeThreshold: value[0],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save to localStorage
    localStorage...setItem("notificationsSetup", "true")
    localStorage...setItem("notificationSettings", JSON...stringify(notificationSettings))

    setIsSaving(false)
    onComplete()
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
          <CardTitle className="text-2xl font-bold text-white">Set Up Notifications</CardTitle>
          <CardDescription className="text-gray-400">
            Customize how and when you receive alerts about your investments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {notificationSettings...enabled ? (
                <Bell className="text-emerald-500" />
              ) : (
                <BellOff className="text-gray-500" />
              )}
              <Label htmlFor="notifications-enabled" className="text-white font-medium">
                Enable All Notifications
              </Label>
            </div>
            <Switch
              id="notifications-enabled"
              checked={notificationSettings...enabled}
              onCheckedChange={() => handleToggle("enabled")}
            />
          </div>

          {notificationSettings...enabled && (
            <>
              <Tabs defaultValue="channels" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#333333]">
                  <TabsTrigger value="channels" className="data-[state=active]:bg-emerald-500">
                    Channels
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="data-[state=active]:bg-emerald-500">
                    Alert Types
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="channels" className="mt-4 space-y-4">
                  <Card className="bg-[#333333] border-gray-700">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="push-notifications" className="text-white">
                            Push Notifications
                          </Label>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notificationSettings...pushEnabled}
                          onCheckedChange={() => handleToggle("pushEnabled")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <Label htmlFor="email-notifications" className="text-white">
                            Email Notifications
                          </Label>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notificationSettings...emailEnabled}
                          onCheckedChange={() => handleToggle("emailEnabled")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="frequency-select" className="text-gray-300 mb-2 block">
                          Summary Frequency
                        </Label>
                        <Select value={notificationSettings...frequency} onValueChange={handleFrequencyChange}>
                          <SelectTrigger id="frequency-select" className="bg-[#444444] border-gray-700 text-white">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#333333] border-gray-700 text-white">
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <Label htmlFor="do-not-disturb" className="text-white">
                              Do Not Disturb
                            </Label>
                          </div>
                          <Switch
                            id="do-not-disturb"
                            checked={notificationSettings...doNotDisturb...enabled}
                            onCheckedChange={handleDoNotDisturbToggle}
                          />
                        </div>

                        {notificationSettings...doNotDisturb...enabled && (
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <Label htmlFor="start-time" className="text-gray-300 text-sm">
                                Start Time
                              </Label>
                              <input
                                id="start-time"
                                type="time"
                                value={notificationSettings...doNotDisturb...startTime}
                                onChange={(e) => handleTimeChange("startTime", e...target...value)}
                                className="w-full mt-1 bg-[#444444] border border-gray-700 text-white rounded-md p-2"
                              />
                            </div>
                            <div>
                              <Label htmlFor="end-time" className="text-gray-300 text-sm">
                                End Time
                              </Label>
                              <input
                                id="end-time"
                                type="time"
                                value={notificationSettings...doNotDisturb...endTime}
                                onChange={(e) => handleTimeChange("endTime", e...target...value)}
                                className="w-full mt-1 bg-[#444444] border border-gray-700 text-white rounded-md p-2"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="alerts" className="mt-4 space-y-4">
                  <Card className="bg-[#333333] border-gray-700">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="price-alerts" className="text-white">
                          Price Alerts
                        </Label>
                        <Switch
                          id="price-alerts"
                          checked={notificationSettings...priceAlerts}
                          onCheckedChange={() => handleToggle("priceAlerts")}
                        />
                      </div>

                      {notificationSettings...priceAlerts && (
                        <div className="pl-2 border-l-2 border-emerald-500 ml-2">
                          <Label className="text-gray-300 text-sm mb-4 block">
                            Price Change Threshold: {notificationSettings...priceChangeThreshold}%
                          </Label>
                          <Slider
                            defaultValue={[notificationSettings...priceChangeThreshold]}
                            max={20}
                            min={1}
                            step={1}
                            onValueChange={handleThresholdChange}
                            className="w-full"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Label htmlFor="news-alerts" className="text-white">
                          News Alerts
                        </Label>
                        <Switch
                          id="news-alerts"
                          checked={notificationSettings...newsAlerts}
                          onCheckedChange={() => handleToggle("newsAlerts")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="prediction-alerts" className="text-white">
                          AI Prediction Alerts
                        </Label>
                        <Switch
                          id="prediction-alerts"
                          checked={notificationSettings...predictionAlerts}
                          onCheckedChange={() => handleToggle("predictionAlerts")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="market-summary" className="text-white">
                          Market Summary
                        </Label>
                        <Switch
                          id="market-summary"
                          checked={notificationSettings...marketSummary}
                          onCheckedChange={() => handleToggle("marketSummary")}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-md p-3">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0...5" />
                  <div>
                    <p className="text-yellow-500 font-medium">Demo Mode</p>
                    <p className="text-yellow-400/80 text-sm">
                      In this demo, notifications will not be sent... In the full version, you'll receive real-time alerts
                      based on your settings...
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
          >
            {isSaving ? (
              "Saving........."
            ) : (
              <>
                Save Settings <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion...div>
  )
}

