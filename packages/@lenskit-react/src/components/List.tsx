import styled from 'utils/styled'
import { Flex } from './LensKitButton'

export const List = styled('ul', {
  display: 'grid',
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: 'none',
  // variants: {
  //   layout: {
  // one: {
  //   '@media only screen and (min-width: 600px)': {
  //     width: 500,
  //     gridTemplateColumns: '.75fr 1fr',
  //   },
  // },
  // two: {
  //   '@media only screen and (min-width: 600px)': {
  //     width: 600,
  //     gridAutoFlow: 'column',
  //     gridTemplateRows: 'repeat(3, 1fr)',
  //   },
  // },
  //   },
  // },
  // defaultVariants: {
  //   layout: 'one',
  // },
})

export type ListItemProps = {
  icon: any
  title: string
  description?: string
}

export const ListItem = (props: ListItemProps) => (
  <Flex>
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemLink {...props}>
      <ListItemHeading>{props.title}</ListItemHeading>
      <ListItemText>{props.description}</ListItemText>
    </ListItemLink>
  </Flex>
)
export const ListItemLink = styled('a', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  outline: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  padding: 12,
  borderRadius: 6,
  fontSize: 15,
  lineHeight: 1,
  '&:hover': { cursor: 'pointer', boxShadow: `0 0 0 2px $lime` },
})
const ListItemIcon = styled('div', {
  color: '$basil',
  height: 40,
  width: 60,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // '@sm': { height: 48, width: 48 },
})
const ListItemHeading = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: '$basil',
})
const ListItemText = styled('p', {
  all: 'unset',
  color: '$basil',
  lineHeight: 1.4,
  fontWeight: 'initial',
})
