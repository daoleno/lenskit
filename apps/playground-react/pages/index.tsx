import { LensKitButton } from '@lenskit/react'
import {
  ActionIcon,
  Flex,
  SimpleGrid,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { IconMoonStars, IconSun } from '@tabler/icons'
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  const theme = useMantineTheme()

  // grid card layout has split lines
  // place in center of page
  return (
    <Flex direction="column" align="center" maw={800} mx="auto" mt="xl" gap="md">
      <div className="mx-auto my-10 flex items-center gap-3 text-6xl font-extrabold">
        🌿
        <Text
          variant="gradient"
          gradient={{ from: 'lime', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="center"
        >
          LensKit
        </Text>
        🌿
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </div>

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
