import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "./providers"
import "./globals.css"

export const metadata = {
  title: "Finance App",
  description: "Your personal finance management application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}