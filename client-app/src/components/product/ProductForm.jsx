import React, { useEffect } from 'react'
import ProductService from '../../services/ProductService';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "../util/useForm";
import { useNavigate } from "react-router-dom";
import { GridSaveAltIcon } from '@mui/x-data-grid';

const ProductForm = () => {
    let navigate = useNavigate();
    
    const create = (e) => {
        ProductService.create(values);
        navigate({
          pathname: "/products",
        });
      };
    
    const { values, setValues, onChange, onSubmit } = useForm(create, {});

    useEffect(() => {

    },[])

	//ImageSrc    string  `json:"image"`
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <GridSaveAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Edit Product
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                autoComplete="description"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="price"
                label="Price"
                id="price"
                autoComplete="price"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="sku"
                label="SKU"
                id="sku"
                autoComplete="sku"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="producer"
                label="Producer"
                id="producer"
                autoComplete="producer"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="brand"
                label="Brand"
                id="brand"
                autoComplete="brand"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="color"
                label="Color"
                id="color"
                autoComplete="color"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="serie"
                label="Serie"
                id="serie"
                autoComplete="serie"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="finish"
                label="Finish"
                id="finish"
                autoComplete="finish"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="type"
                label="Type"
                id="type"
                autoComplete="type"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="boxSize"
                label="Box size"
                id="boxSize"
                autoComplete="boxSize"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="purpose"
                label="Purpose"
                id="purpose"
                autoComplete="purpose"
                color="primary"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="dimensions"
                label="Dimensions"
                id="dimensions"
                autoComplete="dimensions"
                color="primary"
                onChange={onChange}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ProductForm
