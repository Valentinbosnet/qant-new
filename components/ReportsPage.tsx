"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, BarChart, PieChart, TrendingUp, Calendar } from "lucide-react"

interface ReportsPageProps {
  onTabChange?: (tab: string) => void
}

export default function ReportsPage({ onTabChange }: ReportsPageProps) {
  const reports = [
    {
      id: 1,
      title: "Portfolio Performance",
      description: "Detailed analysis of your portfolio performance over time",
      date: "Mar 15, 2023",
      type: "PDF",
    },
    {
      id: 2,
      title: "Investment Summary",
      description: "Summary of all your investments and their current status",
      date: "Mar 1, 2023",
      type: "PDF",
    },
    {
      id: 3,
      title: "Tax Report",
      description: "Annual tax report for your investment activities",
      date: "Feb 15, 2023",
      type: "PDF",
    },
    {
      id: 4,
      title: "Risk Analysis",
      description: "Detailed analysis of your portfolio risk factors",
      date: "Jan 30, 2023",
      type: "PDF",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Reports</h1>
      <p className="text-gray-400">Generate and download reports about your investments</p>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="bg-[#2a2a2a] text-gray-400">
          <TabsTrigger value="generate" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Generate Reports
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Report History
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
            Scheduled Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-[#2a2a2a] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
                <BarChart className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Generate a detailed report of your portfolio performance over time, including gains, losses, and
                  comparisons to market benchmarks.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="1m">Last Month</SelectItem>
                        <SelectItem value="3m">Last 3 Months</SelectItem>
                        <SelectItem value="6m">Last 6 Months</SelectItem>
                        <SelectItem value="1y">Last Year</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Generate Report</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#2a2a2a] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Asset Allocation</CardTitle>
                <PieChart className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Generate a report showing your current asset allocation across different investment types, sectors,
                  and geographic regions.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Detail Level</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select detail level" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Generate Report</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#2a2a2a] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Tax Report</CardTitle>
                <FileText className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Generate a tax report for your investment activities, including realized gains and losses, dividends,
                  and interest income.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tax Year</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Generate Report</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#2a2a2a] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Risk Analysis</CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Generate a comprehensive risk analysis of your portfolio, including volatility metrics, drawdowns, and
                  risk-adjusted returns.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="1m">Last Month</SelectItem>
                        <SelectItem value="3m">Last 3 Months</SelectItem>
                        <SelectItem value="6m">Last 6 Months</SelectItem>
                        <SelectItem value="1y">Last Year</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select>
                      <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#333333] border-[#444444] text-white">
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xlsx">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Generate Report</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription className="text-gray-400">
                View and download your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between rounded-lg bg-[#333333] p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                        <FileText className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-xs text-gray-400">{report.description}</p>
                        <p className="text-xs text-gray-400">
                          Generated on {report.date} * {report.type}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-500">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription className="text-gray-400">
                Set up automatic report generation on a schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#333333] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#444444] flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Monthly Portfolio Summary</p>
                      <p className="text-xs text-gray-400">Sent on the 1st of every month * PDF format</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-500 text-red-500">
                    Disable
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-[#444444] p-4 text-center">
                <p className="mb-2">Schedule a new automated report</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Create Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

