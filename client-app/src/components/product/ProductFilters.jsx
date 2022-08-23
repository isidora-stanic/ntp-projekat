import axios from 'axios'
import React from 'react'
import ProductService from '../../services/ProductService'
import FilterGroup from './FilterGroup'
import { Grid, Button } from '@mui/material'

const ProductFilters = ({filterOptions, selectedOptions, setSelectedOptions, pageNum, pageSize, setProducts, setTotal}) => {
  const handleClick = () => {
    console.log('sending...', JSON.stringify(selectedOptions))
    ProductService.getFilteredPaginated(pageNum, pageSize, setProducts, setTotal, selectedOptions)
  }
  return (
    <Grid item xs> {/*style={{display: 'inline-block', 
    border: 'solid 0.2rem lightblue', borderRadius: '0.2rem', width: '50%',
    padding: '1rem', overflowWrap: 'break-word'}}*/}
      <Button onClick={handleClick} variant='outlined'>Apply Filters</Button>
      {filterOptions.map(f => <FilterGroup key={f.name} filter={f} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>)}
    </Grid>
  )
}

export default ProductFilters
