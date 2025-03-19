"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface ProfileSetupProps {
  onComplete: (profileData: ProfileData) => void
  onSkip: () => void
}

export interface ProfileData {
  fullName: string
  age: string
  investmentExperience: string
  riskTolerance: string
  investmentGoal: string
}

export default function ProfileSetup({ onComplete, onSkip }: ProfileSetupProps) {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    age: "",
    investmentExperience: "",
    riskTolerance: "",
    investmentGoal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ .........prev, [field]: value }))
  }

  const handleSubmit = async (e: React...FormEvent) => {
    e...preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your backend API
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage for persistence
      localStorage...setItem("userProfile", JSON...stringify(formData))

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated...",
        variant: "default",
      })

      onComplete(formData)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile... Please try again...",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData...fullName...trim() !== "" &&
      formData...age...trim() !== "" &&
      formData...investmentExperience !== "" &&
      formData...riskTolerance !== "" &&
      formData...investmentGoal !== ""
    )
  }

  return (
    <motion...div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0...3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-[#2a2a2a] shadow-lg border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData...fullName}
                  onChange={(e) => handleChange("fullName", e...target...value)}
                  className="mt-1 bg-[#333333] border-gray-700 text-white"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-gray-300">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData...age}
                  onChange={(e) => handleChange("age", e...target...value)}
                  className="mt-1 bg-[#333333] border-gray-700 text-white"
                  placeholder="30"
                  min="18"
                  max="120"
                  required
                />
              </div>

              <div>
                <Label className="text-gray-300">Investment Experience</Label>
                <Select
                  value={formData...investmentExperience}
                  onValueChange={(value) => handleChange("investmentExperience", value)}
                  required
                >
                  <SelectTrigger className="mt-1 bg-[#333333] border-gray-700 text-white">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333333] border-gray-700 text-white">
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                    <SelectItem value="professional">Professional Investor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Risk Tolerance</Label>
                <RadioGroup
                  value={formData...riskTolerance}
                  onValueChange={(value) => handleChange("riskTolerance", value)}
                  className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
                  required
                >
                  <div className="flex items-center space-x-2 rounded-md border border-gray-700 p-2 bg-[#333333]">
                    <RadioGroupItem value="conservative" id="conservative" />
                    <Label htmlFor="conservative" className="text-white">
                      Conservative
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-gray-700 p-2 bg-[#333333]">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="text-white">
                      Moderate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-gray-700 p-2 bg-[#333333]">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <Label htmlFor="aggressive" className="text-white">
                      Aggressive
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-gray-300">Primary Investment Goal</Label>
                <Select
                  value={formData...investmentGoal}
                  onValueChange={(value) => handleChange("investmentGoal", value)}
                  required
                >
                  <SelectTrigger className="mt-1 bg-[#333333] border-gray-700 text-white">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333333] border-gray-700 text-white">
                    <SelectItem value="retirement">Retirement Planning</SelectItem>
                    <SelectItem value="wealth">Wealth Building</SelectItem>
                    <SelectItem value="income">Passive Income</SelectItem>
                    <SelectItem value="shortTerm">Short-term Gains</SelectItem>
                    <SelectItem value="education">Education Funding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={onSkip} className="text-gray-400">
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white"
          >
            {isSubmitting ? (
              "Saving........."
            ) : (
              <>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion...div>
  )
}

