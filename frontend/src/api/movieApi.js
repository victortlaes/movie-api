import api from './api';

export const fetchMovies = (title) => async (dispatch) => {
    dispatch({ type: 'FETCH_MOVIES_REQUEST' });

    try {
        const token = localStorage.getItem('token'); // Pegamos o token salvo no login

        const response = await api.get(`/movies/search?title=${title}`, {
            headers: { Authorization: `Bearer ${token}` } // Enviamos o token JWT
        });

        if (response.data.length === 0) {
            dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: 'Nenhum filme encontrado.' });
        } else {
            dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data });
        }
    } catch (error) {
        dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
    }
};

export const addToFavorites = (movie) => async (dispatch) => {
    const token = localStorage.getItem('token');

    try {
        await api.post('/favorites/add', {
            imdb_id: movie.imdbID,
            titulo: movie.Title,
            ano: movie.Year,
            poster_url: movie.Poster
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch({ type: 'ADD_TO_FAVORITES_SUCCESS', payload: movie });
    } catch (error) {
        dispatch({ type: 'ADD_TO_FAVORITES_FAILURE', payload: error.message });
    }
};
