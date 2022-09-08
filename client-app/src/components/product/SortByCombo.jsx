import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const SortByCombo = ({sortBy, setSortBy}) => {
  return (
        <TextField
            select
            fullWidth
            id="sort_by"
            value={sortBy || 'id asc'}
            label="Sort By"
            onChange={(e) => {setSortBy(e.target.value);}}
            name='sort_by'
            autoComplete="sort_by"
            color="primary"
        >
            <MenuItem value={'id asc'}>Default</MenuItem>
            <MenuItem value={'name asc'}>Name [A-Z]</MenuItem>
            <MenuItem value={'name desc'}>Name [Z-A]</MenuItem>
            <MenuItem value={'price asc'}>Price [cheap first]</MenuItem>
            <MenuItem value={'price desc'}>Price [expensive first]</MenuItem>
        </TextField>
  )
}

export default SortByCombo
