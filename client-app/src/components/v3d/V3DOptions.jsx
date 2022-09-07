import { Description } from "@mui/icons-material";
import { Button, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useWishlist } from "../../contexts/WishListContext";
import SelectTileFormWishList from "../wishlist/SelectTileFormWishList";
import axios from "axios";
import { useState } from "react";

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
    let user = useCurrentUser().getCurrentUser()
    let navigate = useNavigate()

    const [w1P, setw1P] = useState(0.0)
    const [w2P, setw2P] = useState(0.0)
    const [w3P, setw3P] = useState(0.0)
    const [w4P, setw4P] = useState(0.0)
    const [w5P, setw5P] = useState(0.0)
    const [w6P, setw6P] = useState(0.0)

    const handleSave = () => {
      let roomSetup = {
        name: "Room",
        description: "Some description",
        user_id: user.id,
        a: abc.a,
        b: abc.b,
        c: abc.c,
        walls: [
          {
            size1: w1.size1, size2: w1.size1,
            wallSize1: abc.b, wallSize2: abc.c,
            bump: w1.bump, image: w1.image, roughness: w1.roughness,
            product_id: w1.id,
            product_name: w1.name,
          },
          {
            size1: w2.size1, size2: w2.size1,
            wallSize1: abc.b, wallSize2: abc.c,
            bump: w2.bump, image: w2.image, roughness: w2.roughness,
            product_id: w2.id,
            product_name: w2.name,
          },
          {
            size1: w3.size1, size2: w3.size1,
            wallSize1: abc.c, wallSize2: abc.a,
            bump: w3.bump, image: w3.image, roughness: w3.roughness,
            product_id: w3.id,
            product_name: w3.name,
          },
          {
            size1: w4.size1, size2: w4.size1,
            wallSize1: abc.c, wallSize2: abc.a,
            bump: w4.bump, image: w4.image, roughness: w4.roughness,
            product_id: w4.id,
            product_name: w4.name,
          },
          {
            size1: w5.size1, size2: w5.size1,
            wallSize1: abc.b, wallSize2: abc.a,
            bump: w5.bump, image: w5.image, roughness: w5.roughness,
            product_id: w5.id,
            product_name: w5.name,
          },
          {
            size1: w6.size1, size2: w6.size1,
            wallSize1: abc.b, wallSize2: abc.a,
            bump: w6.bump, image: w6.image, roughness: w6.roughness,
            product_id: w6.id,
            product_name: w6.name,
          }
        ]
      }
      axios.post("http://localhost:9091/api/v3d/rooms", roomSetup)
        .then(r => {
          console.log(r)
          navigate("/")
        })
    }

  return (
    <div style={{ margin: 25 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Dimensions</Typography></Grid>
        <Grid item xs={12}>
        <TextField
          label="Height [cm]"
          type="number"
          size="small"
          value={abc.b}
          onChange={(e) => setAbc({ ...abc, b: e.target.value })}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
          label="Width [cm]"
          type="number"
          size="small"
          value={abc.a}
          onChange={(e) => setAbc({ ...abc, a: e.target.value })}
        />
        </Grid>
        <Grid item xs={12}>
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
              <SelectTileFormWishList wall={w2} setWall={setW2} wallName='Left Wall' size={[abc.b, abc.c]} setWallPrice={setw2P} wallPrice={w2P} />
              <SelectTileFormWishList wall={w1} setWall={setW1} wallName='Right Wall' size={[abc.b, abc.c]} setWallPrice={setw1P} wallPrice={w1P} />
              <SelectTileFormWishList wall={w6} setWall={setW6} wallName='Front Wall' size={[abc.b, abc.a]} setWallPrice={setw6P} wallPrice={w6P} />
              <SelectTileFormWishList wall={w5} setWall={setW5} wallName='Back Wall' size={[abc.b, abc.a]} setWallPrice={setw5P} wallPrice={w5P} />
              {/* <SelectTileFormWishList wall={w3} setWall={setW3} wallName='Ceiling' /> */}
              <SelectTileFormWishList wall={w4} setWall={setW4} wallName='Floor' size={[abc.c, abc.a]} setWallPrice={setw4P} wallPrice={w4P} />
            </>) : 
            <>
              <Typography color='warning.main'>Nothing is in wishlist</Typography>
              <Link href="/">See all products</Link>
            </>}
        </Grid>

        {/* <Grid item xs={12}><hr/></Grid> */}
        <Grid item xs={12}>
        {wishlist.length > 0 ? w1P ? <Typography>Total Price: {w1P + w2P + w4P + w5P + w6P} RSD</Typography>:<></> : <></>}
        </Grid>

        {/* <Grid item xs={12}><hr/></Grid> */}

        <Grid item xs={12}>
        { wishlist.length !== 0 && user.id != null ? <Button variant="contained" color="secondary" onClick={handleSave}>Save Room setup</Button>: <></> }
        </Grid>
        
      </Grid>
    </div>
  );
};

export default V3DOptions;
