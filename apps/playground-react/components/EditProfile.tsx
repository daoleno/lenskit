import { useSetProfileMetadata } from '@lenskit/react'
import { Alert, Button, Card, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function EditProfile() {
  const [loading, setLoading] = useState(false)
  const { setProfileMetadata, tx, error } = useSetProfileMetadata()
  const form = useForm({
    initialValues: {
      profileId: '',
      name: '',
      bio: '',
    },
  })

  const handleUpdateProfile = async (values: any) => {
    setLoading(true)
    const profileMetadata = {
      version: '1.0.0',
      metadata_id: uuidv4(),
      name: values.name.value,
      bio: values.bio.value,
      cover_picture: 'https://picsum.photos/200/300',
      attributes: [
        {
          traitType: 'string',
          value: 'yes this is custom',
          key: 'custom_field',
        },
      ],
    }
    await setProfileMetadata(values.profileId.value, profileMetadata)
    setLoading(false)
  }

  return (
    <form onSubmit={form.onSubmit(handleUpdateProfile)}>
      <Card withBorder>
        <Stack spacing="md">
          <Title order={2}>Edit Lens Profile</Title>
          <TextInput
            label="Profile ID"
            placeholder="0xfff"
            required
            {...form.getInputProps('profileId')}
          />
          <TextInput label="Name" placeholder="lenskit" required {...form.getInputProps('name')} />
          <TextInput
            label="Bio"
            placeholder="lenskit playground"
            required
            {...form.getInputProps('bio')}
          />
          <Button color={'white'} w="full" type="submit" loading={loading && !error}>
            Submit
          </Button>
          {error && <Alert color="red">{error.message}</Alert>}
          {tx && <Alert color="green">Profile updated: {tx.transactionHash}</Alert>}
        </Stack>
      </Card>
    </form>
  )
}
