import { Flex, SimpleGrid } from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import CreateProfile from '../components/CreateProfile'
import EditProfile from '../components/EditProfile'
import ProfileCard from '../components/ProfileCard'

export default function Home() {
  // grid card layout has split lines
  // place in center of page
  return (
    <Flex direction="column" align="center" maw={800} mx="auto" mt="xl" gap="md">
      <span className="my-10 text-6xl font-bold">LensKit Playground</span>
      <ConnectButton />

      <SimpleGrid cols={3}>
        <CreateProfile />
        <EditProfile />
        <ProfileCard />
      </SimpleGrid>
    </Flex>
  )
}
