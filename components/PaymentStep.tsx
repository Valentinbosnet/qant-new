"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, CreditCard } from "lucide-react"

interface PaymentStepProps {
  onComplete: (paymentDetails: { plan: string; cardNumber: string }) => void
  onBack: () => void
}

const PaymentStep: React.FC<PaymentStepProps> = ({ onComplete, onBack }) => {
  const [plan, setPlan] = useState("monthly")
  const [cardNumber, setCardNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    onComplete({ plan, cardNumber })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-[#2a2a2a] shadow-lg border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Choose Your Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <RadioGroup value={plan} onValueChange={setPlan}>
                <div className="flex items-center space-x-2 bg-[#333333] p-4 rounded-md">
                  <RadioGroupItem value="trial" id="trial" />
                  <Label htmlFor="trial" className="flex flex-col">
                    <span className="text-lg font-semibold text-white">7-Day Free Trial</span>
                    <span className="text-sm text-gray-400">Then $9.99/month</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#333333] p-4 rounded-md">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="flex flex-col">
                    <span className="text-lg font-semibold text-white">Monthly Plan</span>
                    <span className="text-sm text-gray-400">$9.99/month</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#333333] p-4 rounded-md">
                  <RadioGroupItem value="annual" id="annual" />
                  <Label htmlFor="annual" className="flex flex-col">
                    <span className="text-lg font-semibold text-white">Annual Plan</span>
                    <span className="text-sm text-gray-400">$99.99/year (Save 17%)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number" className="text-white">
                Card Number
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="pl-10 bg-[#333333] border-gray-700 text-white"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onBack} className="text-gray-400">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isProcessing || !cardNumber}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                Start {plan === "trial" ? "Free Trial" : "Subscription"} <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default PaymentStep

