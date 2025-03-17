"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { Menu, X } from "lucide-react"

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              TradeAssist
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm ${
                    isActive("/dashboard") ? "text-emerald-500" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/portfolio"
                  className={`text-sm ${
                    isActive("/portfolio") ? "text-emerald-500" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Portfolio
                </Link>
                <Link
                  href="/ai-predictions"
                  className={`text-sm ${
                    isActive("/ai-predictions") ? "text-emerald-500" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Prédictions IA
                </Link>
                <Link
                  href="/risk-analysis"
                  className={`text-sm ${
                    isActive("/risk-analysis") ? "text-emerald-500" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Analyse de risque
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-300 hover:text-white"
              >
                Déconnexion
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Inscription</Button>
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-3 py-2 rounded-md ${
                      isActive("/dashboard")
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/portfolio"
                    className={`px-3 py-2 rounded-md ${
                      isActive("/portfolio")
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/ai-predictions"
                    className={`px-3 py-2 rounded-md ${
                      isActive("/ai-predictions")
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Prédictions IA
                  </Link>
                  <Link
                    href="/risk-analysis"
                    className={`px-3 py-2 rounded-md ${
                      isActive("/risk-analysis")
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Analyse de risque
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                      setMobileMenuOpen(false)
                    }}
                    className="px-3 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

