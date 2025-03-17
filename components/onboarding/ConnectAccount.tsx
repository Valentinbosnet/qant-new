"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Check, Link, Plus, RefreshCw, Building } from "lucide-react"

interface ConnectAccountProps {
  onComplete: () => void
}

export default function ConnectAccount({ onComplete }: ConnectAccountProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null)
  const [manualFormData, setManualFormData] = useState({
    accountName: '',
    accountType: '',\
    balance:  setManualFormData] = useState({
    accountName: '',
    accountType: '',
    balance: '',
    institution: '',
  })

  useEffect(() => {
    // Simuler la récupération d'un token Plaid
    const getPlaidLinkToken = async () => {
      try {
        // En production, vous feriez un appel à votre API pour obtenir un token
        // const response = await fetch('/api/create-link-token')
        // const data = await response.json()
        // setPlaidLinkToken(data.link_token)

        // Pour la démo, on simule un token
        setPlaidLinkToken("mock-plaid-link-token")
      } catch (error) {
        console.error("Erreur lors de la récupération du token Plaid:", error)
      }
    }

    getPlaidLinkToken()
  }, [])

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setManualFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaidConnect = async () => {
    setLoading(true)

    try {
      // Simuler une connexion Plaid réussie
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Compte connecté",
        description: "Votre compte bancaire a été connecté avec succès.",
        variant: "default",
      })

      localStorage.setItem("accountConnected", "true")
      onComplete()
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion à votre compte.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simuler un enregistrement de compte manuel
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enregistrer les données dans localStorage pour la démo
      localStorage.setItem("manualAccount", JSON.stringify(manualFormData))
      localStorage.setItem("accountConnected", "true")

      toast({
        title: "Compte ajouté",
        description: "Votre compte a été ajouté manuellement avec succès.",
        variant: "default",
      })

      onComplete()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de votre compte.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs defaultValue="plaid" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="plaid" className="data-[state=active]:bg-emerald-600">
          Connexion automatique
        </TabsTrigger>
        <TabsTrigger value="manual" className="data-[state=active]:bg-emerald-600">
          Ajout manuel
        </TabsTrigger>
      </TabsList>

      <TabsContent value="plaid">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6 space-y-4">
            <div className="text-center mb-4">
              <Building className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
              <h3 className="text-lg font-medium text-white">Connectez votre compte bancaire</h3>
              <p className="text-gray-400 text-sm">
                Connectez-vous en toute sécurité à votre banque pour importer automatiquement vos investissements.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Connexion sécurisée (chiffrement 256 bits)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Mise à jour automatique des données</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Compatible avec plus de 10 000 institutions financières</span>
              </div>
            </div>

            <Button
              onClick={handlePlaidConnect}
              disabled={loading || !plaidLinkToken}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? (
                <span className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </span>
              ) : (
                <span className="flex items-center">
                  <Link className="mr-2 h-4 w-4" />
                  Connecter mon compte
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manual">
        <form onSubmit={handleManualSubmit}>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-gray-300">
                  Institution financière
                </Label>
                <Input
                  id="institution"
                  name="institution"
                  value={manualFormData.institution}
                  onChange={handleManualInputChange}
                  placeholder="Nom de votre banque ou courtier"
                  className="bg-gray-700 border-gray-600 text-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName" className="text-gray-300">
                  Nom du compte
                </Label>
                <Input
                  id="accountName"
                  name="accountName"
                  value={manualFormData.accountName}
                  onChange={handleManualInputChange}
                  placeholder="Ex: Compte d'investissement principal"
                  className="bg-gray-700 border-gray-600 text-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType" className="text-gray-300">
                  Type de compte
                </Label>
                <Input
                  id="accountType"
                  name="accountType"
                  value={manualFormData.accountType}
                  onChange={handleManualInputChange}
                  placeholder="Ex: PEA, Assurance-vie, CTO"
                  className="bg-gray-700 border-gray-600 text-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance" className="text-gray-300">
                  Solde actuel (€)
                </Label>
                <Input
                  id="balance"
                  name="balance"
                  type="number"
                  value={manualFormData.balance}
                  onChange={handleManualInputChange}
                  placeholder="Ex: 10000"
                  className="bg-gray-700 border-gray-600 text-gray-200"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? (
                  <span className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter ce compte
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  )
}

