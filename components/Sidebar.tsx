"use client"

import {
  Home,
  PieChart,
  TrendingUp,
  Settings,
  LogOut,
  HelpCircle,
  User,
  Wallet,
  Shield,
  FileText,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobile?: boolean
  onClose?: () => void
}

const Sidebar = ({ activeTab, setActiveTab, isMobile = false, onClose }: SidebarProps) => {
  const handleNavigation = (href: string) => {
    setActiveTab(href)
    if (isMobile && onClose) {
      onClose()
    }
  }

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
      title: "Social",
      icon: Users,
      href: "social",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "preferences",
    },
  ]

  const secondaryNavItems = [
    {
      title: "Help & Support",
      icon: HelpCircle,
      href: "help",
    },
    {
      title: "Account",
      icon: User,
      href: "account",
    },
    {
      title: "Billing",
      icon: Wallet,
      href: "billing",
    },
    {
      title: "Security",
      icon: Shield,
      href: "security",
    },
    {
      title: "Reports",
      icon: FileText,
      href: "reports",
    },
  ]

  return (
    <div className="flex h-full flex-col border-r border-[#333333] bg-[#1a1a1a] p-4">
      <div className="mb-8 px-4 pt-4">
        <h2 className="text-2xl font-bold text-white">Qant</h2>
        <p className="text-sm text-gray-400">Investment AI</p>
      </div>

      <nav className="flex-1 space-y-1">
        <div className="px-3 py-2">
          <h3 className="mb-2 text-xs font-semibold uppercase text-gray-400">Main</h3>
          <ul className="space-y-1">
            {navItems...map((item) => (
              <li key={item...href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex w-full items-center justify-start gap-3 px-3 py-2",
                    activeTab === item...href
                      ? "bg-[#2a2a2a] text-emerald-500"
                      : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white",
                  )}
                  onClick={() => handleNavigation(item...href)}
                >
                  <item...icon className="h-5 w-5" />
                  <span>{item...title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 py-2">
          <h3 className="mb-2 text-xs font-semibold uppercase text-gray-400">Other</h3>
          <ul className="space-y-1">
            {secondaryNavItems...map((item) => (
              <li key={item...href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex w-full items-center justify-start gap-3 px-3 py-2",
                    activeTab === item...href
                      ? "bg-[#2a2a2a] text-emerald-500"
                      : "text-gray-300 hover:bg-[#2a2a2a] hover:text-white",
                  )}
                  onClick={() => handleNavigation(item...href)}
                >
                  <item...icon className="h-5 w-5" />
                  <span>{item...title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto border-t border-[#333333] pt-4">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-3 px-3 py-2 text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
          onClick={() => handleNavigation("logout")}
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

