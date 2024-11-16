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
      <h1>Find your movies!</h1>
      <div>
        <SearchInput value={search} onChange={handleSearchChange} />
        <p>Você está buscando pelo filme: {search}</p>
      </div>
      <MovieList searchValue={debouncedSearch}/>
    </div>
  );
};

export default App;