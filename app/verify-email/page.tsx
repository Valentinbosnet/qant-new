"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Token de vérification manquant.")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`)
        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message || "Email vérifié avec succès.")

          // Redirect to get-started page after 3 seconds
          setTimeout(() => {
            router.push("/get-started")
          }, 3000)
        } else {
          setStatus("error")
          setMessage(data.error || "Échec de la vérification de l'email.")
        }
      } catch (error) {
        console.error("Error verifying email:", error)
        setStatus("error")
        setMessage("Une erreur s'est produite lors de la vérification de l'email.")
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <Card className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="pb-4">
          <div className="w-full flex justify-center mb-4">
            <div
              className={`p-3 rounded-full ${
                status === "loading" ? "bg-blue-500/20" : status === "success" ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}
            >
              {status === "loading" ? (
                <svg
                  className="animate-spin h-8 w-8 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : status === "success" ? (
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              ) : (
                <XCircle className="h-8 w-8 text-red-400" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">
            {status === "loading"
              ? "Vérification en cours..."
              : status === "success"
                ? "Email vérifié"
                : "Échec de la vérification"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300 mb-6">{message}</p>

          {status === "success" && (
            <p className="text-emerald-400 text-sm">Redirection vers la configuration de votre compte...</p>
          )}

          {status === "error" && (
            <Button onClick={() => router.push("/login")} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Retour à la connexion
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

