import React, { useEffect, useState } from 'react'
import ProductShort from './ProductShort'
import Pagination from '@mui/material/Pagination'
import { Grid, Container } from '@mui/material'

const ProductShortList = ({products, total, pageSize, pageNum, setPageNum}) => {
  const totalPageNum = Math.ceil(total/pageSize)
  return (
        <div>
          <Grid item xs={8}>
            {products.map(p => <ProductShort key={p.id} product={p}/>)}
          </Grid>
      <Pagination 
        count={totalPageNum} 
        page={pageNum} 
        onChange={(e, v) => setPageNum(v)} 
        shape="rounded" 
        size="large" 
        color='secondary' 
        showFirstButton showLastButton />
    </div>
    
  )
}

export default ProductShortList
