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
        <Title variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 45 }} order={2}>
          Create Profile
        </Title>
        <Input
          placeholder={'Enter a handle'}
          value={handle}
          onChange={(e: any) => setHandle(e.target.value)}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'lime', to: 'cyan', deg: 45 }}
          loading={loading}
          onClick={() => createProfile(handle)}
        >
          Create
        </Button>
        {profileId && <Alert color="green">Profile created: {profileId}</Alert>}
        {error && <Alert color="red">{error.message}</Alert>}
      </Stack>
    </Card>
  )
}
