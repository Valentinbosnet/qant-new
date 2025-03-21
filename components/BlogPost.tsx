import type React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface BlogPostProps {
  id: string
  author: {
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  onLike: (id: string) => void
}

const BlogPost: React.FC<BlogPostProps> = ({ id, author, content, timestamp, likes, comments, onLike }) => {
  return (
    <Card className="mb-4 bg-[#2a2a2a] text-white">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.username} />
          <AvatarFallback>{author.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{author.username}</h3>
          <p className="text-sm text-gray-400">{timestamp}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => onLike(id)}>
          <Heart className="mr-2 h-4 w-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          {comments}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BlogPost

