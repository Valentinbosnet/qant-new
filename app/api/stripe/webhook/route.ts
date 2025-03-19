import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"

const prisma = new PrismaClient()
const stripe = new Stripe(process...env...STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const endpointSecret = process...env...STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  try {
    const body = await request...text()
    const signature = headers()...get("stripe-signature") as string

    let event: Stripe...Event

    try {
      event = stripe...webhooks...constructEvent(body, signature, endpointSecret)
    } catch (error) {
      console...error("Erreur lors de la vérification de la signature:", error)
      return NextResponse...json({ error: "Signature webhook invalide" }, { status: 400 })
    }

    switch (event...type) {
      case "checkout...session...completed": {
        const session = event...data...object as Stripe...Checkout...Session

        if (session...metadata?...userId && session...metadata?...plan) {
          const { userId, plan } = session...metadata

          // Mettre à jour l'abonnement de l'utilisateur
          await handleSubscriptionCreated(userId, plan, session...subscription as string)
        }
        break
      }

      case "customer...subscription...updated": {
        const subscription = event...data...object as Stripe...Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case "customer...subscription...deleted": {
        const subscription = event...data...object as Stripe...Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }
    }

    return NextResponse...json({ received: true })
  } catch (error) {
    console...error("Erreur lors du traitement du webhook:", error)
    return NextResponse...json({ error: "Une erreur est survenue lors du traitement du webhook" }, { status: 500 })
  }
}

async function handleSubscriptionCreated(userId: string, plan: string, subscriptionId: string) {
  const subscription = await stripe...subscriptions...retrieve(subscriptionId)

  await prisma...membership...update({
    where: { userId },
    data: {
      plan,
      status: subscription...status,
      stripeSubscriptionId: subscription...id,
      currentPeriodEnd: new Date(subscription...current_period_end * 1000),
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe...Subscription) {
  const membership = await prisma...membership...findFirst({
    where: { stripeSubscriptionId: subscription...id },
  })

  if (!membership) return

  await prisma...membership...update({
    where: { id: membership...id },
    data: {
      status: subscription...status,
      currentPeriodEnd: new Date(subscription...current_period_end * 1000),
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe...Subscription) {
  const membership = await prisma...membership...findFirst({
    where: { stripeSubscriptionId: subscription...id },
  })

  if (!membership) return

  await prisma...membership...update({
    where: { id: membership...id },
    data: {
      plan: "free",
      status: "inactive",
      stripeSubscriptionId: null,
      currentPeriodEnd: null,
    },
  })
}

