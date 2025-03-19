"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Share2, Send, Users, UserPlus, TrendingUp } from "lucide-react"

interface SocialPageProps {
  onTabChange?: (tab: string) => void
}

export default function SocialPage({ onTabChange }: SocialPageProps) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder...svg?height=40&width=40",
      role: "Investment Analyst",
      content:
        "Just published my analysis on emerging market trends for Q2... Check it out and let me know your thoughts!",
      likes: 24,
      comments: 8,
      shares: 5,
      time: "2h ago",
      liked: false,
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/placeholder...svg?height=40&width=40",
      role: "Portfolio Manager",
      content:
        "The tech sector is showing interesting patterns this week... I'm particularly watching $AAPL and $MSFT as they approach earnings season...",
      likes: 42,
      comments: 15,
      shares: 12,
      time: "5h ago",
      liked: true,
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      avatar: "/placeholder...svg?height=40&width=40",
      role: "Financial Advisor",
      content:
        "Diversification remains key in this volatile market... I've been helping clients balance their portfolios with a mix of growth stocks and stable dividend payers...",
      likes: 18,
      comments: 7,
      shares: 3,
      time: "1d ago",
      liked: false,
    },
  ])

  const [suggestedUsers] = useState([
    {
      id: 1,
      name: "David Wilson",
      avatar: "/placeholder...svg?height=40&width=40",
      role: "Crypto Analyst",
      followers: 1243,
    },
    {
      id: 2,
      name: "Lisa Thompson",
      avatar: "/placeholder...svg?height=40&width=40",
      role: "Hedge Fund Manager",
      followers: 5678,
    },
    {
      id: 3,
      name: "James Lee",
      avatar: "/placeholder...svg?height=40&width=40",
      role: "Day Trader",
      followers: 892,
    },
  ])

  const [trendingTopics] = useState([
    { id: 1, name: "Artificial Intelligence", posts: 1245 },
    { id: 2, name: "Sustainable Investing", posts: 876 },
    { id: 3, name: "Crypto Market", posts: 654 },
    { id: 4, name: "Interest Rates", posts: 543 },
    { id: 5, name: "Tech Stocks", posts: 432 },
  ])

  const handleLike = (postId: number) => {
    setPosts(
      posts...map((post) => {
        if (post...id === postId) {
          return {
            .........post,
            likes: post...liked ? post...likes - 1 : post...likes + 1,
            liked: !post...liked,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Social Community</h1>
      <p className="text-gray-400">Connect with other investors and share insights</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Create Post */}
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <img src="/placeholder...svg?height=40&width=40" alt="Your avatar" />
                </Avatar>
                <Input
                  placeholder="Share your investment insights........."
                  className="bg-[#333333] border-[#444444] text-white"
                />
                <Button size="icon" variant="ghost">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feed */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#2a2a2a] text-gray-400">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
                All Posts
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
              >
                Following
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-[#333333] data-[state=active]:text-white">
                Popular
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {posts...map((post) => (
                <Card key={post...id} className="bg-[#2a2a2a] border-[#333333] text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <img src={post...avatar || "/placeholder...svg"} alt={post...author} />
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post...author}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {post...role} * {post...time}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p>{post...content}</p>
                  </CardContent>
                  <CardFooter className="border-t border-[#333333] pt-3">
                    <div className="flex w-full justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={post...liked ? "text-emerald-500" : "text-gray-400"}
                        onClick={() => handleLike(post...id)}
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        {post...likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        {post...comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Share2 className="mr-1 h-4 w-4" />
                        {post...shares}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="following" className="mt-4">
              <Card className="bg-[#2a2a2a] border-[#333333] text-white p-6 text-center">
                <p>Follow more investors to see their posts here...</p>
                <Button
                  variant="outline"
                  className="mt-4 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                  onClick={() => onTabChange && onTabChange("discover")}
                >
                  Discover Users
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="popular" className="mt-4 space-y-4">
              {posts
                ...sort((a, b) => b...likes - a...likes)
                ...map((post) => (
                  <Card key={post...id} className="bg-[#2a2a2a] border-[#333333] text-white">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <img src={post...avatar || "/placeholder...svg"} alt={post...author} />
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{post...author}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {post...role} * {post...time}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p>{post...content}</p>
                    </CardContent>
                    <CardFooter className="border-t border-[#333333] pt-3">
                      <div className="flex w-full justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={post...liked ? "text-emerald-500" : "text-gray-400"}
                          onClick={() => handleLike(post...id)}
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          {post...likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <MessageCircle className="mr-1 h-4 w-4" />
                          {post...comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <Share2 className="mr-1 h-4 w-4" />
                          {post...shares}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          {/* Suggested Users */}
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Suggested to Follow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedUsers...map((user) => (
                <div key={user...id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <img src={user...avatar || "/placeholder...svg"} alt={user...name} />
                    </Avatar>
                    <div>
                      <p className="font-medium">{user...name}</p>
                      <p className="text-sm text-gray-400">{user...role}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 w-8 rounded-full p-0">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-emerald-500">
                View More
              </Button>
            </CardFooter>
          </Card>

          {/* Trending Topics */}
          <Card className="bg-[#2a2a2a] border-[#333333] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {trendingTopics...map((topic) => (
                  <li key={topic...id} className="flex items-center justify-between">
                    <span>#{topic...name}</span>
                    <span className="text-sm text-gray-400">{topic...posts} posts</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-emerald-500">
                Explore All Topics
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

