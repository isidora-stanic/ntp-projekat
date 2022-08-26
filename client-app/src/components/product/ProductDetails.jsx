import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../../services/ProductService'
import ReviewService from '../../services/ReviewService'
import ProductTabs from './ProductTabs'


const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    let { id } = useParams()
    useEffect(() => {
        ProductService.getOne(id, setProduct)
        ReviewService.getForProduct(id, setReviews)
    }, [])


  return (
    <div>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img src={product.image} alt={product.name + " image"}/>
        </Grid>
        <Grid item xs={6} sx={{padding: 5}}>
          {/* {JSON.stringify(product)} */}
          <Typography color='secondary' sx={{marginTop: 10}}>SKU: {product.sku}</Typography>
          <Typography variant='h4'><b>{product.name}</b></Typography>
          <br/><br/>
          <Typography variant='h3' color='primary'><b>{product.price?.toFixed(2)} RSD/m<sup>2</sup></b></Typography>
          <br/>
          <Button variant="contained" color='secondary'>Add to Wishlist</Button>
        </Grid>
        <Grid item xs={12}>
        <ProductTabs product={product} reviews={reviews} />
        </Grid>
      </Grid>
      {/* <ReviewsList reviews={reviews} /> */}
    </div>
  )
}

export default ProductDetails
