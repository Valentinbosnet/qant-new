import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, UserPlus, ArrowRight } from "lucide-react"

export default function SetupPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuration de l'application</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Étape 1: Migrations
            </CardTitle>
            <CardDescription>Exécutez les migrations pour initialiser la base de données</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Cette étape crée les tables nécessaires dans la base de données pour que l'application fonctionne
              correctement...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/migrations">
                <Database className="mr-2 h-4 w-4" />
                Exécuter les migrations
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Étape 2: Créer un administrateur
            </CardTitle>
            <CardDescription>Créez un compte administrateur pour gérer l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Créez un compte avec des privilèges d'administrateur pour accéder à toutes les fonctionnalités...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/setup/init-admin">
                <UserPlus className="mr-2 h-4 w-4" />
                Créer un administrateur
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/">
            Retour à l'accueil
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

