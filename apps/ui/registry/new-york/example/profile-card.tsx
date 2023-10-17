"use client"

import { useState } from "react"
import { useLogin } from "@lens-protocol/react-web"
import { AvatarImage } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export default function ProfileCard() {
  const { execute, loading, data, error } = useLogin()

  const [following, setFollowing] = useState(false)
  const [userData, setUserData] = useState({
    banner: "https://via.placeholder.com/500",
    avatar: "https://via.placeholder.com/100",
    name: "John Doe",
    description: "Frontend Developer",
    followingCount: 23,
    followersCount: 450,
    followedBy: [
      {
        name: "Joe",
        avatar: "https://via.placeholder.com/50",
      },
      {
        name: "Bob",
        avatar: "https://via.placeholder.com/50",
      },
    ],
  })

  return (
    <Card className="rounded-xl overflow-hidden w-80">
      <img
        className="h-40 w-full object-cover"
        src={userData.banner}
        alt="Profile Banner"
      />
      <div className="relative px-6 pt-4">
        <div className="flex justify-between">
          <div>
            <Avatar className="h-20 w-20 absolute -top-10">
              <AvatarImage src={userData.avatar} alt="Profile Avatar" />
              <AvatarFallback>{userData.name}</AvatarFallback>
            </Avatar>
            <h2 className="mt-7 text-xl font-bold">{userData.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground ">
              {userData.description}
            </p>
          </div>
          <Button
            size="sm"
            variant={following ? "destructive" : "default"}
            onClick={() => setFollowing(!following)}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <div className="mt-4 flex gap-2">
          <div>
            <span className="text-sm font-bold">{userData.followingCount}</span>
            <span className="text-sm text-muted-foreground"> Following</span>
          </div>
          <div>
            <span className="text-sm font-bold">{userData.followersCount}</span>
            <span className="text-sm text-muted-foreground"> Followers</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-7">
          <div className="flex space-x-[-12px]">
            {userData.followedBy.map((user, idx) => (
              <img
                key={idx}
                className="h-6 w-6 object-cover border-2  rounded-full"
                src={user.avatar}
                alt={user.name}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground flex gap-1">
            <p>Followed by</p>
            {userData.followedBy.map((user, idx) => (
              <span key={idx} className="text-secondary-foreground">
                {user.name}
                {idx < userData.followedBy.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Card>
  )
}
