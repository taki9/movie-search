import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { Movie } from '../types';

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard: FunctionComponent<MovieCardProps> = ({ movie }) => {
  return (
    <Card elevation={0} sx={{ marginTop: '2.5rem', maxWidth: 830 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia component="img" height="450" image="https://via.placeholder.com/300x450" alt="poster" />
        <CardContent sx={{ padding: { xs: '1rem 0', md: '0 0 0 1.5rem' } }}>
          <Typography gutterBottom component="h2" sx={{ fontSize: '45px', lineHeight: '52px' }}>
            {movie.title}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            spacing={{ xs: 1, sm: 2 }}
            divider={<Box sx={{ height: '4px', width: '4px', backgroundColor: '#272933', borderRadius: '50%' }} />}
            sx={{ marginTop: '1rem', marginBottom: '2rem' }}
          >
            <Typography>{new Date(movie.date_of_release).getFullYear()}</Typography>
            <Typography>PG</Typography>
            <Typography>2h 7m</Typography>
          </Stack>

          <Typography variant="body1" sx={{ letterSpacing: '0.15px' }}>
            In Steven Spielberg&apos;s massive blockbuster, paleontologists Alan Grant (Sam Neill) and Ellie Sattler
            (Laura Dern) and mathematician Ian Malcolm (Jeff Goldblum) are among a select group chosen to tour an island
            theme park populated by dinosaurs created from prehistoric DNA. While the park&apos;s mastermind,
            billionaire John Hammond (Richard Attenborough), assures everyone that the facility is safe, they find out
            otherwise when various ferocious predators break free and go on the hunt.
          </Typography>

          {movie.tags.length && (
            <Stack direction="row" spacing={2} sx={{ marginTop: '2rem' }}>
              {movie.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{ marginBottom: '6px', backgroundColor: '#FFAA00', letterSpacing: '0.4px' }}
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </Box>
    </Card>
  );
};
