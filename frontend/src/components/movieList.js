import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../api/movieApi';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../api/favoritesApi';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NoImage from '../public/noimage.png';
import SearchMovieState from './searchMovieState';
import MovieNotFound from './movieNotFound';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './movieList.css'

const MovieList = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state);

  //Favoritos
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(fetchMovies(searchValue)); // busca por search

    carregarFavoritos();
  }, [dispatch, searchValue]);

  const carregarFavoritos = async () => {
    const favoritosData = await fetchFavorites();
    setFavorites(favoritosData);
  };

  const handleAddFavorite = async (movie) => {
      await addToFavorites(movie);
      carregarFavoritos(); // Atualiza lista de favoritos
  };

  const handleRemoveFavorite = async (imdbID,titulo) => {
      await removeFromFavorites(imdbID,titulo);
      carregarFavoritos(); // Atualiza lista de favoritos
  };

  if(searchValue === '') return <SearchMovieState/>;
  if (loading) return <CircularProgress sx={{ color: '#FCBE11' }}/>;
  if (error) return <MovieNotFound/>;

  const filteredMovies = movies?.filter((movie) => movie.Type === 'movie');


  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        {filteredMovies && filteredMovies.map((movie) => (
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
                <div className="subtitulo">
                  <div className="subtitulo-textos">
                    <Typography variant="body2" color="#757575">
                      {movie.Type}
                    </Typography>
                    <Typography variant="body2" color="#757575">
                      {movie.Year}
                    </Typography>
                  </div>


                  {favorites.some(fav => fav.imdb_id === movie.imdbID) ? (
                        <Button variant="contained" color="secondary" size="small" onClick={() => handleRemoveFavorite(movie.imdbID, movie.Title)}>
                            <StarIcon></StarIcon>
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" size="small" onClick={() => handleAddFavorite(movie)}>
                            <StarBorderIcon></StarBorderIcon>
                        </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieList;