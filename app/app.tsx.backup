"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Dashboard from "@/components/Dashboard"
import PortfolioPage from "@/components/PortfolioPage"
import AIPredictionsPage from "@/components/AIPredictionsPage"
import RiskAnalysisPage from "@/components/RiskAnalysisPage"
import InvestmentReportPage from "@/components/InvestmentReportPage"
import SocialPage from "@/components/SocialPage"
import HelpSupportPage from "@/components/HelpSupportPage"
import AccountPage from "@/components/AccountPage"
import BillingPage from "@/components/BillingPage"
import SecurityPage from "@/components/SecurityPage"
import ReportsPage from "@/components/ReportsPage"
import Sidebar from "@/components/Sidebar"
import MobileNav from "@/components/MobileNav"

interface AppProps {
  initialTab?: string
}

export default function App({ initialTab = "dashboard" }: AppProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const pathname = usePathname()

  // Mettre à jour l'onglet actif en fonction du chemin
  useEffect(() => {
    if (pathname === "/dashboard") setActiveTab("dashboard")
    else if (pathname === "/portfolio") setActiveTab("portfolio")
    else if (pathname === "/ai-predictions") setActiveTab("aiPredictions")
    else if (pathname === "/risk-analysis") setActiveTab("riskAnalysis")
    else if (pathname === "/investment-report") setActiveTab("investmentReport")
    else if (pathname === "/social") setActiveTab("social")
    else if (pathname === "/help-support") setActiveTab("helpSupport")
    else if (pathname === "/account") setActiveTab("account")
    else if (pathname === "/billing") setActiveTab("billing")
    else if (pathname === "/security") setActiveTab("security")
    else if (pathname === "/reports") setActiveTab("reports")
  }, [pathname])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          {activeTab === "dashboard" && <Dashboard onTabChange={handleTabChange} />}
          {activeTab === "portfolio" && <PortfolioPage onTabChange={handleTabChange} />}
          {activeTab === "aiPredictions" && <AIPredictionsPage />}
          {activeTab === "riskAnalysis" && <RiskAnalysisPage onTabChange={handleTabChange} />}
          {activeTab === "investmentReport" && <InvestmentReportPage onTabChange={handleTabChange} />}
          {activeTab === "social" && <SocialPage onTabChange={handleTabChange} />}
          {activeTab === "helpSupport" && <HelpSupportPage onTabChange={handleTabChange} />}
          {activeTab === "account" && <AccountPage onTabChange={handleTabChange} />}
          {activeTab === "billing" && <BillingPage onTabChange={handleTabChange} />}
          {activeTab === "security" && <SecurityPage onTabChange={handleTabChange} />}
          {activeTab === "reports" && <ReportsPage onTabChange={handleTabChange} />}
        </div>
        <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  )
}

