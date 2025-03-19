"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, FileText, ChevronRight, ExternalLink, Clock } from "lucide-react"

interface LearningResource {
  id: string
  title: string
  description: string
  type: "video" | "article" | "guide"
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  tags: string[]
  url: string
}

const EducationalContent = () => {
  const [activeTab, setActiveTab] = useState("recommended")

  const [resources] = useState<LearningResource[]>([
    {
      id: "1",
      title: "Understanding Portfolio Diversification",
      description: "Learn how to reduce risk by diversifying your investment portfolio across different asset classes.",
      type: "video",
      duration: "12 min",
      level: "beginner",
      tags: ["portfolio", "risk management"],
      url: "#",
    },
    {
      id: "2",
      title: "Technical Analysis Fundamentals",
      description: "Master the basics of technical analysis to identify trading opportunities in the market.",
      type: "article",
      duration: "15 min read",
      level: "intermediate",
      tags: ["technical analysis", "trading"],
      url: "#",
    },
    {
      id: "3",
      title: "Tax-Efficient Investing Strategies",
      description: "Discover strategies to minimize tax impact on your investment returns.",
      type: "guide",
      duration: "20 min read",
      level: "advanced",
      tags: ["taxes", "optimization"],
      url: "#",
    },
    {
      id: "4",
      title: "Introduction to ETFs",
      description: "Learn about Exchange-Traded Funds and how they can be used in your investment strategy.",
      type: "video",
      duration: "8 min",
      level: "beginner",
      tags: ["ETFs", "passive investing"],
      url: "#",
    },
  ])

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-5 w-5 text-red-500" />
      case "article":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "guide":
        return <BookOpen className="h-5 w-5 text-purple-500" />
      default:
        return <BookOpen className="h-5 w-5 text-emerald-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-blue-500"
      case "advanced":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-[#2a2a2a] shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-emerald-500" />
          Educational Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-[#333333]">
            <TabsTrigger value="recommended" className="data-[state=active]:bg-emerald-500">
              Recommended
            </TabsTrigger>
            <TabsTrigger value="beginner" className="data-[state=active]:bg-emerald-500">
              Beginner
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-emerald-500">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {resources
                .filter((r) => activeTab === "recommended" || r.level === activeTab)
                .map((resource) => (
                  <div key={resource.id} className="p-4 bg-[#333333] rounded-lg hover:bg-[#3a3a3a] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        {getResourceIcon(resource.type)}
                        <h3 className="text-white font-medium ml-2">{resource.title}</h3>
                      </div>
                      <Badge className={getLevelColor(resource.level)}>
                        {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {resource.duration}
                      </div>
                      <Button
                        variant="link"
                        className="text-emerald-400 p-0 h-auto"
                        onClick={() => window.open(resource.url, "_blank")}
                      >
                        View resource <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-[#444444] text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400">
                View all resources <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default EducationalContent

