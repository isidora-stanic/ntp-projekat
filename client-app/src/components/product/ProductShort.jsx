import React, { useEffect, useState } from 'react'
import ShortImage from '../util/ShortImage'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ImageService from '../../services/ImageService'
import { useWishlist } from '../../contexts/WishListContext'


const ProductShort = ({product}) => {
  const [image, setImage] = useState('')

  useEffect(() => {
    ImageService.getMain(product.id, setImage)
  }, [])

  let navigate = useNavigate()
  const handleClick = () => {
    navigate("/product/"+product.id)
  }

  let {wishlist, setWishlist, addProduct, removeProduct, checkIfProductInWishlist} = useWishlist()

    const handleWishlistAdd = (e) => {
      addProduct(product)
    }

    const handleWishlistRemove = (e) => {
      removeProduct(product)
    }


  return (
      <Card sx={{ maxWidth: 300, display: 'inline-block', margin: 1, padding: 1, cursor: 'pointer'}}>
      <CardMedia
        component="img"
        alt={product.name}
        height='250rem'
        width='250rem'
        image={image}
        onClick={handleClick}
      />
      <CardContent onClick={handleClick}>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary">
          {product.price} RSD/m<sup>2</sup>
        </Typography>
      </CardContent>
      <CardActions>
      {!checkIfProductInWishlist(product) ? 
          <Button fullWidth variant="contained" color='secondary' onClick={handleWishlistAdd}>Add to Wishlist</Button> : 
          <Button fullWidth variant="outlined" color='error' onClick={handleWishlistRemove}>Remove from Wishlist</Button>}
          
      </CardActions>
    </Card>
    // </div>
  )
}

export default ProductShort
