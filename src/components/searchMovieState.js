import React from 'react';
import searchStateSVG from '../public/Film rolls-rafiki.svg';


const SearchMovieState = ({}) => {
  return (
    <div style={{width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <img src={searchStateSVG} alt="Imagem empty state" />
      <p style={{textAlign: 'center'}}>Utilize a barra de busca para pesquisar seu filme!</p>
    </div>
  );
};

export default SearchMovieState;
