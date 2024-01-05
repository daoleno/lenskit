"use client"

import React, { useState } from "react"
import { ImageIcon, SmileIcon, VideoIcon } from "lucide-react"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Textarea } from "../ui/textarea"

export function CreatePostBox() {
  const [postContent, setPostContent] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value)
  }

  const post = () => {
    console.log("Post content:", postContent)
    setPostContent("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create post</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="What's happening?"
          value={postContent}
          onChange={handleInputChange}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          <ImageIcon size={20} />
          <SmileIcon size={20} />
          <VideoIcon size={20} />
        </div>
        <Button size={"sm"} onClick={post}>
          Post
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CreatePostBoxExample() {
  return (
    <div className="w-full">
      <CreatePostBox />
    </div>
  )
}
