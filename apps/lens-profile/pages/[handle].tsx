import { useProfiles } from '@lenskit/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import LensCalendar from '../components/LensCalendar'
import Placeholder from '../components/Placeholder'
import ProfileStats from '../components/ProfileStats'
import { fetchDataPoints } from '../lib/datapoints'

export default function Profile() {
  const router = useRouter()
  const handle = router.query.handle?.toString()
  const realhandle =
    handle == 'lensprotocol' ? handle : handle?.endsWith('.lens') ? handle : handle + '.lens'
  const { profiles, loading, error } = useProfiles({ handles: [realhandle] })
  const profileId = profiles && profiles.length > 0 && profiles[0].id

  const { data: data2022 } = useSWR(profileId ? [profileId, 2022] : null, ([profileId, year]) =>
    fetchDataPoints(profileId, year)
  )

  const { data: data2023 } = useSWR(profileId ? [profileId, 2023] : null, ([profileId, year]) =>
    fetchDataPoints(profileId, year)
  )

  if (loading || !data2022 || !data2023) {
    return <Placeholder message="loading ..." description="first time loading may take a while" />
  }

  if (!profiles || profiles.length == 0) {
    return (
      <div className={'h-full pb-24'}>
        <Placeholder message="404 | not found" />
      </div>
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
        <ProfileStats handle={realhandle} />
        {data2023 && <LensCalendar profileId={profileId} year={2023} datapoints={data2023} />}
        {data2022 && <LensCalendar profileId={profileId} year={2022} datapoints={data2022} />}
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
