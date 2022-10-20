import { useCreateProfile } from '@lenskit/react'

const App = () => {
  const { profileId, error, isLoading, createProfile } = useCreateProfile()
  console.log('profileId', profileId)
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <LensButton /> */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => createProfile('0xa')}
      >
        Create Profile
      </button>
    </div>
  )
}

export default App
