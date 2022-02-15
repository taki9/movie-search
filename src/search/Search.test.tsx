import { expect, describe, it, afterEach, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '.';
import movies from '../movies';

const renderComponent = () => render(<Search onChange={vi.fn()} />);

describe('Search component', () => {
  afterEach(cleanup);

  it('should match the snapshot', () => {
    const { container } = renderComponent();

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should search for items', () => {
    const { getAllByTestId, getByTestId } = renderComponent();
    const term = 'gl';
    const expectedItems = movies.results.reduce<string[]>((acc, current) => {
      if (current.title.match(new RegExp(term, 'i'))) {
        acc.push(current.title);
      }
      return acc;
    }, []);

    const input = getByTestId('input-field');
    userEvent.type(input, 'gl');
    expect((input as HTMLInputElement).value).toBe('gl');

    const listItems = getAllByTestId('list-item');

    expect(listItems).toHaveLength(2);

    listItems.map((item) => {
      const title = item.querySelector('.MuiListItemText-primary');
      expect(title).toBeTruthy();
      expect(expectedItems).toContain(title!.textContent);
    });
  });
});
