"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function VerifyEmailNoticePage() {
  const searchParams = useSearchParams()
  const email = searchParams...get("email") || "your email"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <Card className="w-full max-w-md p-6 bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="pb-4">
          <div className="w-full flex justify-center mb-4">
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <Mail className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">Check your email</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-300 mb-6">
            We've sent a verification link to <span className="font-medium text-emerald-400">{email}</span>
          </p>
          <p className="text-gray-400 mb-8 text-sm">
            Click the link in the email to verify your account... If you don't see it, check your spam folder...
          </p>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              asChild
            >
              <Link href="/login">Back to login</Link>
            </Button>

            <Button variant="link" className="w-full text-emerald-400 hover:text-emerald-300" asChild>
              <Link href="/api/resend-verification">Resend verification email</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

