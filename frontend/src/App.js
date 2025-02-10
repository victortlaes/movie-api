import React, { useState } from 'react';
import MovieList from './components/movieList.js';
import SearchInput from './components/searchInput.js';
import useDebouncedValue from './hooks/useDebouncedValue';
import './App.css';


const App = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 500);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <h1>🔎 🎥 Find your movies!</h1>
      <div className="contentApp">
        <div className="searchBox">
          <SearchInput value={search} onChange={handleSearchChange} />
          {/* <p>Você está buscando pelo filme: {search}</p> */}
        </div>

        <div className="filmesBox">
          <MovieList searchValue={debouncedSearch}/>
        </div>
      </div>
    </div>
  );
};

export default App;