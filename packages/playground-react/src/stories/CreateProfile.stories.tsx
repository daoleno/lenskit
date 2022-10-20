import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CreateProfile } from './CreateProfile'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Profile/CreateProfile',
  component: CreateProfile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CreateProfile>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CreateProfile> = (args) => <CreateProfile {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  primary: true,
  label: 'Button',
}
