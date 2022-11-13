import { useCreateProfile } from '@lenskit/react'
import { Button, Stack } from '@mantine/core'
import { useState } from 'react'

import { Alert, Card, Input, Title } from '@mantine/core'

export default function CreateProfile(): JSX.Element {
  const { createProfile, profileId, loading, error } = useCreateProfile()
  const [handle, setHandle] = useState('')

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Title order={2}>Create Profile</Title>
        <Input
          placeholder={'Enter a handle'}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <Button color="blue" loading={loading} onClick={() => createProfile(handle)}>
          Create
        </Button>
        {profileId && <Alert color="green">Profile created: {profileId}</Alert>}
        {error && <Alert color="red">{error.message}</Alert>}
      </Stack>
    </Card>
  )
}
