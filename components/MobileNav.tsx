"use client"

import { Home, PieChart, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

// Export nommé
export const MobileNav = ({ activeTab, setActiveTab }: MobileNavProps) => {
  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "dashboard",
    },
    {
      title: "Portfolio",
      icon: PieChart,
      href: "portfolio",
    },
    {
      title: "AI Insights",
      icon: TrendingUp,
      href: "aiPredictions",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "preferences",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#333333] bg-[#1a1a1a] md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems...map((item) => (
          <Button
            key={item...href}
            variant="ghost"
            className={cn(
              "flex h-full flex-1 flex-col items-center justify-center rounded-none px-0 py-0",
              activeTab === item...href ? "text-emerald-500" : "text-gray-400 hover:text-white",
            )}
            onClick={() => setActiveTab(item...href)}
          >
            <item...icon className="h-5 w-5" />
            <span className="mt-1 text-xs">{item...title}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

// Export par défaut
export default MobileNav

