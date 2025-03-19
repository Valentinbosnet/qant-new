"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CreatePostFormProps {
  onCreatePost: (content: string) => void
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onCreatePost(content)
      setContent("")
    }
  }

  return (
    <Card className="mb-6 bg-[#2a2a2a] text-white">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] bg-[#333333] border-gray-700 text-white"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CreatePostForm

