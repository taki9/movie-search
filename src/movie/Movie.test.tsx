import { expect, describe, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MovieCard } from '.';
import movies from '../movies';

const movie = movies.results[2];
const renderComponent = () => render(<MovieCard movie={movie} />);

describe('MovieCard component', () => {
  afterEach(cleanup);

  it('should match the snapshot', () => {
    const { container } = renderComponent();

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render the movie title', () => {
    const { getByText } = renderComponent();

    const title = getByText(movie.title.trim());
    expect(title).toBeTruthy();
  });

  it('should render the release year', () => {
    const { getByText } = renderComponent();
    const expectedYear = new Date(movie.date_of_release).getFullYear();

    const year = getByText(expectedYear.toString());

    expect(year).toBeTruthy();
  });
});
