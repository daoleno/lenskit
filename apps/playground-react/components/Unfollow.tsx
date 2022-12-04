import { useUnfollow } from '@lenskit/react'
import { Alert, Button, Card, Input, Stack, Title } from '@mantine/core'
import { useState } from 'react'

export default function Unfollow(): JSX.Element {
  const { unfollow, tx, loading, error } = useUnfollow()
  const [handle, setHandle] = useState('')

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Title variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 45 }} order={2}>
          Unfollow Profile
        </Title>
        <Input
          placeholder={'0x530a'}
          value={handle}
          onChange={(e: any) => setHandle(e.target.value)}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'lime', to: 'cyan', deg: 45 }}
          loading={loading}
          onClick={() => unfollow(handle)}
        >
          {tx && tx.transactionHash ? 'Unfollowed' : 'Unfollow'}
        </Button>
        {error && <Alert color="red">{error.message}</Alert>}
        {tx && <Alert color="green">Unfollow Success! Tx: {tx.transactionHash}</Alert>}
      </Stack>
    </Card>
  )
}
