import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { db } from "@/lib/db"

// Marquer cette route comme dynamique pour éviter les erreurs de build
export const dynamic = "force-dynamic"

// Utiliser la nouvelle syntaxe pour désactiver le parsing du body
// Cette configuration indique à Next.js de ne pas parser le corps de la requête
export const POST = async (request: Request) => {
  try {
    const body = await request.text()
    const signature = headers().get("stripe-signature") || ""

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16", // Utilisez la version API la plus récente
    })

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`)
      return NextResponse.json({ error: `Webhook signature verification failed` }, { status: 400 })
    }

    // Gérer les différents types d'événements Stripe
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session

        if (checkoutSession.metadata?.userId) {
          const userId = checkoutSession.metadata.userId
          const plan = checkoutSession.metadata.plan || "premium"

          // Mettre à jour l'abonnement de l'utilisateur
          await db.subscription.upsert({
            where: { userId },
            create: {
              userId,
              plan,
              status: "active",
              startDate: new Date(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
            },
            update: {
              plan,
              status: "active",
              startDate: new Date(),
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
            },
          })
        }
        break

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice

        if (invoice.customer_email) {
          const user = await db.user.findUnique({
            where: { email: invoice.customer_email },
            select: { id: true },
          })

          if (user) {
            // Prolonger l'abonnement
            await db.subscription.update({
              where: { userId: user.id },
              data: {
                status: "active",
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
              },
            })
          }
        }
        break

      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription

        if (subscription.customer) {
          const customerId =
            typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id

          // Trouver l'utilisateur par son ID client Stripe
          const user = await db.user.findFirst({
            where: {
              accounts: {
                some: {
                  providerAccountId: customerId,
                  provider: "stripe",
                },
              },
            },
            select: { id: true },
          })

          if (user) {
            // Désactiver l'abonnement
            await db.subscription.update({
              where: { userId: user.id },
              data: {
                status: "cancelled",
              },
            })
          }
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing Stripe webhook:", error)
    return NextResponse.json({ error: "An error occurred while processing the webhook" }, { status: 500 })
  }
}

// Ajouter une méthode GET pour éviter les erreurs de build
export async function GET() {
  return NextResponse.json({
    message: "This endpoint is for Stripe webhooks and requires a POST request",
  })
}

