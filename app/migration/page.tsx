"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function MigrationsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const runMigrations = async () => {
    try {
      setStatus("loading")
      setMessage("Exécution des migrations.........")

      const response = await fetch("/api/run-migrations")
      const data = await response...json()

      if (response...ok) {
        setStatus("success")
        setMessage(data...message || "Migrations exécutées avec succès")
      } else {
        setStatus("error")
        setMessage(data...error || "Erreur lors de l'exécution des migrations")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Erreur de connexion au serveur")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Exécuter les migrations</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <p className="mb-4">
          Cette page vous permet d'exécuter les migrations de base de données nécessaires pour initialiser ou mettre à
          jour l'application...
        </p>

        {status !== "idle" && (
          <div
            className={`p-4 mb-4 rounded ${
              status === "loading"
                ? "bg-blue-900/50 text-blue-200"
                : status === "success"
                  ? "bg-green-900/50 text-green-200"
                  : "bg-red-900/50 text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <Button onClick={runMigrations} disabled={status === "loading"} className="w-full">
          {status === "loading" ? "Exécution en cours........." : "Exécuter les migrations"}
        </Button>
      </div>
    </div>
  )
}

