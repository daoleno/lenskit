'use client'
import {
  ChatBubbleLeftIcon,
  DocumentIcon,
  FolderIcon,
  ForwardIcon,
  PencilIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { useProfiles } from '@lenskit/react'
import Image from 'next/image'

interface ProfileStatsProps {
  handle?: string
  profileId?: string
  ownedBy?: string
}
const statsIcons: any = {
  totalFollowers: <UsersIcon />,
  totalFollowing: <UserIcon />,
  totalPosts: <PencilIcon />,
  totalComments: <ChatBubbleLeftIcon />,
  totalMirrors: <ForwardIcon />,
  totalPublications: <DocumentIcon />,
  totalCollects: <FolderIcon />,
}

const ipfsGateway = 'https://lens.infura-ipfs.io'
const ProfileStats: React.FC<ProfileStatsProps> = ({ handle, profileId, ownedBy }) => {
  if (!profileId && !handle && !ownedBy) {
    throw new Error('Must provide one of handle, profileId, or ownedBy')
  }

  let queryOptions: any = {}
  if (handle) {
    queryOptions.handles = handle
  } else if (profileId) {
    queryOptions.profileIds = profileId
  } else if (ownedBy) {
    queryOptions.ownedBy = ownedBy
  }

  const { profiles, loading, error } = useProfiles(queryOptions)
  const profile = profiles?.[0]

  if (loading || !profile) {
    return <></>
  }

  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 rounded-2xl bg-gradient-to-br from-lime-50 to-teal-100  p-7 shadow-md">
      <div className="col-span-1">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  className="rounded-full"
                  // @ts-ignore
                  src={getIPFSURL(profile?.picture?.original?.url) || '/profile.png'}
                  alt=""
                  width={64}
                  height={64}
                  placeholder="blur"
                  blurDataURL="/profile.png"
                  unoptimized
                />
                <span className="absolute inset-0 rounded-full" aria-hidden="true" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm font-medium text-gray-700">{profile.bio}</p>
            </div>
          </div>
          <div className="bg-basil text-peas rounded-md px-2 py-1 text-2xl">{profile.handle}</div>
        </div>

        <div className="ml-12 flex flex-col items-center sm:flex-row">
          <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-1">
            {Object.keys(profile.stats)
              .filter((stat: string) => (stat === '__typename' ? false : true))
              .map((stat: string) => (
                <div className="flex w-full items-center justify-between" key={stat}>
                  <div className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full text-teal-600">
                      {statsIcons[stat]}
                    </div>
                    <div className="font-semibold capitalize text-teal-700">
                      {stat.replace(/([A-Z])/g, ' $1').trim()}:
                    </div>
                  </div>
                  <span className="ml-3 font-semibold text-teal-700">
                    {/* @ts-ignore */}
                    {formatNumber(profile.stats[stat])}
                  </span>
                </div>
              ))}
          </div>
          <div className="mx-auto mt-3">
            <CircleProgressBar level={publicationsCountToLevel(profile.stats.totalPublications)} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface CircleProgressBarProps {
  level: string // A value between S+、S、A++、A+、B+
}
export const CircleProgressBar: React.FC<CircleProgressBarProps> = (props) => {
  const progress = levelToProgress(props.level)
  const radius = 100 // The radius of the circle
  const circumference = 2 * Math.PI * radius // The circumference of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference // The length of the progress bar
  const stroke = 15
  const normalizedRadius = radius - stroke * 2

  return (
    <div className="inline-flex  transform items-center justify-center overflow-hidden rounded-full">
      <svg
        width={2 * radius}
        height={2 * radius}
        className="transition-transform duration-500 hover:rotate-90"
      >
        <circle
          className="text-green-300"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="text-green-500"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="text-basil absolute text-3xl font-extrabold transition-transform duration-500 hover:scale-125">
        {props.level}
      </span>
    </div>
  )
}

// url: ipfs://bafybeiewog3iscltj6uvus6iut5kerbbkyxovjhvnikrc4luy5sap6w3zu
function getIPFSURL(url: string) {
  if (url && url.startsWith('ipfs://')) {
    const cid = url.replace('ipfs://', '')
    return `${ipfsGateway}/ipfs/${cid}`
  }
  return url
}

function formatNumber(num: number): string {
  let formattedNumber = num.toLocaleString('en-US')
  if (num >= 1000) {
    formattedNumber = (num / 1000).toFixed(1) + 'K'
  }
  if (num >= 1000000) {
    formattedNumber = (num / 1000000).toFixed(1) + 'M'
  }
  return formattedNumber
}

function levelToProgress(level: string) {
  switch (level) {
    case 'S+':
      return 100
    case 'S':
      return 80
    case 'A++':
      return 60
    case 'A+':
      return 40
    case 'B+':
      return 20
    default:
      return 0
  }
}

function publicationsCountToLevel(count: number) {
  if (count >= 1000) {
    return 'S+'
  }
  if (count >= 500) {
    return 'S'
  }
  if (count >= 100) {
    return 'A++'
  }
  if (count >= 50) {
    return 'A+'
  }
  return 'B+'
}

export default ProfileStats
