"use client"

import {
  publicationId as forPublicationId,
  usePublication,
} from "@lens-protocol/react-web"
import { ArrowRightLeftIcon, HeartIcon, MessageSquareIcon } from "lucide-react"
import { format } from "timeago.js"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

type PublicationCardProps = {
  publicationId: string
}

export function PublicationCard({ publicationId }: PublicationCardProps) {
  const { data, error, loading } = usePublication({
    forId: forPublicationId(publicationId),
  })

  if (error) {
    return <div>Error:{error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return null
  }

  const username = data.by.metadata?.displayName
  const handle = data.by.handle?.localName
  const timeAgo = format(data.createdAt)
  const platform = data.publishedOn?.id
  const content = data?.metadata?.content

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                src={
                  // data.by.metadata?.picture?.optimized.uri
                  "/placeholders/avatar.png"
                }
                alt="Profile Avatar"
              />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="font-semibold">{username}</h3>
              <p className="text-sm text-muted-foreground">
                @{handle} · {timeAgo}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">...</div>
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>
          {data.createdAt} · Posted via {platform}
        </p>
        <div className="flex gap-4">
          <MessageSquareIcon size={18} />
          <ArrowRightLeftIcon size={18} />
          <HeartIcon size={18} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default function PublicationCardExample() {
  return <PublicationCard publicationId="0xf8-0x01" />
}
