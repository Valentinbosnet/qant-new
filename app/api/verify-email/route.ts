import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
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
      return NextResponse.json({ error: "Token has expired" }, { status: 400 })
    }

    // Find the user by email
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

    // Delete the used token
    await db.verificationToken.delete({
      where: { id: verificationToken.id },
    })

    return NextResponse.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

