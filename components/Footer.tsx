"use client"

import { Home, PieChart, TrendingUp, Settings } from "lucide-react"

interface FooterProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Footer = ({ activeTab, setActiveTab }: FooterProps) => {
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

  return <div className="hidden">{/* Ce composant est remplacé par MobileNav */}</div>
}

export default Footer

