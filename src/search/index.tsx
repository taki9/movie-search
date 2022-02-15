import { Fragment, FunctionComponent, SyntheticEvent, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAutocomplete, { autocompleteClasses, createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { Movie } from '../types';
import movies from '../movies';

const Autocomplete = styled(MuiAutocomplete)(() => ({
  width: 830,
  maxWidth: '100%',
  color: '#111216',

  [`& + .${autocompleteClasses.popper}`]: {
    top: '8px',
    border: '1px solid #272933',
    boxShadow: '4px 4px 0px #272933',

    '&[data-popper-placement="bottom"]': {
      top: '6px !important',
    },

    [`.${autocompleteClasses.listbox}`]: {
      maxHeight: '82vh',

      [`.${autocompleteClasses.option}`]: {
        '&.Mui-focused': {
          backgroundColor: '#F9F9FB',
        },

        '&:active': {
          backgroundColor: 'rgba(226, 227, 233, 0.7)',
        },
      },
    },
  },

  [`& .${autocompleteClasses.inputRoot}`]: {
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '15px',
    borderRadius: '2px',
    backgroundColor: '#F9F9FB',

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D4D6DE',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#272933',
    },

    [`& .${autocompleteClasses.input}`]: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      height: '1.5rem',
      lineHeight: 1.5,
    },
  },
})) as typeof MuiAutocomplete;

export type SearchProps = {
  onChange: (event: SyntheticEvent<Element, Event>, value: Movie | null) => void;
};

export const Search: FunctionComponent<SearchProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filters = createFilterOptions<Movie>({ limit: 5 });

  const filterOptions: typeof filters = (options, state) => {
    const results = filters(options, state);

    if (searchTerm) {
      results.push({
        id: 0,
        title: `See all results for "${searchTerm}"`,
        date_of_release: '',
        rating: 0,
        tags: [],
        director: '',
      });
    }
    return results;
  };

  autocompleteClasses.input;

  return (
    <Autocomplete
      options={movies.results}
      onChange={props.onChange}
      onInputChange={(_event, value) => setSearchTerm(value)}
      filterOptions={filterOptions}
      disablePortal
      getOptionLabel={(option) => (option as Movie).title}
      renderOption={(props, option: Movie) =>
        option.id ? (
          <Fragment key={option.id}>
            <ListItem alignItems="flex-start" data-testid="list-item" {...props}>
              <ListItemAvatar>
                <img alt="poster" src="https://via.placeholder.com/56x82" width="56" style={{ marginRight: '24px' }} />
              </ListItemAvatar>
              <ListItemText
                primary={option.title}
                primaryTypographyProps={{ sx: { margin: '4px 0', fontSize: 22, lineHeight: '28px', color: '#111216' } }}
                secondary={
                  <Fragment>
                    <Typography component="span" sx={{ margin: '4px 0', color: '#111216', letterSpacing: '0.5px' }}>
                      {new Date(option.date_of_release).getFullYear()}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      sx={{ margin: '4px 0', color: '#5C6070', fontSize: 14, letterSpacing: '0.25px' }}
                    >
                      {option.director}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </Fragment>
        ) : (
          <ListItem alignItems="flex-start" {...props} onClick={(event) => event.stopPropagation()}>
            <ListItemText
              primaryTypographyProps={{
                sx: {
                  paddingBottom: '6px',
                  paddingTop: '6px',
                  fontSize: 22,
                  lineHeight: '28px',
                  color: '#111216',
                },
              }}
            >
              {option.title}
            </ListItemText>
          </ListItem>
        )
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: undefined,
          }}
          inputProps={{
            ...params.inputProps,
            ['data-testid']: 'input-field',
          }}
        />
      )}
    />
  );
};
