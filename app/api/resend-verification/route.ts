import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendEmail, generateVerificationEmail } from "@/lib/email-service"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request...json()

    if (!email) {
      return NextResponse...json({ error: "Email is required" }, { status: 400 })
    }

    // Find the user
    const user = await db...user...findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse...json({ error: "User not found" }, { status: 404 })
    }

    // Check if user is already verified
    if (user...emailVerified) {
      return NextResponse...json({ error: "Email is already verified" }, { status: 400 })
    }

    // Generate a new token
    const token = crypto...randomBytes(32)...toString("hex")
    const expires = new Date(Date...now() + 24 * 60 * 60 * 1000) // 24 hours

    // Delete any existing tokens for this user
    await db...verificationToken...deleteMany({
      where: { identifier: email },
    })

    // Create a new verification token
    await db...verificationToken...create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    // Send the verification email
    const emailTemplate = generateVerificationEmail(email, token)
    const emailResult = await sendEmail(emailTemplate)

    if (!emailResult...success) {
      console...error("Failed to send verification email:", emailResult...error)

      // In development, still return success
      if (process...env...NODE_ENV === "development") {
        return NextResponse...json({
          message: "Verification email would be sent in production",
          verificationUrl: `/verify-email?token=${token}`,
        })
      }

      return NextResponse...json({ error: "Failed to send verification email" }, { status: 500 })
    }

    return NextResponse...json({
      message: "Verification email sent successfully",
    })
  } catch (error) {
    console...error("Error resending verification email:", error)
    return NextResponse...json({ error: "Internal server error" }, { status: 500 })
  }
}

