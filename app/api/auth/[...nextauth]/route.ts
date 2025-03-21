import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth-options"

// Exportez un gestionnaire qui utilise les options d'authentification
const handler = NextAuth(authOptions)

// Exportez les méthodes GET et POST pour le gestionnaire
export { handler as GET, handler as POST }

