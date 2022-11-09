import { useProfiles } from '@lenskit/react'
import { Avatar, Card, Group, Text, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function ProfileCard() {
  const [profileId, setProfileId] = useState('')
  const { profiles } = useProfiles([profileId])

  useEffect(() => {
    console.log('profiles', profiles)
  }, [profiles])

  return (
    <Card p="lg" radius="md" withBorder>
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
      <TextInput
        value={profileId}
        placeholder="Profile ID"
        onChange={(e) => setProfileId(e.currentTarget.value)}
      />
    </Card>
  )
}
