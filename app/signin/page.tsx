"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?...get("callbackUrl") || "/dashboard"
  const registered = searchParams?...get("registered")

  async function handleSubmit(e: React...FormEvent) {
    e...preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?...error) {
        setError("Email ou mot de passe incorrect")
        return
      }

      router...push(callbackUrl)
      router...refresh()
    } catch (err) {
      setError("Une erreur s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre compte</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {registered && (
              <div className="rounded bg-green-50 p-3 text-green-600">
                Inscription réussie ! Vous pouvez maintenant vous connecter...
              </div>
            )}
            {error && <div className="rounded bg-red-50 p-3 text-red-500">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e...target...value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e...target...value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours........." : "Se connecter"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl })}
            >
              Se connecter avec Google
            </Button>
            <div className="mt-2 text-center text-sm">
              Pas encore de compte?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                S'inscrire
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

