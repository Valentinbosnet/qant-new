"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Users, Settings } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Base de données
            </CardTitle>
            <CardDescription>Gérez la structure de la base de données et exécutez les migrations...</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Exécutez les migrations pour mettre à jour la structure de la base de données ou initialiser une nouvelle
              installation...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/run-migrations">
                <Database className="mr-2 h-4 w-4" />
                Exécuter les migrations
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Utilisateurs
            </CardTitle>
            <CardDescription>Gérez les comptes utilisateurs et leurs permissions...</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Consultez, modifiez ou supprimez les comptes utilisateurs... Gérez les rôles et les permissions...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Gérer les utilisateurs
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>Configurez les paramètres globaux de l'application...</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Modifiez les paramètres de l'application, les intégrations API et autres configurations...
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
