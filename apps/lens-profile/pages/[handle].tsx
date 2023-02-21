import { useProfiles } from '@lenskit/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import ColorPalette from '../components/ColorPalette'
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
  const [currentColor, setCurrentColor] = useState(
    'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'
  )

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

  if (data2022Error || data2023Error || error) {
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
    <div className="mx-auto my-12 mt-12 flex max-w-screen-xl justify-center space-x-12">
      <div className="my-auto rounded-2xl bg-gray-50 py-4 px-3 shadow-md">
        <ColorPalette currentColor={currentColor} onColorSelect={setCurrentColor} />
      </div>

      <div
        className={
          `mx-auto flex h-3/5 w-full flex-col items-center justify-center space-y-10 rounded-2xl px-12 py-12 shadow-2xl md:w-3/5 md:px-3 ` +
          currentColor
        }
      >
        <ProfileStats handle={realhandle} />
        {<LensCalendar year={2023} datapoints={data2023} />}
        {<LensCalendar year={2022} datapoints={data2022} />}
      </div>
    </div>
  )
}
