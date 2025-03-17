"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="w-full border-b border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            TradeAssist
          </Link>

          <div className="flex items-center gap-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-gray-300 hover:text-white ${pathname === "/dashboard" ? "text-white" : ""}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/portfolio"
                  className={`text-gray-300 hover:text-white ${pathname === "/portfolio" ? "text-white" : ""}`}
                >
                  Portfolio
                </Link>
                <Button variant="ghost" onClick={() => signOut()} className="text-gray-300 hover:text-white">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}


