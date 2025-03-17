import { NextResponse } from "next/server"
import { runMigrations } from "@/lib/migrations"

// Cette route sera appelée par un webhook Vercel après le déploiement
export async function GET() {
  // Vérifier un token secret pour la sécurité
  if (process.env.NODE_ENV === "production") {
    try {
      await runMigrations()
      return NextResponse.json({ success: true, message: "Migrations completed successfully" })
    } catch (error) {
      console.error("Migration error:", error)
      return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
  }

  return NextResponse.json({ success: false, message: "Not allowed" }, { status: 403 })
}

