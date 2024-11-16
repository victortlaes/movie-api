import React, { useState } from 'react';
import MovieList from './components/movieList.js';
import SearchInput from './components/searchInput.js';

const App = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <h1>What’s the Movie?</h1>
      <SearchInput value={search} onChange={handleSearchChange} />
      <p>Você está buscando por: {search}</p>
      <MovieList searchValue={search}/>
    </div>
  );
};

export default App;