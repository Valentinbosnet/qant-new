"use client"

import type React from "react"
import { X, Bell, TrendingUp, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NotificationCenterProps {
  onClose: () => void
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Market Alert",
      message: "S&P 500 dropped by 2% today. Check your portfolio.",
      time: "10 minutes ago",
      icon: AlertTriangle,
      iconColor: "text-yellow-500",
      read: false,
    },
    {
      id: 2,
      type: "insight",
      title: "AI Insight",
      message: "New investment opportunities detected in tech sector.",
      time: "1 hour ago",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Portfolio Update",
      message: "Your portfolio has been updated with latest market data.",
      time: "3 hours ago",
      icon: Info,
      iconColor: "text-blue-500",
      read: true,
    },
  ]

  return (
    <div className="flex flex-col max-h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="font-medium text-white">Notifications</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 max-h-[400px]">
        <div className="p-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="mb-2">
              <div
                className={`flex p-3 rounded-lg ${
                  notification.read ? "bg-[#2a2a2a]" : "bg-[#333333]"
                } hover:bg-[#3a3a3a] transition-colors duration-200`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    notification.read ? "bg-[#333333]" : "bg-[#444444]"
                  } mr-3`}
                >
                  <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{notification.title}</p>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-3 border-t border-[#333333]">
        <Button variant="link" className="w-full text-emerald-500 hover:text-emerald-400">
          View all notifications
        </Button>
      </div>
    </div>
  )
}

export default NotificationCenter

