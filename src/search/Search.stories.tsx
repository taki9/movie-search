import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Search } from './';

export default {
  title: 'Example/Search',
  component: Search,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Common = Template.bind({});
