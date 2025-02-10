import React from 'react';
import searchStateSVG from '../public/curiosity search-rafiki.svg';


const SearchMovieState = () => {
  return (
    <div style={{width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <img src={searchStateSVG} alt="Imagem filme não encontrado" />
      <p style={{textAlign: 'center'}}>Não conseguimos encontrar nenhum filme com esse título. Tente palavras diferentes ou verifique se o título está correto.</p>
    </div>
  );
};

export default SearchMovieState;
