import { PublicationMainFocus, usePost } from '@lenskit/react'
import { Alert, Button, Card, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { v4 as uuidv4 } from 'uuid'

export default function CreatePost() {
  const { post, publicationId, loading, error } = usePost()
  const form = useForm({
    initialValues: {
      version: '2.0.0',
      mainContentFocus: PublicationMainFocus.TEXT_ONLY,
      metadata_id: uuidv4(),
      description: 'lenskit publication',
      locale: 'en-US',
      content:
        'Publications are the lifeblood of the Lens Protocol. They are all of the original content, comments, and mirrors produced by creators, curators, and users alike. Publications come in three primary types: posts, comments, and mirrors. Posts are the base object, with mirror and comment providing additional functionality. ',
      external_url: 'https://github.com/daoleno/lenskit',
      image: null,
      imageMimeType: null,
      name: 'lenskit',
      attributes: [],
      tags: ['lenskit'],
      appId: 'lenskit-github',
      profileId: '0x530a',
    },
  })

  const handleCreatePost = async (values: any) => {
    const content = {
      version: '2.0.0',
      mainContentFocus: PublicationMainFocus.TEXT_ONLY,
      metadata_id: uuidv4(),
      name: values.name,
      description: values.description,
      content: values.content,
      locale: 'en-US',
      external_url: values.external_url,
      image: values.image,
      imageMimeType: values.imageMimeType,
      attributes: [
        {
          traitType: 'string',
          value: 'yes this is custom',
          key: 'custom_field',
        },
      ],
      tags: ['lenskit'],
      appId: 'lenskit-github',
    }
    await post(values.profileId, content)
  }

  return (
    <form onSubmit={form.onSubmit(handleCreatePost)}>
      <Card withBorder>
        <Stack spacing="md">
          <Title variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 45 }} order={2}>
            Create Post
          </Title>
          <TextInput
            label="ProfileID"
            placeholder="0x530a"
            required
            {...form.getInputProps('profileId')}
          />
          <TextInput label="Name" placeholder="lenskit" required {...form.getInputProps('name')} />
          <TextInput
            label="Description"
            placeholder="lenskit playground"
            required
            {...form.getInputProps('description')}
          />
          <TextInput
            label="Content"
            placeholder="lenskit playground"
            required
            {...form.getInputProps('content')}
          />
          <TextInput
            label="External URL"
            placeholder="lenskit playground"
            {...form.getInputProps('external_url')}
          />
          <Button
            variant="gradient"
            gradient={{ from: 'lime', to: 'cyan', deg: 45 }}
            w="full"
            type="submit"
            loading={loading && !error}
          >
            Submit
          </Button>
          {error && <Alert color="red">{error.message}</Alert>}
          {publicationId && (
            <Alert color="green" title="Publication ID">
              Create Post Success! Publication ID: {publicationId}
            </Alert>
          )}
        </Stack>
      </Card>
    </form>
  )
}
