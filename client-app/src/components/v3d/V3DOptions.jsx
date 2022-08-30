import { Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useWishlist } from "../../contexts/WishListContext";
import SelectTileFormWishList from "../wishlist/SelectTileFormWishList";

const V3DOptions = ({
  abc,
  setAbc,
  w1,
  w2,
  w3,
  w4,
  w5,
  w6,
  setW1,
  setW2,
  setW3,
  setW4,
  setW5,
  setW6,
}) => {


    let { wishlist } = useWishlist()

  return (
    <div style={{ margin: 50 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}><Typography>Dimensions</Typography></Grid>
        <Grid item>
        <TextField
          label="Height [cm]"
          type="number"
          size="small"
          value={abc.b}
          onChange={(e) => setAbc({ ...abc, b: e.target.value })}
        />
        </Grid>
        <Grid item>
        <TextField
          label="Width [cm]"
          type="number"
          size="small"
          value={abc.a}
          onChange={(e) => setAbc({ ...abc, a: e.target.value })}
        />
        </Grid>
        <Grid item>
        <TextField
          label="Depth [cm]"
          type="number"
          size="small"
          value={abc.c}
          onChange={(e) => setAbc({ ...abc, c: e.target.value })}
        />
        </Grid>
        <Grid item xs={12}><hr/></Grid>

        
        <Grid item xs={12}>
            {wishlist.length > 0 ?
            (<>
            <SelectTileFormWishList wall={w1} setWall={setW1} wallName='Wall 1' />
            <SelectTileFormWishList wall={w2} setWall={setW2} wallName='Wall 2' />
            <SelectTileFormWishList wall={w3} setWall={setW3} wallName='Wall 3' />
            <SelectTileFormWishList wall={w4} setWall={setW4} wallName='Wall 4' />
            <SelectTileFormWishList wall={w5} setWall={setW5} wallName='Wall 5' />
            <SelectTileFormWishList wall={w6} setWall={setW6} wallName='Wall 6' />
            </>) : 
            <Typography color='warning.main'>Nothing is in wishlist</Typography>}
        </Grid>
        
      </Grid>
    </div>
  );
};

export default V3DOptions;
