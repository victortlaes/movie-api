import api from './api';

export const fetchMovies = (title) => async (dispatch) => {
    dispatch({ type: 'FETCH_MOVIES_REQUEST' });

    try {
        const token = localStorage.getItem('token');

        const response = await api.get(`/movies/search?title=${title}`, {
            headers: { Authorization: `Bearer ${token}` }
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