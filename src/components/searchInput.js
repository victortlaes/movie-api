import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
