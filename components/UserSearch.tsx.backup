"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, UserPlus, UserMinus } from "lucide-react"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

interface UserSearchProps {
  onFollow: (user: User) => void
  onUnfollow: (userId: string) => void
  currentUser: { email: string }
  followedUsers: User[]
}

const UserSearch: React.FC<UserSearchProps> = ({ onFollow, onUnfollow, currentUser, followedUsers }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])

  // This is a mock function. In a real app, you'd call your API here.
  const searchUsers = async (term: string) => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data
    const allUsers: User[] = [
      { id: "1", username: "john_doe", email: "john@example.com", avatar: "" },
      { id: "2", username: "jane_smith", email: "jane@example.com", avatar: "" },
      { id: "3", username: "bob_johnson", email: "bob@example.com", avatar: "" },
    ]

    return allUsers.filter(
      (user) => user.username.toLowerCase().includes(term.toLowerCase()) && user.email !== currentUser.email,
    )
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    const results = await searchUsers(searchTerm)
    setSearchResults(results)
  }

  const isFollowing = (userId: string) => {
    return followedUsers.some((user) => user.id === userId)
  }

  return (
    <Card className="bg-[#2a2a2a] shadow-lg mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Find Users to Follow</h3>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#333333] border-gray-700 text-white"
          />
          <Button onClick={handleSearch} className="bg-emerald-500 hover:bg-emerald-600">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((user) => (
              <li key={user.id} className="flex justify-between items-center bg-[#333333] p-2 rounded">
                <span className="text-white">{user.username}</span>
                {isFollowing(user.id) ? (
                  <Button onClick={() => onUnfollow(user.id)} className="bg-red-500 hover:bg-red-600">
                    <UserMinus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => onFollow(user)} className="bg-emerald-500 hover:bg-emerald-600">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No users found</p>
        )}
      </CardContent>
    </Card>
  )
}

export default UserSearch

