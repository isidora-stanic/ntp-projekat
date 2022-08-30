import { Button, CssBaseline, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductService from '../../services/ProductService'
import ReviewService from '../../services/ReviewService'
import ProductTabs from './ProductTabs'
import Carousel from 'react-material-ui-carousel'
import ImageService from '../../services/ImageService'
import { useWishlist } from '../../contexts/WishListContext'
import StatisticsService from '../../services/StatisticsService'


const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    const [images, setImages] = useState([])
    let { id } = useParams()
    useEffect(() => {
        ProductService.getOne(id, setProduct)
        ReviewService.getForProduct(id, setReviews)
        ImageService.getNormal(id, setImages)
    }, [])

    useEffect(() => {
      if (product.id) {
        console.log(product.id)
        StatisticsService.postLog({
          log_type: 'VISIT',
          product_id: Number.parseInt(id),
          timestamp: new Date().toISOString(),
          product: "[" + product.sku + "] " + product.name
        }, 'VISIT')
      }
    }, [product])

    let {wishlist, setWishlist, addProduct, removeProduct, checkIfProductInWishlist} = useWishlist()

    const handleWishlistAdd = () => {
      if (product.id) {
        console.log(product.id)
        StatisticsService.postLog({
          log_type: 'SAVE',
          product_id: Number.parseInt(product.id),
          timestamp: new Date().toISOString(),
          product: "[" + product.sku + "] " + product.name
        }, 'SAVE')
      }
      addProduct(product)
    }

    const handleWishlistRemove = () => {
      removeProduct(product)
    }

  return (
    <div>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* <img src={product.image} alt={product.name + " image"}/> */}
          {/* {images.map(i => (<img key={i} height="40px" width="60px" src={i} alt={product.name + " image"}/>))} */}
          <br />
          <div style={{ marginTop: "5rem", marginLeft: "10rem"}}>
          <Carousel animation="slide" navButtonsAlwaysVisible autoPlay={false}>
          {
              images.map((item, i) => (
                <img key={i} src={item} alt={product.name + " image"}/>
              ))
          }
          </Carousel>
          </div>
        </Grid>
        <Grid item xs={6} sx={{padding: 5}}>
          <Typography color='secondary' sx={{marginTop: 10}}>SKU: {product.sku}</Typography>
          <Typography variant='h4'><b>{product.name}</b></Typography>
          <br/><br/>
          <Typography variant='h3' color='primary'><b>{product.price?.toFixed(2)} RSD/m<sup>2</sup></b></Typography>
          <br/>
          {!checkIfProductInWishlist(product) ? 
          <Button variant="contained" color='secondary' onClick={handleWishlistAdd}>Add to Wishlist</Button> : 
          <Button variant="outlined" color='error' onClick={handleWishlistRemove}>Remove from Wishlist</Button>}
          
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
