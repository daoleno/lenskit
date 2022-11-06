import { ConnectButton } from '@rainbow-me/rainbowkit'
import CreateProfile from '../components/CreateProfile'

export default function Home() {
  // grid card layout has split lines
  // place in center of page
  return (
    <div className="mt-10 flex flex-col items-center justify-center py-2">
      <span className="my-10 text-6xl font-bold">LensKit Playground</span>
      <ConnectButton />

      <div className="grid max-w-4xl grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <FeatureCard> */}
        <CreateProfile />
        {/* </FeatureCard> */}
        {/* <FeatureCard>
          <EditProfile />
        </FeatureCard> */}
      </div>
    </div>
  )
}
