import { InputLabel, MenuItem } from '@mui/material'
import { Select } from '@mui/material'
import React from 'react'
import { useWishlist } from '../../contexts/WishListContext'

const SelectTileFormWishList = ({wall, setWall, wallName}) => {
    let { wishlist } = useWishlist()

  return (
    <>
        <InputLabel
            htmlFor={"select-"+wallName.replace(" ", "")} 
            id={"lbl-"+wallName.replace(" ", "")}>
                {wallName}
        </InputLabel>
        <Select required
            fullWidth
            autoComplete={wallName}
            color="primary" 
            id={"select-"+wallName.replace(" ", "")} 
            labelId={"lbl-"+wallName.replace(" ", "")}
            size="small" 
            value={wall} onChange={(e) => setWall(e.target.value)}>
            {wishlist.map(w => (<MenuItem key={w.id} value={w}>{w.name}</MenuItem>))}
        </Select>
    </>
  )
}

export default SelectTileFormWishList
