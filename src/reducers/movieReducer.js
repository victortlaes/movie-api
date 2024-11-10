// src/reducers/movieReducer.js
const initialState = {
  movies: {list:[]},
  selectedMovie: null,
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MOVIES_SUCCESS':
      return { ...state, loading: false, movies: action.payload };
    case 'FETCH_MOVIES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SELECT_MOVIE':
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
