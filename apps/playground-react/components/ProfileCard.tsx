import { useProfile } from '@lenskit/react'
import { Alert, Avatar, Card, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function ProfileCard() {
  const [profileId, setProfileId] = useState('0x530a')
  const { profile, loading, error } = useProfile({ profileId })

  useEffect(() => {
    console.log('profile', profile)
  }, [profile])

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack>
        <Title variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 45 }} order={3}>
          Query Profile
        </Title>
        <TextInput
          value={profileId}
          placeholder="Profile ID"
          onChange={(e: any) => setProfileId(e.currentTarget.value)}
        />

        {profile && (
          <Group>
            <Avatar src={'/lens/lens-logo.svg'} size={94} radius="md" />
            <div>
              <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                {profile.name}
              </Text>

              <Text size="lg" weight={500}>
                {profile.bio}
              </Text>

              <Group noWrap spacing={10} mt={3}>
                <Text size="xs" color="dimmed">
                  {profile.handle}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <Text size="xs" color="dimmed">
                  {shortAddress(profile.ownedBy)}
                </Text>
              </Group>
            </div>
          </Group>
        )}
        {loading && <Loader />}
        {error && <Alert color="red">Error: {error.message}</Alert>}
      </Stack>
    </Card>
  )
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
