"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface InvestmentReport {
  id: string
  title: string
  date: string
  summary: string
  performance: {
    overall: number
    monthly: number
    yearly: number
  }
  recommendations: string[]
}

const mockReport: InvestmentReport = {
  id: "1",
  title: "Q1 2023 Investment Report",
  date: "2023-03-31",
  summary:
    "Overall positive performance despite market volatility. Portfolio diversification strategy has proven effective.",
  performance: {
    overall: 8.2,
    monthly: 2.7,
    yearly: 12.4,
  },
  recommendations: [
    "Consider increasing allocation to technology sector",
    "Reduce exposure to high-yield bonds",
    "Maintain current diversification strategy",
    "Explore opportunities in renewable energy",
  ],
}

export default function InvestmentReportPage() {
  const [report, setReport] = useState<InvestmentReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReport(mockReport)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading report...</h2>
          <p className="text-gray-500">Please wait while we generate your investment report.</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Report not found</h2>
          <p className="text-gray-500">We couldn't find the requested investment report.</p>
          <Button className="mt-4">Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{report.title}</h1>
      <p className="text-gray-500 mb-8">Generated on {new Date(report.date).toLocaleDateString()}</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Overall Performance</p>
              <p
                className={`text-2xl font-bold ${report.performance.overall >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {report.performance.overall >= 0 ? "+" : ""}
                {report.performance.overall}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Monthly Change</p>
              <p
                className={`text-2xl font-bold ${report.performance.monthly >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {report.performance.monthly >= 0 ? "+" : ""}
                {report.performance.monthly}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Yearly Projection</p>
              <p className={`text-2xl font-bold ${report.performance.yearly >= 0 ? "text-green-600" : "text-red-600"}`}>
                {report.performance.yearly >= 0 ? "+" : ""}
                {report.performance.yearly}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{report.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {report.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2">
                  {index + 1}
                </span>
                {recommendation}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button variant="outline">Download PDF</Button>
        <Button>Share Report</Button>
      </div>
    </div>
  )
}

