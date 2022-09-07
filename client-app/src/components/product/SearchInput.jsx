import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({searchQuery, setSearchQuery}) => {
  return (
    <>
      <TextField 
      fullWidth
      id="search_query"
      label="Search"
      name="search_query"
      autoComplete="search_query"
      color="primary"
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
              <SearchIcon />
          </InputAdornment>
        )
      }}
      />
    </>
  )
}

export default SearchInput
