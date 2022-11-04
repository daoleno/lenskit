import { useCreateProfile } from '@lenskit/react'
import { useState } from 'react'

export default function CreateProfile() {
  const { createProfile, profileId, error } = useCreateProfile()
  const [handle, setHandle] = useState('')

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="text-2xl font-bold">Create a Profile</div>
      {error && <div className="text-red-500">error: {error.message}</div>}
      {profileId && <div className="text-green-500">profileId: {profileId}</div>}
      <span className="text-gray-600">Enter a handle to create a profile</span>
      <input
        className="rounded border p-2"
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => createProfile(handle)}
      >
        {profileId ? 'Creating...' : 'Create'}
      </button>
    </div>
  )
}
