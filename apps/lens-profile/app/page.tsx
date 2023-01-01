import Image from 'next/image'
import React from 'react'
import { FaComments, FaFile, FaFolder, FaPen, FaRetweet, FaUser, FaUsers } from 'react-icons/fa'

interface ProfileStatsProps {
  name: string
  bio: string
  ownedBy: string
  stats: {
    [key: string]: number
    totalFollowers: number
    totalFollowing: number
    totalPosts: number
    totalComments: number
    totalMirrors: number
    totalPublications: number
    totalCollects: number
  }
}

const statsIcons: any = {
  totalFollowers: <FaUsers />,
  totalFollowing: <FaUser />,
  totalPosts: <FaPen />,
  totalComments: <FaComments />,
  totalMirrors: <FaRetweet />,
  totalPublications: <FaFile />,
  totalCollects: <FaFolder />,
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ name, bio, ownedBy, stats }) => {
  return (
    <div className="bg-peas  mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 rounded-md p-7 shadow-md">
      <div className="col-span-1">
        <div className="text-basil">
          <div className="flex items-center justify-between text-3xl font-bold">
            {name} <div className="bg-basil text-peas rounded-md px-2 py-1">.lens</div>
          </div>
          <div className="mt-3 text-sm">{ownedBy}</div>
          <div className="font-sans leading-tight">{bio}</div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row">
          <div className="mt-4 grid grid-cols-1 gap-4">
            {Object.keys(stats).map((stat: string) => (
              <div className="mt-2 inline-flex items-center" key={stat}>
                {statsIcons[stat] && (
                  <div className="bg-peas flex h-8 w-8 items-center justify-center rounded-full">
                    {statsIcons[stat]}
                  </div>
                )}
                <div className="text-basil ml-2 font-medium capitalize">
                  {stat.split(/(?=[A-Z])/).join(' ')}: {stats[stat]}
                </div>
              </div>
            ))}
          </div>
          <Image
            src="lensgrow.svg"
            alt="Lens Grow"
            width={372}
            height={340}
            className="mt-7 lg:mt-0 lg:ml-10"
          />
        </div>
      </div>
    </div>
  )
}

const demoData = {
  name: 'LensProtocol',
  bio: 'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
  ownedBy: '0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5',
  stats: {
    totalFollowers: 2103,
    totalFollowing: 0,
    totalPosts: 2,
    totalComments: 0,
    totalMirrors: 0,
    totalPublications: 2,
    totalCollects: 1354,
  },
}

export default function Page() {
  return (
    // <div className="from-peas to-lime bg-gradient-to-t">
    <ProfileStats {...demoData} />
    // </div>
  )
}
