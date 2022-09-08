import { Box, Card, CardContent, CardMedia, IconButton, Link, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import TechInfo from './TechInfo'

const ProductSmallInfo = ({product}) => {
    return (
        <Container sx={{marginY: 5}}>
        {product.id ? <Card sx={{ display: 'flex', paddingTop: 2 }}>
            <CardContent sx={{ flex: 'auto' }}>
              <Typography component="div" variant="h5">
                {product.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {product.sku}
              </Typography>
            </CardContent>
        </Card>: <p>Invalid Product ID <br/><Link href="/products" color="secondary">Back to products</Link></p>}
        </Container>
  )
}

export default ProductSmallInfo
