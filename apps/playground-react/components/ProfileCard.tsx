import { useProfiles } from '@lenskit/react'
import { Alert, Avatar, Card, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function ProfileCard() {
  const [profileId, setProfileId] = useState('')
  const { profiles, loading, error } = useProfiles([profileId])

  useEffect(() => {
    console.log('profiles', profiles)
  }, [profiles])

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack>
        <Title order={3}>Profile</Title>
        <TextInput
          value={profileId}
          placeholder="Profile ID"
          onChange={(e) => setProfileId(e.currentTarget.value)}
        />

        {profiles && (
          <Group>
            <Avatar src={'/lens/lens-logo.svg'} size="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {profiles[0].name}
              </Text>

              <Text color="dimmed" size="xs">
                {profiles[0].bio}
              </Text>
            </div>
          </Group>
        )}
        {loading && <Loader />}
        {error && <Alert color="red">Error: {error.message}</Alert>}
      </Stack>
    </Card>
  )
}
