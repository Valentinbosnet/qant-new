import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Authentification simplifiée pour le déploiement initial
        if (credentials?.email && credentials?.password) {
          return {
            id: "1",
            name: "Demo User",
            email: credentials.email,
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }