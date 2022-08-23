import React from 'react'
import ShortImage from '../util/ShortImage'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'

const ProductShort = ({product}) => {
  return (
      <Card sx={{ maxWidth: 300, display: 'inline-block', margin: 1, padding: 1}}>
      <CardMedia
        component="img"
        alt={product.name}
        height='250rem'
        width='250rem'
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary">
          {product.price} RSD/m<sup>2</sup>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth color="secondary" >Add To Wishlist</Button>
      </CardActions>
    </Card>
    // </div>
  )
}

export default ProductShort
