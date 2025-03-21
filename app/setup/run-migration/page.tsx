"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Database, RefreshCw } from "lucide-react"

export default function SetupMigrationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
    error?: string
  } | null>(null)

  const runMigrations = async () => {
    try {
      setIsLoading(true)
      setResult(null)

      const response = await fetch("/api/run-migrations")
      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || "Migrations exécutées avec succès",
        })
      } else {
        setResult({
          success: false,
          error: data.error || "Erreur lors de l'exécution des migrations",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        error: "Erreur de connexion au serveur",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuration - Exécuter les migrations</h1>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Migrations de base de données
          </CardTitle>
          <CardDescription>
            Exécutez les migrations pour créer ou mettre à jour la structure de la base de données. Cette opération est
            nécessaire lors de la première installation ou après une mise à jour.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {result && (
            <Alert className={result.success ? "bg-green-500/20" : "bg-red-500/20"}>
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertTitle>{result.success ? "Succès" : "Erreur"}</AlertTitle>
              <AlertDescription>{result.success ? result.message : result.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={runMigrations} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Exécution en cours...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Exécuter les migrations
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

