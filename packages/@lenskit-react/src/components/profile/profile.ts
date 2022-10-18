import { useSyncRefs } from 'hooks/use-sync-refs'
import { ElementType, Fragment, Ref } from 'react'
import { Props } from 'types'
import { forwardRefWithAs, render } from 'utils/render'

let DEFAULT_ProfileCreation_TAG = Fragment

type ProfileCreationWeControl = 'id' | 'ref' | 'onClick'

export let ProfileCreation = forwardRefWithAs(function ProfileCreation<
  TTag extends ElementType = typeof DEFAULT_ProfileCreation_TAG
>(
  props: Props<TTag, ProfileCreationWeControl> & {
    handle: string
    isLoading?: boolean
  },
  ref: Ref<HTMLElement>
) {
  let id = `profile-${props.handle}`
  let profileCreationRef = useSyncRefs(ref)
  let handleClick = async () => {
    const profileId = await createProfile(handle)
  }

  let theirProps = props
  let ourProps = { ref: profileCreationRef, id, onClick: handleClick }

  return render({
    ourProps,
    theirProps,
    defaultTag: DEFAULT_ProfileCreation_TAG,
    name: 'ProfileCreation',
  })
})
