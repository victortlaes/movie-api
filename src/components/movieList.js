import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../api/movieApi';
import CircularProgress from '@mui/material/CircularProgress';

const MovieList = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovies(searchValue)); // busca por search
  }, [dispatch, searchValue]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <h2>Movies</h2> */}
      <ul>
        {movies && movies.map((movie) => (
          <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;