import axios from 'axios';

const API_KEY = '7c56ac3b'; //api que recebi no email OMDB
const API_URL = 'http://www.omdbapi.com/';

export const fetchMovies = (title) => async (dispatch) => {
  dispatch({ type: 'FETCH_MOVIES_REQUEST' });
  try {
    const response = await axios.get(`${API_URL}?s=${title}&apikey=${API_KEY}`);
    console.log(response.data);
    dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data.Search });
  } catch (error) {
    dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
  }
};

export const selectMovie = (movie) => ({
  type: 'SELECT_MOVIE',
  payload: movie,
});