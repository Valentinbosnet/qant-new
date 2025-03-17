"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Investissez plus intelligemment avec <span className="text-emerald-500">TradeAssist</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Analysez vos investissements, obtenez des prédictions basées sur l'IA et optimisez votre portfolio en
              toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-white border-gray-600 hover:bg-gray-800 px-8">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="bg-emerald-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-500"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Suivi de portfolio</h3>
                <p className="text-gray-300">
                  Suivez tous vos investissements en un seul endroit avec des mises à jour en temps réel et des analyses
                  détaillées.
                </p>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="bg-emerald-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-500"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Prédictions IA</h3>
                <p className="text-gray-300">
                  Obtenez des prédictions basées sur l'intelligence artificielle pour vous aider à prendre de meilleures
                  décisions d'investissement.
                </p>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="bg-emerald-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-500"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Analyse de risque</h3>
                <p className="text-gray-300">
                  Évaluez et optimisez le niveau de risque de votre portfolio avec des recommandations personnalisées.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 TradeAssist. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

