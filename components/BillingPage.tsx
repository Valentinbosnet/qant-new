"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, Download, Clock } from "lucide-react"

interface BillingPageProps {
  onTabChange?: (tab: string) => void
}

export default function BillingPage({ onTabChange }: BillingPageProps) {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Essential features for new investors",
      features: ["Portfolio tracking", "Basic AI predictions", "Market news", "Email support"],
      current: false,
    },
    {
      name: "Pro",
      price: "$29.99",
      period: "per month",
      description: "Advanced features for serious investors",
      features: [
        "Everything in Basic",
        "Advanced AI predictions",
        "Risk analysis",
        "Portfolio optimization",
        "Priority support",
      ],
      current: true,
    },
    {
      name: "Enterprise",
      price: "$99.99",
      period: "per month",
      description: "Complete solution for professional traders",
      features: [
        "Everything in Pro",
        "Custom AI models",
        "API access",
        "Team collaboration",
        "Dedicated account manager",
        "24/7 phone support",
      ],
      current: false,
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      date: "Mar 1, 2023",
      amount: "$29.99",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "Feb 1, 2023",
      amount: "$29.99",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "Jan 1, 2023",
      amount: "$29.99",
      status: "Paid",
    },
    {
      id: "INV-004",
      date: "Dec 1, 2022",
      amount: "$29.99",
      status: "Paid",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
      <p className="text-gray-400">Manage your subscription plan and payment methods</p>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="bg-[#2a2a2a] text-gray-400">
          <TabsTrigger value="subscription" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Subscription
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Billing History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="mt-6 space-y-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription className="text-gray-400">You are currently on the Pro plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Pro Plan</h3>
                  <p className="text-sm text-gray-400">Billed monthly</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$29.99</p>
                  <p className="text-sm text-gray-400">Next billing on Apr 1, 2023</p>
                </div>
              </div>
              <div className="rounded-lg bg-[#333333] p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-emerald-500" />
                  <p>Your subscription renews automatically in 15 days</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-[#333333] pt-5">
              <Button variant="outline" className="border-[#444444] text-gray-400">
                Cancel Subscription
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Upgrade Plan</Button>
            </CardFooter>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-[#2a2a2a] border-[#333333] text-white ${plan.current ? "border-emerald-500" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.current && <Badge className="bg-emerald-500">Current</Badge>}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-gray-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.current ? (
                    <Button className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      {plan.price === "$9.99" ? "Downgrade" : "Upgrade"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="mt-6 space-y-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#333333] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-gray-400">Expires 12/24 • Default payment method</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-[#444444] p-4 text-center">
                <p className="mb-2">Add a new payment method</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription className="text-gray-400">
                Your billing address for invoices and receipts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#333333] p-4">
                <p className="font-medium">John Doe</p>
                <p className="text-gray-400">123 Main Street</p>
                <p className="text-gray-400">New York, NY 10001</p>
                <p className="text-gray-400">United States</p>
                <p className="mt-2 text-gray-400">john.doe@example.com</p>
              </div>
              <Button variant="outline" className="border-emerald-500 text-emerald-500">
                Update Billing Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription className="text-gray-400">View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg bg-[#333333] p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-xs text-gray-400">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">{invoice.amount}</p>
                      <Badge className="bg-emerald-500">{invoice.status}</Badge>
                      <Button variant="ghost" size="sm" className="text-emerald-500">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

