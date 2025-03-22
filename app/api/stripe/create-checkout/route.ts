import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import Stripe from "stripe"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

// Fonction POST pour créer une session de paiement Stripe
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { plan } = await request.json()

    if (!plan || (plan !== "premium" && plan !== "pro")) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Initialiser Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16",
    })

    // Déterminer le prix en fonction du plan
    const priceId = plan === "premium" ? process.env.STRIPE_PREMIUM_PRICE_ID : process.env.STRIPE_PRO_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: "Price ID not configured" }, { status: 500 })
    }

    // Créer une session de paiement
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        plan,
      },
      customer_email: session.user.email || undefined,
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?payment=cancelled`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "An error occurred while creating the checkout session" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to create a Stripe checkout session",
  })
}

