import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { db } from "@/lib/db"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session...user?...email) {
      return NextResponse...json({ error: "Unauthorized" }, { status: 401 })
    }

    await db...user...update({
      where: { email: session...user...email },
      data: {
        onboardingCompleted: true,
      },
    })

    return NextResponse...json({ message: "Onboarding completed successfully" }, { status: 200 })
  } catch (error) {
    console...error("Error updating onboarding status:", error)
    return NextResponse...json({ error: "Server error" }, { status: 500 })
  }
}

