import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth-options"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

// Utiliser la syntaxe correcte pour l'App Router de Next.js
const handler = NextAuth(authOptions)

// Exporter les gestionnaires GET et POST
export { handler as GET, handler as POST }

