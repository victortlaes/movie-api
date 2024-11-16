import React, { useState } from 'react';
import MovieList from './components/movieList.js';
import SearchInput from './components/searchInput.js';
import useDebouncedValue from './hooks/useDebouncedValue';


const App = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 500);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <h1>What’s the Movie?</h1>
      <SearchInput value={search} onChange={handleSearchChange} />
      <p>Você está buscando por: {search}</p>
      <MovieList searchValue={debouncedSearch}/>
    </div>
  );
};

export default App;