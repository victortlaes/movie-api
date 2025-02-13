import api from './api';

export const fetchFavorites = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await api.get('/favorites/list', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        return [];
    }
};

export const addToFavorites = async (movie) => {
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
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);
    }
};

export const removeFromFavorites = async (imdbID, titulo) => {
    const token = localStorage.getItem('token');

    try {
        await api.delete(`/favorites/remove/${imdbID}`, {
            data: { titulo },
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
    }
};
