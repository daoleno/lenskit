import { useFollow } from '@lenskit/react'
import { Alert, Button, Card, Input, Stack, Title } from '@mantine/core'
import { useState } from 'react'

export default function Follow(): JSX.Element {
  const { follow, tx, loading, error } = useFollow()
  const [handle, setHandle] = useState('')

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Title order={2}>Follow Profile</Title>
        <Input
          placeholder={'0x530a'}
          value={handle}
          onChange={(e: any) => setHandle(e.target.value)}
        />
        <Button color="blue" loading={loading} onClick={() => follow(handle)}>
          {tx && tx.transactionHash ? 'Followed' : 'Follow'}
        </Button>
        {error && <Alert color="red">{error.message}</Alert>}
        {tx && <Alert color="green">Follow Success! Tx: {tx.transactionHash}</Alert>}
      </Stack>
    </Card>
  )
}
