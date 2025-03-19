import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/lib/db"
import crypto from "crypto"
import { sendVerificationEmail } from "@/lib/email-service"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create verification token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date()
    expires.setHours(expires.getHours() + 24) // Token expires in 24 hours

    // Create user and verification token in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      // Create verification token
      await tx.verificationToken.create({
        data: {
          email,
          token,
          expires,
        },
      })

      // Create subscription
      await tx.subscription.create({
        data: {
          userId: user.id,
          plan: "free",
          status: "active",
        },
      })

      return user
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, token)
      console.log(`Verification email sent to ${email}`)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      // Continue even if email sending fails, but log the error
      // In development, we'll simulate email sending
      if (process.env.NODE_ENV === "development") {
        console.log(
          `DEVELOPMENT MODE: Verification URL would be: ${process.env.NEXTAUTH_URL}/verify-email?token=${token}`,
        )
      }
    }

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}

