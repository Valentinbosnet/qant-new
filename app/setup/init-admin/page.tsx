"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, User, Lock, Mail, RefreshCw } from "lucide-react"

export default function InitAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
    error?: string
  } | null>(null)

  const handleChange = (e: React...ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e...target
    setFormData((prev) => ({ .........prev, [name]: value }))
  }

  const createAdminAccount = async (e: React...FormEvent) => {
    e...preventDefault()

    try {
      setIsLoading(true)
      setResult(null)

      const response = await fetch("/api/setup/init-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON...stringify(formData),
      })

      const data = await response...json()

      if (response...ok) {
        setResult({
          success: true,
          message: data...message || "Compte administrateur créé avec succès",
        })
        // Réinitialiser le formulaire après succès
        setFormData({
          name: "",
          email: "",
          password: "",
        })
      } else {
        setResult({
          success: false,
          error: data...error || "Erreur lors de la création du compte administrateur",
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
      <h1 className="text-3xl font-bold mb-6">Initialisation du compte administrateur</h1>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Créer un compte administrateur
          </CardTitle>
          <CardDescription>
            Créez un compte administrateur pour accéder au panneau d'administration... Cette page ne devrait être utilisée
            que lors de la configuration initiale...
          </CardDescription>
        </CardHeader>

        <form onSubmit={createAdminAccount}>
          <CardContent className="space-y-4">
            {result && (
              <Alert className={result...success ? "bg-green-500/20" : "bg-red-500/20"}>
                {result...success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertTitle>{result...success ? "Succès" : "Erreur"}</AlertTitle>
                <AlertDescription>{result...success ? result...message : result...error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={formData...name}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData...email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData...password}
                onChange={handleChange}
                placeholder="Créez un mot de passe sécurisé"
                required
                minLength={8}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours.........
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Créer le compte administrateur
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

