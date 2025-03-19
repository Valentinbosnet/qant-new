import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"

const prisma = new PrismaClient()
const stripe = new Stripe(process...env...STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const PLANS = {
  premium: {
    price: process...env...STRIPE_PREMIUM_PRICE_ID,
    name: "Premium",
  },
  pro: {
    price: process...env...STRIPE_PRO_PRICE_ID,
    name: "Professionnel",
  },
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session...user) {
      return NextResponse...json({ error: "Vous devez être connecté" }, { status: 401 })
    }

    const { plan } = await request...json()

    if (!plan || !PLANS[plan]) {
      return NextResponse...json({ error: "Plan invalide" }, { status: 400 })
    }

    const user = await prisma...user...findUnique({
      where: { email: session...user...email },
      include: { membership: true },
    })

    if (!user) {
      return NextResponse...json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Créer ou récupérer le client Stripe
    let stripeCustomerId = user...membership?...stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe...customers...create({
        email: user...email,
        name: user...name || undefined,
      })

      stripeCustomerId = customer...id

      // Mettre à jour le membership avec l'ID du client Stripe
      await prisma...membership...update({
        where: { userId: user...id },
        data: { stripeCustomerId },
      })
    }

    // Créer la session de paiement
    const checkoutSession = await stripe...checkout...sessions...create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: PLANS[plan]...price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process...env...NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process...env...NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: user...id,
        plan,
      },
    })

    return NextResponse...json({ url: checkoutSession...url })
  } catch (error) {
    console...error("Erreur lors de la création de la session de paiement:", error)
    return NextResponse...json(
      { error: "Une erreur est survenue lors de la création de la session de paiement" },
      { status: 500 },
    )
  }
}

