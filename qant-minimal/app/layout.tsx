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
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}