import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/movieList.js';
import SearchInput from '../components/searchInput.js';
import useDebouncedValue from '../hooks/useDebouncedValue.js';
import './Busca.css';

const Busca = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, 500);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redireciona se não estiver logado
        }
    }, [navigate]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="Busca">
            <h1>🔎 🎥 Find your movies!</h1>
            <div className="contentApp">
                <div className="searchBox">
                    <SearchInput value={search} onChange={handleSearchChange} />
                    {/* <p>Você está buscando pelo filme: {search}</p> */}
                </div>
                <div className="filmesBox">
                    <MovieList searchValue={debouncedSearch} />
                </div>
            </div>
        </div>
    );
};

export default Busca;