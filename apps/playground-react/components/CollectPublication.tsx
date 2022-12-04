import { useCollect } from '@lenskit/react'
import { Alert, Button, Card, Input, Stack, Title } from '@mantine/core'
import { useState } from 'react'

export default function CollectPublication(): JSX.Element {
  const [publicationId, setPublicationId] = useState('0x530a-0x08')
  const { collect, tx, loading, error } = useCollect()

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack spacing="md">
        <Title variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 45 }} order={2}>
          Collect Publication
        </Title>
        <Input
          placeholder={'0x530a-0x08'}
          value={publicationId}
          onChange={(e: any) => setPublicationId(e.currentTarget.value)}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'lime', to: 'cyan', deg: 45 }}
          loading={loading}
          onClick={() => collect(publicationId)}
        >
          Collect
        </Button>
        {tx && <Alert color="green">Collect Success! Tx: {tx.transactionHash}</Alert>}
        {error && <Alert color="red">{error.message}</Alert>}
      </Stack>
    </Card>
  )
}
