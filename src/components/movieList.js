import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../api/movieApi';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NoImage from '../public/noimage.png';

const MovieList = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovies(searchValue)); // busca por search
  }, [dispatch, searchValue]);

  if (loading) return <CircularProgress sx={{ color: '#FCBE11' }}/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        {movies && movies.map((movie) => (
          <Grid item xs={6} md={6} sm={12} key={movie.imdbID}>
            <Card sx={{ display: 'flex', height: 150, overflow: 'hidden', borderRadius: 4, boxShadow: 2, color: 'white', backgroundColor: '#333' }}>
              <CardMedia
                component="img"
                height="100%"
                sx={{ width: 100 }}
                image={movie.Poster !== "N/A" ? movie.Poster : NoImage}
                alt={movie.Title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="#757575">
                  {movie.Type}
                </Typography>
                <Typography variant="body2" color="#757575">
                  {movie.Year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieList;