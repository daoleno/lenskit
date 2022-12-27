import { blackA, green, mauve, violet } from '@radix-ui/colors'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import { keyframes } from '@stitches/react'
import { useCreateProfile } from 'hooks'
import { useState } from 'react'
import styled from 'utils/styled'
import Alert from './Alert'
import { ListItem } from './List'

const item = {
  title: 'Create Profile',
  description: 'Create a new profile',
  icon: PlusIcon,
}
const CreateProfileDialog = () => {
  const [handle, setHandle] = useState('lenskit')
  const { createProfile, profileId, loading, error } = useCreateProfile()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ListItem
          icon={<item.icon width={24} height={24} />}
          title={item.title}
          description={item.description}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{item.title}</DialogTitle>
          <Flex
            css={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <svg
              width="100%"
              // height="240"
              viewBox="0 0 536 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_955_3831)">
                <circle
                  cx="266.72"
                  cy="96.5"
                  r="53.5"
                  fill="#E5FFBE"
                  stroke="#00501E"
                  stroke-width="2"
                ></circle>
                <circle
                  cx="266.72"
                  cy="96.5"
                  r="47.5"
                  fill="#E5FFBE"
                  stroke="#00501E"
                  stroke-width="2"
                ></circle>
                <path
                  d="M281.419 84.9477C281.143 85.2248 280.881 85.5092 280.611 85.7937C280.611 85.3998 280.611 85.0133 280.611 84.6195C280.611 84.2257 280.611 83.8173 280.611 83.4162C280.16 66.8613 255.258 66.8613 254.807 83.4162C254.807 83.8149 254.807 84.216 254.807 84.6195C254.807 85.0133 254.807 85.3998 254.807 85.7937C254.538 85.5092 254.276 85.2248 254 84.9477C253.723 84.6706 253.425 84.3788 253.134 84.109C241.127 72.7248 223.524 90.3663 234.883 102.4C235.159 102.684 235.436 102.976 235.72 103.26C249.43 117 267.738 117 267.738 117C267.738 117 286.011 117 299.721 103.26C300.004 102.976 300.281 102.684 300.557 102.4C311.917 90.3663 294.314 72.7248 282.307 84.109C281.994 84.3788 281.71 84.6633 281.419 84.9477Z"
                  fill="#00501E"
                ></path>
                <path
                  d="M266.151 102.865H264.103C264.103 99.8157 261.132 97.3318 257.486 97.3318C253.839 97.3318 250.869 99.8157 250.869 102.865H248.82C248.82 98.6838 252.707 95.2832 257.486 95.2832C262.264 95.2832 266.151 98.6838 266.151 102.865Z"
                  fill="#E5FFBE"
                ></path>
                <path
                  d="M286.981 102.78H284.932C284.932 99.7301 281.964 97.2488 278.315 97.2488C274.666 97.2488 271.698 99.7301 271.698 102.78H269.65C269.65 98.6008 273.537 95.2002 278.315 95.2002C283.094 95.2002 286.981 98.6008 286.981 102.78Z"
                  fill="#E5FFBE"
                ></path>
                <path
                  d="M259.845 102.908C261.473 102.908 262.792 101.589 262.792 99.9611C262.792 98.3333 261.473 97.0137 259.845 97.0137C258.217 97.0137 256.897 98.3333 256.897 99.9611C256.897 101.589 258.217 102.908 259.845 102.908Z"
                  fill="#E5FFBE"
                ></path>
                <path
                  d="M280.739 102.908C282.367 102.908 283.687 101.589 283.687 99.9611C283.687 98.3333 282.367 97.0137 280.739 97.0137C279.112 97.0137 277.792 98.3333 277.792 99.9611C277.792 101.589 279.112 102.908 280.739 102.908Z"
                  fill="#E5FFBE"
                ></path>
                <path
                  d="M268.22 183C249.102 183 247.22 197.772 247.22 199"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M237.22 184C237.22 184 235.068 193 225.138 193C218.22 193 218.22 185.739 218.22 185.739"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M299.22 184C299.22 184 301.374 193 311.303 193C318.22 193 318.22 185.744 318.22 185.744"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M268.22 183C287.34 183 289.22 197.772 289.22 199"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M268.22 177.905C268.22 177.905 263.98 169 252.668 169C235.659 169 238.969 194.597 226.359 200.965C219.3 204.526 202.22 197.325 202.22 215"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M268.22 177.905C268.22 177.905 272.462 169 283.772 169C300.783 169 297.472 194.597 310.083 200.965C317.141 204.526 334.22 197.325 334.22 215"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path d="M268.22 110L268.22 215.5" stroke="#00501E" stroke-width="2"></path>
                <path
                  d="M341.06 68.0059L339.554 72.6723L338.047 68.0059C337.411 66.0335 335.859 64.4818 333.887 63.8452L329.22 62.3333L333.887 60.8271C335.859 60.1905 337.411 58.6388 338.047 56.6665L339.554 52L341.06 56.6665C341.696 58.6388 343.248 60.1905 345.22 60.8271L349.887 62.3333L345.22 63.8396C343.248 64.4818 341.702 66.0279 341.06 68.0059Z"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M327.386 48.3916L326.22 52.0044L325.054 48.3916C324.561 46.8647 323.36 45.6634 321.833 45.1705L318.22 44L321.833 42.8339C323.36 42.341 324.561 41.1397 325.054 39.6128L326.22 36L327.386 39.6128C327.879 41.1397 329.081 42.341 330.607 42.8339L334.22 44L330.607 45.1661C329.081 45.6634 327.884 46.8603 327.386 48.3916Z"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M268.22 134.262C268.817 130.744 270.787 127.609 273.697 125.544C276.606 123.479 280.217 122.655 283.734 123.252C283.137 126.769 281.167 129.905 278.257 131.97C275.348 134.035 271.737 134.859 268.22 134.262V134.262Z"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <line x1="69" y1="158" x2="467" y2="158" stroke="#00501E" stroke-width="2"></line>
                <path
                  d="M115.93 151.27C115.93 167.91 137.12 195.42 165.26 182.55"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M115.76 148.77C115.769 152.564 116.376 156.334 117.56 159.94C118.49 162.968 120.09 165.748 122.241 168.075C124.391 170.402 127.037 172.215 129.983 173.381C132.929 174.546 136.099 175.035 139.26 174.809C142.42 174.584 145.489 173.651 148.24 172.08V172.08"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M66.4199 182.55C94.5699 195.42 115.76 167.91 115.76 151.27"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M115.93 148.77C115.916 152.564 115.309 156.333 114.13 159.94C113.198 162.968 111.597 165.749 109.446 168.075C107.294 170.402 104.647 172.215 101.701 173.381C98.7541 174.546 95.583 175.035 92.4222 174.809C89.2613 174.584 86.1916 173.651 83.4399 172.08V172.08"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M115.76 187.65V148.99"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M138.92 85C137.399 84.9987 135.893 85.2973 134.487 85.8788C133.081 86.4603 131.804 87.3132 130.729 88.3888C129.653 89.4643 128.8 90.7414 128.219 92.147C127.637 93.5525 127.339 95.0589 127.34 96.58C127.34 93.5088 126.12 90.5634 123.948 88.3917C121.777 86.22 118.831 85 115.76 85C112.689 85 109.743 86.22 107.572 88.3917C105.4 90.5634 104.18 93.5088 104.18 96.58C104.18 93.5088 102.96 90.5634 100.788 88.3917C98.6166 86.22 95.6712 85 92.6 85C89.5288 85 86.5834 86.22 84.4117 88.3917C82.24 90.5634 81.02 93.5088 81.02 96.58V113.23C81.02 122.444 84.6801 131.28 91.1951 137.795C97.7101 144.31 106.546 147.97 115.76 147.97C124.973 147.967 133.808 144.306 140.322 137.792C146.836 131.278 150.497 122.443 150.5 113.23V96.58C150.5 93.5088 149.28 90.5634 147.108 88.3917C144.937 86.22 141.991 85 138.92 85V85Z"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M126.9 120.11C126.9 122.62 124.53 124.65 121.61 124.65C118.69 124.65 116.32 122.65 116.32 120.11"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M101.97 114.31C101.97 110.39 105.67 107.21 110.24 107.21C114.81 107.21 118.51 110.39 118.51 114.31"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M124.51 114.22C124.51 110.3 128.21 107.12 132.78 107.12C137.35 107.12 141.05 110.3 141.05 114.22"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M112.79 114.36C114.552 114.36 115.98 112.932 115.98 111.17C115.98 109.409 114.552 107.98 112.79 107.98C111.028 107.98 109.6 109.409 109.6 111.17C109.6 112.932 111.028 114.36 112.79 114.36Z"
                  fill="#00501E"
                ></path>
                <path
                  d="M135.18 114.36C136.942 114.36 138.37 112.932 138.37 111.17C138.37 109.409 136.942 107.98 135.18 107.98C133.418 107.98 131.99 109.409 131.99 111.17C131.99 112.932 133.418 114.36 135.18 114.36Z"
                  fill="#00501E"
                ></path>
                <path
                  d="M416.93 120.99C416.93 123.5 414.56 125.53 411.64 125.53C408.72 125.53 406.35 123.53 406.35 120.99"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M392 115.19C392 111.27 395.7 108.09 400.27 108.09C404.84 108.09 408.54 111.27 408.54 115.19"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M414.54 115.1C414.54 111.18 418.24 108 422.81 108C427.38 108 431.08 111.18 431.08 115.1"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M397.19 115.24C398.952 115.24 400.38 113.812 400.38 112.05C400.38 110.289 398.952 108.86 397.19 108.86C395.428 108.86 394 110.289 394 112.05C394 113.812 395.428 115.24 397.19 115.24Z"
                  fill="#00501E"
                ></path>
                <path
                  d="M419.58 115.24C421.342 115.24 422.77 113.812 422.77 112.05C422.77 110.289 421.342 108.86 419.58 108.86C417.818 108.86 416.39 110.289 416.39 112.05C416.39 113.812 417.818 115.24 419.58 115.24Z"
                  fill="#00501E"
                ></path>
                <path
                  d="M412.51 151.27C412.51 167.91 433.7 195.42 461.84 182.55"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M412.34 148.77C412.349 152.564 412.956 156.334 414.14 159.94C415.07 162.968 416.67 165.748 418.821 168.075C420.971 170.402 423.617 172.215 426.563 173.381C429.509 174.546 432.679 175.035 435.84 174.809C439 174.584 442.069 173.651 444.82 172.08V172.08"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M363 182.55C391.15 195.42 412.34 167.91 412.34 151.27"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M412.51 148.77C412.496 152.564 411.889 156.333 410.71 159.94C409.778 162.968 408.177 165.749 406.026 168.075C403.874 170.402 401.228 172.215 398.281 173.381C395.334 174.546 392.163 175.035 389.002 174.809C385.841 174.584 382.772 173.651 380.02 172.08V172.08"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M412 188L412 148"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M450 110.242C450 105.763 448.24 101.468 445.106 98.3014C441.973 95.1346 437.723 93.3555 433.291 93.3555C431.713 93.3578 430.144 93.587 428.63 94.0361C428.181 89.9028 426.239 86.0824 423.175 83.3076C420.111 80.5327 416.141 78.9988 412.026 79C407.912 78.9988 403.942 80.5327 400.878 83.3076C397.814 86.0824 395.871 89.9028 395.423 94.0361C393.905 93.5869 392.332 93.3578 390.751 93.3555C388.553 93.3499 386.376 93.7826 384.344 94.6287C382.312 95.4748 380.465 96.7177 378.909 98.2863C377.353 99.8549 376.118 101.718 375.276 103.77C374.434 105.821 374 108.021 374 110.242C374 113.801 375.114 117.269 377.181 120.151C379.248 123.033 382.164 125.181 385.511 126.288C383.462 129.146 382.357 132.584 382.354 136.114C382.354 140.592 384.115 144.887 387.248 148.054C390.382 151.221 394.632 153 399.063 153C401.535 153.002 403.977 152.449 406.212 151.381C408.447 150.312 410.418 148.755 411.984 146.822C413.547 148.756 415.517 150.314 417.75 151.383C419.983 152.451 422.424 153.004 424.895 153C427.089 152.997 429.261 152.558 431.287 151.706C433.313 150.855 435.154 149.609 436.703 148.039C438.253 146.469 439.481 144.606 440.319 142.556C441.156 140.506 441.585 138.31 441.582 136.092C441.579 132.56 440.474 129.118 438.426 126.256C441.781 125.163 444.707 123.025 446.786 120.148C448.865 117.272 449.99 113.804 450 110.242V110.242Z"
                  stroke="#00501E"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_955_3831">
                  <rect width="536" height="240" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <Fieldset>
              <Input
                id="handle"
                defaultValue={handle}
                onInput={(e) => setHandle(e.currentTarget.value)}
              />
            </Fieldset>
            <Flex css={{ justifyContent: 'space-between' }}>
              <StyledButton onClick={() => createProfile(handle)}>Create(Mumbai Only)</StyledButton>
            </Flex>
          </Flex>
          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
          {profileId && <Alert color="green">Profile created: {profileId}</Alert>}
          {error && <Alert color="red">{error.message}</Alert>}
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$peas',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
})

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$basil',
  fontSize: 17,
  textTransform: 'uppercase',
})

const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
})

const Flex = styled('div', { display: 'flex' })

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  textTransform: 'uppercase',
  cursor: 'pointer',

  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      basil: {
        backgroundColor: '$basil',
        color: 'white',
        // '&:hover': { backgroundColor: basil.basil9 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: 'basil',
  },
})

interface ButtonProps {
  isLoading?: boolean
  variant?: 'violet' | 'basil' | 'green'
  children: React.ReactNode
  onClick?: () => void
}

const StyledButton: React.FC<ButtonProps> = ({ isLoading, children, ...props }) => {
  return <Button {...props}>{isLoading ? 'isLoading' : children}</Button>
}

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: '$peas' },
  '&:focus': { boxShadow: `0 0 0 2px $colors$basil` },
})

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  justifyContent: 'center',
  width: '40%',
  marginBottom: 15,
})

const Label = styled('label', {
  fontSize: 15,
  color: '$basil',
  width: 90,
  textAlign: 'right',
  fontWeight: 500,
})

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: '$basil',
  boxShadow: '0 0 0 1px $colors$basil',
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px $colors$basil` },
})

export default CreateProfileDialog
