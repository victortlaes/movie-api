import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieReducer';

//criacao do store (armazenamento em memoria do reducer)
const store = configureStore({
  reducer: movieReducer,
});

export default store;