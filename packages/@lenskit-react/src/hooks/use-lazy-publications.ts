import { PublicationsQueryRequest, usePublicationsLazyQuery } from 'generated-gql'
import { useState } from 'react'

export function useLazyPublications(query?: PublicationsQueryRequest) {
  const [fetchLoading, setFetchLoading] = useState(false)
  const [fethcError, setFetchError] = useState<Error | undefined>()
  const [fetchPublications, setFetchPublications] = useState<any>(null)

  const [fetchMore, { data, loading, error }] = usePublicationsLazyQuery(
    query
      ? {
          variables: {
            request: query,
          },
        }
      : undefined
  )

  async function getPublications(q: PublicationsQueryRequest) {
    return await fetchMore({
      variables: {
        request: q,
      },
    })
  }

  async function getAllPublications(q: PublicationsQueryRequest) {
    console.log('[publications] fetching all publications')

    setFetchLoading(true)
    try {
      let result = await getPublications(q)
      const items = result.data?.publications?.items
      console.log('[publications] feched page 0 with %d items', items?.length)
      let allData = items ? [...items] : []
      let cursor = result.data?.publications?.pageInfo.next
      let count = 0
      while (cursor) {
        result = await getPublications({
          ...q,
          cursor,
        })

        const items = result.data?.publications?.items
        console.log('[publications] feched page %d with %d items', count, items?.length)
        allData.push(...(items ? items : []))

        cursor = result.data?.publications?.pageInfo.next
        count++
      }

      setFetchPublications({ items: allData, pageInfo: {} })
      setFetchLoading(false)
      console.log('[publications] fetched a total of %d items', allData.length)
      return allData
    } catch (e: any) {
      console.error('[publications] error fetching publications:', e)
      setFetchError(e)
      return []
    } finally {
      setFetchLoading(false)
    }
  }

  return {
    getPublications,
    getAllPublications,
    publications: data?.publications || fetchPublications,
    loading: loading || fetchLoading,
    error: error || fethcError,
  }
}
