import { Alert, Button } from '@chakra-ui/react'
import { useCreateProfile } from '@lenskit/react'
import { useState } from 'react'

import { Center, Heading, Input, Stack } from '@chakra-ui/react'

export default function CreateProfile(): JSX.Element {
  const { createProfile, profileId, loading, error } = useCreateProfile()
  const [handle, setHandle] = useState('')

  return (
    <Stack spacing={4} bg="white" rounded={'xl'} boxShadow={'lg'} p={6} my={10}>
      <Center>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Create a Profile
        </Heading>
      </Center>
      <Input
        placeholder={'Enter a handle'}
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <Button colorScheme={'blue'} isLoading={loading} onClick={() => createProfile(handle)}>
        Create
      </Button>
      {profileId && <Alert status="success">Profile created: {profileId}</Alert>}
      {error && <Alert status="error">{error.message}</Alert>}
    </Stack>
  )
}
