import { PublicationMainFocus, useCreatePost } from '@lenskit/react'
import { Alert, Button, Card, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function CreatePost() {
  const [loading, setLoading] = useState(false)
  const { createPost, publicationId, loading: createPostLoading, error } = useCreatePost()
  const form = useForm({
    initialValues: {
      version: '2.0.0',
      mainContentFocus: PublicationMainFocus.TEXT_ONLY,
      metadata_id: uuidv4(),
      description: 'create post demo',
      locale: 'en-US',
      content: 'This is a demo post',
      external_url: 'https://github.com/daoleno/lenskit',
      image: null,
      imageMimeType: null,
      name: 'lenskit',
      attributes: [],
      tags: ['using_api_examples'],
      appId: 'api_examples_github',
      profileId: '0x530a',
    },
  })

  const handleCreatePost = async (values: any) => {
    setLoading(true)
    const post = {
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
      tags: ['using_api_examples'],
      appId: 'api_examples_github',
    }
    await createPost(values.profileId, post)
    setLoading(false)
  }

  return (
    <form onSubmit={form.onSubmit(handleCreatePost)}>
      <Card withBorder>
        <Stack spacing="md">
          <Title order={2}>Create Post</Title>
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
          <Button color={'white'} w="full" type="submit" loading={loading && !error}>
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
