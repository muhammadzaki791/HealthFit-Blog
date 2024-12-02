"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Send, MessageCircle, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CommentComponentProps {
  slug: string
}

const CommentComponent: React.FC<CommentComponentProps> = ({ slug }) => {
  const [comments, setComments] = useState<{ name: string; text: string; timestamp: number }[]>([])
  const [name, setName] = useState<string>('')
  const [commentText, setCommentText] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments') || '{}')
    setComments(storedComments[slug] || [])
  }, [slug])

  const handleAddComment = () => {
    if (commentText.trim() && name.trim()) {
      const newComment = { name: name.trim(), text: commentText.trim(), timestamp: Date.now() }
      const newComments = [...comments, newComment]
      setComments(newComments)
      const allComments = JSON.parse(localStorage.getItem('comments') || '{}')
      allComments[slug] = newComments
      localStorage.setItem('comments', JSON.stringify(allComments))
      setName('')
      setCommentText('')
    }
  }

  const handleDeleteComment = (index: number) => {
    const newComments = comments.filter((_, idx) => idx !== index)
    setComments(newComments)
    const allComments = JSON.parse(localStorage.getItem('comments') || '{}')
    allComments[slug] = newComments
    localStorage.setItem('comments', JSON.stringify(allComments))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">Comments</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse comments" : "Expand comments"}
          >
            <MessageCircle className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription>Join the conversation and share your thoughts</CardDescription>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start space-x-4"
                  >
                    <Avatar>
                      <AvatarFallback>{comment?.name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{comment.name}</p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.timestamp).toLocaleString()}
                        </time>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteComment(idx)}
                      aria-label="Delete comment"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </motion.div>
                ))
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 w-full">
                <Avatar>
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Textarea
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full"
              />
              <Button
                onClick={handleAddComment}
                className="w-full"
                disabled={!commentText.trim() || !name.trim()}
              >
                <Send className="h-4 w-4 mr-2" /> Submit Comment
              </Button>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default CommentComponent

