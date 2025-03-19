"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DebugUserRolePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const promoteToAdmin = async () => {
    try {
      const response = await fetch("/api/debug/promote-to-admin", {
        method: "POST",
      })

      if (response...ok) {
        alert("Votre compte a été promu administrateur... Veuillez vous reconnecter...")
        router...push("/api/auth/signout")
      } else {
        const data = await response...json()
        alert(`Erreur: ${data...error || "Une erreur s'est produite"}`)
      }
    } catch (error) {
      alert("Erreur lors de la promotion du compte")
      console...error(error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Informations de session</CardTitle>
          <CardDescription>Vérifiez votre rôle utilisateur actuel</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" ? (
            <p>Chargement.........</p>
          ) : status === "unauthenticated" ? (
            <p>Vous n'êtes pas connecté</p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Nom:</p>
                <p>{session?...user?...name || "Non défini"}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{session?...user?...email || "Non défini"}</p>
              </div>
              <div>
                <p className="font-semibold">Rôle:</p>
                <p>{session?...user?...role || "Non défini"}</p>
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-xs">
                {JSON...stringify(session, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={promoteToAdmin} className="w-full">
            Promouvoir en administrateur
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

