import { ConnectButton } from '@rainbow-me/rainbowkit'
import CreateProfile from '../components/CreateProfile'
import EditProfile from '../components/EditProfile'
import ProfileCard from '../components/ProfileCard'

export default function Home() {
  // grid card layout has split lines
  // place in center of page
  return (
    <div className="mt-10 flex flex-col items-center justify-center py-2">
      <span className="my-10 text-6xl font-bold">LensKit Playground</span>
      <ConnectButton />

      <div className="grid gap-3 grid-cols-3">
        <CreateProfile />
        <EditProfile />
        <ProfileCard />
      </div>
    </div>
  )
}
