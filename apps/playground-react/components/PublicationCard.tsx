import { usePublication } from '@lenskit/react'
import {
  Alert,
  Avatar,
  Card,
  Center,
  Group,
  Image,
  Input,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useEffect, useState } from 'react'

export function PublicationCard() {
  const [publicationId, setPublicationId] = useState('0x530a-0x07')
  const { publication, loading, error } = usePublication({ publicationId })
  useEffect(() => {
    console.log('publication', publication)
  }, [publication])

  return (
    <Card withBorder radius="md">
      <Stack>
        <Title variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 45 }} order={3}>
          Publication Card
        </Title>
        <Input
          placeholder="0x530a-0x07"
          onChange={(e: any) => setPublicationId(e.currentTarget.value)}
        />
        {publication && (
          <Card withBorder radius="md">
            <Card.Section>
              <a>
                <Image src={'cover.jpeg'} height={180} alt="" />
              </a>
            </Card.Section>

            <Text weight={500} component="a" className="mt-5 mb-2 block">
              {publication?.metadata.name}
            </Text>

            <Text size="sm" color="dimmed" lineClamp={4}>
              {publication?.metadata.content}
            </Text>

            <Group position="apart" className="mt-5">
              <Center>
                <Avatar src="lens/lens-logo.svg" size={24} radius="xl" mr="xs" />
                <Text size="sm" inline>
                  {publication?.profile.name}
                </Text>
              </Center>
            </Group>
          </Card>
        )}
        {loading && <Loader />}
        {error && <Alert color="red">{error.message}</Alert>}
      </Stack>
    </Card>
  )
}
