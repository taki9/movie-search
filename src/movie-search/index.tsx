import { FunctionComponent, useState } from 'react';
import { Search } from '../';
import { MovieCard } from '../movie';
import { Movie } from '../types';

export const MovieSearch: FunctionComponent = () => {
  const [active, setActive] = useState<Movie>();

  return (
    <>
      <Search
        onChange={(_event, newValue) => {
          if (!newValue?.id) {
            return;
          }

          setActive(newValue);
        }}
      />

      {active && <MovieCard movie={active} />}
    </>
  );
};
