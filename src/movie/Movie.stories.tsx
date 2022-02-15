import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieCard } from './';
import movies from '../movies';

export default {
  title: 'Example/MovieCard',
  component: MovieCard,
  args: {
    movie: movies.results[1],
  },
} as ComponentMeta<typeof MovieCard>;

const Template: ComponentStory<typeof MovieCard> = (args) => <MovieCard {...args} />;

export const Common = Template.bind({});
