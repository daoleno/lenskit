"use client"

import React, { useState } from "react"

const PostBox: React.FC = () => {
  const [tweet, setTweet] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value)
  }

  const sendTweet = () => {
    console.log("Tweet sent:", tweet)
    setTweet("")
  }

  return (
    <div className="border rounded-lg p-4 max-w-md mx-auto mt-10">
      <textarea
        rows={4}
        className="w-full p-2 border rounded-lg resize-none"
        placeholder="你有什么新鲜事?"
        value={tweet}
        onChange={handleInputChange}
      ></textarea>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-full"
        onClick={sendTweet}
      >
        发布
      </button>
    </div>
  )
}

export default PostBox
