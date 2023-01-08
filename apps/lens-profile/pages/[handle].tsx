import { useProfiles } from '@lenskit/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import LensCalendar from '../components/LensCalendar'
import Placeholder from '../components/Placeholder'
import ProfileStats from '../components/ProfileStats'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Profile() {
  const router = useRouter()
  const { handle } = router.query
  const { profiles, loading, error } = useProfiles({ handles: [handle] })
  const profileId = profiles && profiles.length > 0 && profiles[0].id
  const { data: data2022 } = useSWR(
    profileId && `/api/datapoints?profileId=${profileId}&year=2022`,
    fetcher
  )
  const { data: data2023 } = useSWR(
    profileId && `/api/datapoints?profileId=${profileId}&year=2023`,
    fetcher
  )

  if (loading) {
    return <Placeholder message="loading ..." />
  }

  if (!profiles || profiles.length == 0) {
    return (
      <div className={'h-full pb-24 ' + randomGradient()}>
        <Placeholder message="404 | not found" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div
        className={
          `mx-12 flex h-full flex-col items-center justify-center space-y-10 py-32 md:mx-auto ` +
          randomGradient()
        }
      >
        <ProfileStats handle={handle as string} />
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
