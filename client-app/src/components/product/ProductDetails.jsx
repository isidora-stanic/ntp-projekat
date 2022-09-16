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
import ProductShortList from './ProductShortList'
import ProductShort from './ProductShort'
import RecommendationService from '../../services/RecommendationService'
import RecommendBy from '../recommendation/RecommendBy'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { useRef } from 'react'
import RecommendBox from '../recommendation/RecommendBox'


const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    const [images, setImages] = useState([])
    

    let { getCurrentUser } = useCurrentUser()
    const [sub, setSub] = useState({})

    let { id } = useParams()
    useEffect(() => {
        ProductService.getOne(id, setProduct)
        ReviewService.getForProduct(id, setReviews)
        ImageService.getNormal(id, setImages)
    }, [])

    const ref = useRef(false);

    useEffect(() => {
      if (product.id && ref.current === false) {
        // console.log(product.id)
        StatisticsService.postLog({
          log_type: 'VISIT',
          product_id: Number.parseInt(id),
          timestamp: new Date().toISOString(),
          product: product.name
        }, 'VISIT')

        if (getCurrentUser().email) {
          ProductService.getSubscription(product.id, getCurrentUser().email, setSub)
        }
        return () => {
          console.log('unmounted')
          ref.current = true
        }
      }
    }, [product])

    let {wishlist, setWishlist, addProduct, removeProduct, checkIfProductInWishlist} = useWishlist()


    const handleWishlistAdd = () => {
      // if (product.id) {
      //   // console.log(product.id)
      //   // StatisticsService.postLog({
      //   //   log_type: 'SAVE',
      //   //   product_id: Number.parseInt(product.id),
      //   //   timestamp: new Date().toISOString(),
      //   //   product: "[" + product.sku + "] " + product.name
      //   // }, 'SAVE')
      // }
      addProduct(product)
    }

    const handleWishlistRemove = () => {
      removeProduct(product)
    }

    const getSub = () => {
      ProductService.getSubscription(product.id, getCurrentUser().email, setSub)
    }
    const emptySub = () => {
      setSub({})
    }

    const handleSubscribe = () => {
      ProductService.subscribe(product.id, getCurrentUser().email, getSub)
    }

    const handleUnsubscribe = () => {
      ProductService.unsubscribe(sub.id, emptySub)
    }

  return (
    <div>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
          {product.price ? <><Typography variant='h3' color='primary'><b>{(product.price * (1/product.box_size)).toFixed(2)} RSD/m<sup>2</sup></b></Typography>
          <Typography variant='h5' color='secondary'><b>{(product.price).toFixed(2)} RSD per box</b></Typography></> : <></>}
          
          <br/>
          {!checkIfProductInWishlist(product) ? 
          <Button variant="contained" color='secondary' onClick={handleWishlistAdd}>Add to Wishlist</Button> : 
          <Button variant="outlined" color='error' onClick={handleWishlistRemove}>Remove from Wishlist</Button>}

          {!sub.email ? 
          <Button variant="contained" color='secondary' onClick={handleSubscribe}>Subscribe</Button> : 
          <Button variant="outlined" color='error' onClick={handleUnsubscribe}>Unsubscribe</Button>
          }
          
        </Grid>
        <Grid item xs={12}>
        <ProductTabs product={product} reviews={reviews} />
        </Grid>
        <Grid item xs={12}>
          <RecommendBox product={product} />
        </Grid>
      </Grid>
      {/* <ReviewsList reviews={reviews} /> */}
    </div>
  )
}

export default ProductDetails
