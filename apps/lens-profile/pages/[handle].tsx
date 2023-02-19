import { useProfiles } from '@lenskit/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import LensCalendar from '../components/LensCalendar'
import Placeholder from '../components/Placeholder'
import ProfileStats from '../components/ProfileStats'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
const getPublicationsSummaryAPIURL = (profileIdHex: string, year: number) => {
  // convert hex profileId to decimal
  const profileId = parseInt(profileIdHex, 16)
  const startDate = `${year}-01-01`
  const endDate = `${year}-12-31`
  return `${process.env.NEXT_PUBLIC_POSTGREST_URL}/rpc/get_publications_summary?profile_id=${profileId}&start_date=${startDate}&end_date=${endDate}`
}

export default function Profile() {
  const router = useRouter()
  const handle = router.query.handle?.toString()
  const realhandle =
    handle == 'lensprotocol' ? handle : handle?.endsWith('.lens') ? handle : handle + '.lens'
  const { profiles, loading, error } = useProfiles({ handles: [realhandle] })
  const profileId = profiles && profiles.length > 0 && profiles[0].id

  const { data: data2022, error: data2022Error } = useSWR(
    profileId ? getPublicationsSummaryAPIURL(profileId, 2022) : null,
    fetcher
  )

  const { data: data2023, error: data2023Error } = useSWR(
    profileId ? getPublicationsSummaryAPIURL(profileId, 2023) : null,
    fetcher
  )

  if (loading) {
    return <Placeholder message="loading ..." description="first time loading may take a while" />
  } else if (!profileId) {
    return <Placeholder message="404 | not found" />
  }

  if (data2022Error || data2023Error) {
    return (
      <Placeholder
        message="error | something went wrong"
        description="please try another day. 
        Thanks for your patience, 
        will fix this soon."
      />
    )
  }

  return (
    <div className="mx-auto my-12 mt-12 max-w-screen-xl">
      <div
        className={
          `mx-auto flex h-3/5 w-full flex-col items-center justify-center space-y-10 rounded-2xl px-12 py-12 shadow-2xl md:w-3/5 md:px-3 ` +
          randomGradient()
        }
      >
        <ProfileStats handle={handle} />
        {<LensCalendar datapoints={data2023} />}
        {<LensCalendar datapoints={data2022} />}
      </div>
    </div>
  )
}

const gradients = [
  'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
  'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
  'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
  'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
]

function randomGradient() {
  return gradients[Math.floor(Math.random() * gradients.length)]
}
