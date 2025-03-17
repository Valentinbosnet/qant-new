import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email-service"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    // Find the verification token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date() > verificationToken.expires) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    // Find the user
    const user = await db.user.findUnique({
      where: { email: verificationToken.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user's email verification status
    await db.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    })

    // Delete the verification token
    await db.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Continue even if email sending fails
    }

    return NextResponse.redirect(new URL("/login?verified=true", req.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

