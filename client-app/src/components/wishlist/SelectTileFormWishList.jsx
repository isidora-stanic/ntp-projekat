import { InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import { Select } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useWishlist } from '../../contexts/WishListContext'

const SelectTileFormWishList = ({wall, setWall, wallName, size, wallPrice, setWallPrice}) => {
    let { wishlist } = useWishlist()

    useEffect(() => {
      if (!wall.id) {
        console.log(wishlist[0])
        setWall({...wishlist[0], totalPrice: (Math.ceil((size[0]/100 * size[1]/100)/wall.box_size) * wall.price)})
      } else {
        setWallPrice(Math.ceil((size[0]/100 * size[1]/100)/wall.box_size) * wall.price)
      }
      
    }, [])

    useEffect(() => {
      // console.log(wall)
    }, [wall])

  return (
    <>
        <TextField required
        select
        sx={{my: 1, display: 'inline-block'}}
            fullWidth
            autoComplete={wallName}
            color="primary" 
            id={"select-"+wallName.replace(" ", "")} 
            labelId={"lbl-"+wallName.replace(" ", "")}
            label={wallName}
            size="small" 
            value={JSON.stringify(wall)} onChange={(e) => setWall(JSON.parse(e.target.value))}>
            {wishlist.map(w => (<MenuItem key={w.id} value={JSON.stringify(w)}>{w.name}</MenuItem>))}
        </TextField>
        {/* <Typography>You'll need {Math.ceil((size[0]/100 * size[1]/100)/wall.box_size)} boxes</Typography> */}
        {/* <br/> */}
        <Typography>{Math.ceil((size[0]/100 * size[1]/100)/wall.box_size)} boxes x {wall.price.toFixed(2)}RSD = {wallPrice?.toFixed(2)} RSD</Typography>
    </>
  )
}

export default SelectTileFormWishList
