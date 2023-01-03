'use client'

import LensCalendar from '../components/LensCalendar'
import ProfileStats from '../components/ProfileStats'

const gradients = [
  'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
  'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
  'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
  'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
]
export default function Page() {
  return (
    <div
      className={
        'flex h-screen flex-col items-center justify-center space-y-10 ' + randomGradient()
      }
    >
      <ProfileStats handle="daoleno.lens" />
      <LensCalendar profileId="0x05" />
    </div>
  )
}

function randomGradient() {
  return gradients[Math.floor(Math.random() * gradients.length)]
}
