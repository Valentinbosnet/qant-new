"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, FileText, Video, BookOpen } from "lucide-react"

interface HelpSupportPageProps {
  onTabChange?: (tab: string) => void
}

export default function HelpSupportPage({ onTabChange }: HelpSupportPageProps) {
  const faqs = [
    {
      question: "How do I connect my bank account?",
      answer:
        "To connect your bank account, go to the 'Connect Account' section in your profile settings... We use Plaid to securely connect to your financial institutions... Follow the prompts to select your bank and provide your credentials... Your banking information is encrypted and never stored on our servers...",
    },
    {
      question: "What are AI predictions based on?",
      answer:
        "Our AI predictions are based on historical market data, current trends, and advanced machine learning algorithms... We analyze thousands of data points including company financials, market sentiment, economic indicators, and more to generate insights... Remember that all predictions involve risk and past performance is not indicative of future results...",
    },
    {
      question: "How do I customize my risk profile?",
      answer:
        "You can customize your risk profile in the 'Preferences' section... We offer a risk assessment questionnaire that helps determine your risk tolerance... Based on your answers, we'll suggest an appropriate risk level, which you can adjust manually if needed... Your risk profile affects the types of investments and strategies we recommend...",
    },
    {
      question: "Can I export my portfolio data?",
      answer:
        "Yes, you can export your portfolio data in CSV or PDF format... Go to the Portfolio page, click on the 'Export' button in the top right corner, and select your preferred format... The export includes your holdings, performance metrics, transaction history, and allocation breakdowns...",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, go to the 'Billing' section in your account settings... Click on 'Manage Subscription' and then 'Cancel Subscription'... You'll be asked to provide feedback on why you're canceling... Your subscription will remain active until the end of your current billing period...",
    },
  ]

  const guides = [
    { title: "Getting Started with Qant", icon: BookOpen },
    { title: "Understanding AI Predictions", icon: FileText },
    { title: "Portfolio Management Basics", icon: FileText },
    { title: "Advanced Investment Strategies", icon: Video },
    { title: "Risk Management Guide", icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Help & Support</h1>
      <p className="text-gray-400">Find answers to your questions and get assistance</p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search for help topics........." className="bg-[#2a2a2a] border-[#333333] pl-10 text-white" />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="bg-[#2a2a2a] text-gray-400 w-full justify-start">
          <TabsTrigger value="faq" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Frequently Asked Questions
          </TabsTrigger>
          <TabsTrigger value="guides" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Guides & Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Contact Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription className="text-gray-400">
                Find answers to common questions about using Qant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs...map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-[#333333]">
                    <AccordionTrigger className="text-left hover:text-emerald-500">{faq...question}</AccordionTrigger>
                    <AccordionContent className="text-gray-400">{faq...answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Guides & Tutorials</CardTitle>
              <CardDescription className="text-gray-400">
                Learn how to make the most of Qant with our comprehensive guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {guides...map((guide, index) => (
                  <Card
                    key={index}
                    className="bg-[#333333] border-[#444444] cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="bg-[#444444] p-2 rounded-md">
                        <guide...icon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium">{guide...title}</p>
                        <p className="text-xs text-gray-400">
                          {guide...icon === Video ? "Video Tutorial" : "Documentation"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-[#2a2a2a] border-[#333333] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat Support
                </CardTitle>
                <CardDescription className="text-gray-400">Chat with our support team in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Our support team is available Monday to Friday, 9am to 5pm EST...</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="bg-[#2a2a2a] border-[#333333] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Email Support
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Send us an email and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>For non-urgent issues, email us at support@qant...ai</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Email</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

