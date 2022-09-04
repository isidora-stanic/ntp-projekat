import axios from 'axios'
import React from 'react'
import ProductService from '../../services/ProductService'
import FilterGroup from './FilterGroup'
import { Grid, Button, Card } from '@mui/material'
import PriceFilter from './PriceFilter'

const ProductFilters = ({filterOptions, selectedOptions, setSelectedOptions, pageNum, pageSize, setProducts, setTotal, sortBy, searchQuery, prices, setPrices}) => {
  const handleClick = () => {
    ProductService.getFilteredPaginated(pageNum, pageSize, setProducts, setTotal, selectedOptions, searchQuery, sortBy, prices)
  }
  return (
    <Grid item> {/*style={{display: 'inline-block', 
    border: 'solid 0.2rem lightblue', borderRadius: '0.2rem', width: '50%',
    padding: '1rem', overflowWrap: 'break-word'}}*/}
    <Card sx={{m: 5, px: 5, py: 2}}>

      <Button onClick={handleClick} variant='outlined'>Apply Filters</Button>

      <PriceFilter prices={prices} setPrices={setPrices} />
      
      {filterOptions.map(f => <FilterGroup key={f.name} filter={f} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>)}
      
    </Card>
    </Grid>
  )
}

export default ProductFilters
