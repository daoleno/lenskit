import { LensKitButton } from '@lenskit/react'
import { Flex, SimpleGrid } from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import CollectPublication from '../components/CollectPublication'
import CreateComment from '../components/CreateComment'
import CreateMirror from '../components/CreateMirror'
import CreatePost from '../components/CreatePost'
import CreateProfile from '../components/CreateProfile'
import EditProfile from '../components/EditProfile'
import Follow from '../components/Follow'
import ProfileCard from '../components/ProfileCard'
import { PublicationCard } from '../components/PublicationCard'
import { PublicationsCard } from '../components/PublicationsCard'
import Unfollow from '../components/Unfollow'

export default function Home() {
  // grid card layout has split lines
  // place in center of page
  return (
    <Flex direction="column" align="center" maw={800} mx="auto" mt="xl" gap="md">
      <span className="my-10 text-6xl font-bold">LensKit Playground</span>
      <ConnectButton />
      <LensKitButton />

      <SimpleGrid cols={3}>
        <CreateProfile />
        <EditProfile />
        <ProfileCard />
        <CreatePost />
        <PublicationCard />
        <PublicationsCard />
        <CollectPublication />
        <CreateMirror />
        <Follow />
        <Unfollow />
        <CreateComment />
      </SimpleGrid>
    </Flex>
  )
}
