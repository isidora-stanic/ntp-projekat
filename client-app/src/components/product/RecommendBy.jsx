import { Avatar, Typography } from '@mui/material'
import React from 'react'
import ProductShort from './ProductShort'
import RecommendIcon from '@mui/icons-material/Recommend';

const RecommendBy = ({by, products}) => {
  return (
    <div>
        <Typography variant='h5' color="primary">
            <Avatar>
            <RecommendIcon/>
            </Avatar>
        {by === "Similar" ? 'Similar products': by === "Filter" ? 'This product combines well with' : 'Our recommendations'}
        </Typography>
      {products.filter((p, i) => i < 5).map((p) => <ProductShort key={p.id} product={p}/>)}
    </div>
  )
}

export default RecommendBy
