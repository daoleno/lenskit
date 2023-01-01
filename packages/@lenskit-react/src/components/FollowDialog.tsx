import * as Dialog from '@radix-ui/react-dialog'
import { AvatarIcon, Cross2Icon } from '@radix-ui/react-icons'
import { useFollow, useProfile, useUnfollow } from 'hooks'
import Alert from './Alert'

const item = {
  title: 'Follow',
  description: 'Follow your favorite creators',
  icon: AvatarIcon,
}

interface FollowDialogProps {
  handle?: string
  profileId?: string
}

const FollowDialog = (props: FollowDialogProps) => {
  const { handle, profileId } = props
  const { profile, loading, error } = useProfile({ handle, profileId })
  const { follow, tx: followTx, loading: followLoading, error: followError } = useFollow()
  const { unfollow, tx: unfollowTx, loading: unfollowLoading, error: unfollowError } = useUnfollow()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          key={item.title}
          className="-m-3 flex cursor-pointer items-center rounded-lg p-2 transition duration-150 ease-in-out hover:ring-1 hover:ring-gray-500 hover:ring-offset-2"
        >
          <div className="text-basil flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
            <item.icon aria-hidden="true" className="h-6 w-6" />
          </div>
          <div className="ml-4 flex flex-col items-start">
            <p className="text-basil text-sm font-medium">{item.title}</p>
            <p className="text-basil text-sm">{item.description}</p>
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="bg-peas fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl p-6 shadow-xl">
          <div className="flex w-full flex-row items-center justify-between">
            <Dialog.Title className="text-basil font-xl uppercase">{item.title}</Dialog.Title>
            <Dialog.Close>
              <div
                aria-label="Close"
                className="text-basil h-6 w-6 cursor-pointer hover:text-opacity-70"
              >
                <Cross2Icon />
              </div>
            </Dialog.Close>
          </div>
          <Dialog.Description>
            <div className="flex cursor-pointer flex-col justify-between space-y-4 rounded-xl p-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <img src="lens/profile-4.png" alt="" className="h-24 w-24 rounded-full" />
                {/* handle */}
                <span className="text-basil text-lg font-bold">{profile?.handle}</span>
                <div className="flex flex-row gap-2">
                  <span className="text-basil  text-lg">
                    {profile?.stats?.totalFollowers} followers
                  </span>
                  <span className="text-basil  text-lg">
                    {profile?.stats?.totalFollowing} following
                  </span>
                </div>
                <button
                  className="bg-basil text-peas focus:ring-basil mx-auto mt-3 flex items-center gap-2 rounded-2xl px-6 py-3 uppercase focus:ring-1"
                  onClick={
                    followTx && followTx.transactionHash
                      ? () => unfollow(profile?.id)
                      : () => follow(profile?.id)
                  }
                >
                  {(followLoading || unfollowLoading) && (
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {followTx && followTx.transactionHash ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>
          </Dialog.Description>
          {error && <Alert color="red">{error.message}</Alert>}
          {followError && <Alert color="red">{followError.message}</Alert>}
          {unfollowError && <Alert color="red">{unfollowError.message}</Alert>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FollowDialog
