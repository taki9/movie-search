import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MovieSearch } from './';

export default {
  title: 'Example/MovieSearch',
  component: MovieSearch,
} as ComponentMeta<typeof MovieSearch>;

const Template: ComponentStory<typeof MovieSearch> = (args) => <MovieSearch {...args} />;

export const Common = Template.bind({});
