import { useProfile } from '@lenskit/react'
import { Alert, Avatar, Card, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function ProfileCard() {
  const [profileId, setProfileId] = useState('')
  const { profile, loading, error } = useProfile(profileId)

  useEffect(() => {
    console.log('profile', profile)
  }, [profile])

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack>
        <Title order={3}>Profile</Title>
        <TextInput
          value={profileId}
          placeholder="Profile ID"
          onChange={(e) => setProfileId(e.currentTarget.value)}
        />

        {profile && (
          <Group>
            <Avatar src={'/lens/lens-logo.svg'} size="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {profile.name}
              </Text>

              <Text color="dimmed" size="xs">
                {profile.bio}
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
