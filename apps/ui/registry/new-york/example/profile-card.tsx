"use client"

import { useState } from "react"
import Image from "next/image"
import { profileId as forProfileId, useProfile } from "@lens-protocol/react-web"
import { AvatarImage } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

type ProfileCardProps = {
  profileId: string
}

export function ProfileCard({ profileId }: ProfileCardProps) {
  const { data, error, loading } = useProfile({
    forProfileId: forProfileId(profileId),
  })
  const [following, setFollowing] = useState(false)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const { metadata, stats } = data

  return (
    <Card className="rounded-xl overflow-hidden w-80">
      <Image
        className="h-40 w-full object-cover"
        width={500}
        height={200}
        src={
          // metadata?.coverPicture?.optimized?.uri ||
          "/placeholders/banner.png"
        }
        alt="Profile Banner"
      />
      <div className="relative px-6 pt-4">
        <div className="flex justify-between">
          <div>
            <Avatar className="h-20 w-20 absolute -top-10">
              <AvatarImage
                src={
                  // metadata?.picture?.optimized.uri
                  "/placeholders/avatar.png"
                }
                alt="Profile Avatar"
              />
              <AvatarFallback>{metadata?.displayName}</AvatarFallback>
            </Avatar>
            <h2 className="mt-7 text-xl font-bold">{metadata?.displayName}</h2>
            <p className="mt-2 text-sm text-muted-foreground ">
              {metadata?.bio}
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full"
            variant={following ? "destructive" : "default"}
            onClick={() => setFollowing(!following)}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <div className="mt-4 flex gap-2 py-3">
          <div>
            <span className="text-sm font-bold">{stats.following}</span>
            <span className="text-sm text-muted-foreground"> Following</span>
          </div>
          <div>
            <span className="text-sm font-bold">{stats.following}</span>
            <span className="text-sm text-muted-foreground"> Followers</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function ProfileCardExample() {
  return <ProfileCard profileId="0xf8" />
}
