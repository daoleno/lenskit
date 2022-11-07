import { SmallCloseIcon } from '@chakra-ui/icons'
import {
  Alert,
  Avatar,
  AvatarBadge,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSetProfileMetadata } from '@lenskit/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function EditProfile() {
  const [loading, setLoading] = useState(false)
  const { setProfileMetadata, tx, error } = useSetProfileMetadata()
  const handleUpdateProfile = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    const profileMetadata = {
      version: '1.0.0',
      metadata_id: uuidv4(),
      name: event.target.name.value,
      bio: event.target.bio.value,
      cover_picture: 'https://picsum.photos/200/300',
      attributes: [
        {
          traitType: 'string',
          value: 'yes this is custom',
          key: 'custom_field',
        },
      ],
    }
    await setProfileMetadata(event.target.profileId.value, profileMetadata)
  }

  return (
    <form onSubmit={handleUpdateProfile}>
      <Stack
        spacing={4}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Edit Lens Profile
        </Heading>
        <FormControl id="avatar">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="lens/lens-logo.svg">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="profileId" isRequired>
          <FormLabel>Profile ID</FormLabel>
          <Input placeholder="profile id" _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="lenskit" _placeholder={{ color: 'gray.500' }} type="text" />
        </FormControl>
        <FormControl id="bio" isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="The easiest way to integrate with Lens Protocol"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
            isLoading={loading}
          >
            Submit
          </Button>
        </Stack>
        {error && <Alert status="error">{error.message}</Alert>}
        {tx && <Alert status="success">Profile updated: {tx.transactionHash}</Alert>}
      </Stack>
    </form>
  )
}
