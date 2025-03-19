import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ".../globals...css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/Header"
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import Providers from ".../providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TradeAssist - Votre assistant d'investissement intelligent",
  description: "Analysez vos investissements, obtenez des prédictions IA et optimisez votre portfolio",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React...ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter...className} bg-gray-900 text-gray-300 min-h-screen`}>
        <Providers session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Header />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

