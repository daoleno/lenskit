import { PublicationTypes, usePublicationsQuery } from 'generated-gql'

export function usePublications(profileId: string, publicationTypes: Array<PublicationTypes>) {
  const { data, loading, error } = usePublicationsQuery({
    variables: {
      request: {
        profileId,
        publicationTypes,
      },
    },
  })

  return {
    publications: data?.publications,
    loading,
    error,
  }
}
