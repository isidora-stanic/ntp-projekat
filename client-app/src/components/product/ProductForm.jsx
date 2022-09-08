import React, { useEffect } from 'react'
import ProductService from '../../services/ProductService';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "../util/useForm";
import { useNavigate, useParams } from "react-router-dom";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ImageUpload from '../image-upload/ImageUpload';

const ProductForm = () => {
    let navigate = useNavigate();
    let {id} = useParams()
    let isAddMode = !id
    
    const create = (e) => {
      if (isAddMode) {
        console.log('sending', {...values, price: parseFloat(values.price)})
        ProductService.create({...values, 
          price: parseFloat(values.price), 
          box_size: parseFloat(values.box_size)})
      } else {
        console.log('sending', {...values, price: parseFloat(values.price)})
        ProductService.update(id, {...values, 
          price: parseFloat(values.price), 
          box_size: parseFloat(values.box_size)})
      }
        // navigate({
        //   pathname: "/products",
        // });
        navigate(-1)
      };
    
    const { values, setValues, onChange, onSubmit } = useForm(create, {
      name: '',
      description: '',
      price: 0.0,
      sku: '',
      producer: '',
      brand: '',
      color: '',
      serie: '',
      finish: '',
      type: '',
      box_size: 0.0,
      purpose: '',
      dimensions: '',
      material: '',
    });

    useEffect(() => {
      if (!isAddMode) {
        ProductService.getOne(id, setValues)
      }
    },[])

	//ImageSrc    string  `json:"image"`
  return (
    <Container component="main" maxWidth="lg">
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
          {isAddMode ? <AddOutlinedIcon /> : <ModeEditIcon />}
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          {isAddMode ? 'Add Product' : 'Edit Product'}
        </Typography>
        
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }} autoComplete="off">
          <Grid container spacing={2}>
          <Grid item xs={2}>
              <TextField
                required
                fullWidth
                name="sku"
                label="SKU"
                id="sku"
                autoComplete="sku"
                color="primary"
                onChange={onChange}
                value={values.sku}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                color="primary"
                onChange={onChange}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="producer"
                label="Producer"
                id="producer"
                autoComplete="producer"
                color="primary"
                onChange={onChange}
                value={values.producer}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                name="brand"
                label="Brand"
                id="brand"
                autoComplete="brand"
                color="primary"
                onChange={onChange}
                value={values.brand}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                name="serie"
                label="Serie"
                id="serie"
                autoComplete="serie"
                color="primary"
                onChange={onChange}
                value={values.serie}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                name="dimensions"
                label="Dimensions"
                id="dimensions"
                autoComplete="dimensions"
                color="primary"
                onChange={onChange}
                value={values.dimensions}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                name="box_size"
                label="Box size"
                id="box_size"
                autoComplete="box_size"
                color="primary"
                type="number"
                onChange={onChange}
                value={values.box_size}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                fullWidth
                name="price"
                label="Price"
                id="price"
                type="number"
                autoComplete="price"
                color="primary"
                onChange={onChange}
                value={values.price}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                name="type"
                label="Type"
                id="type"
                autoComplete="type"
                color="primary"
                onChange={onChange}
                value={values.type}
              />
            </Grid>
            
            <Grid item xs={2}>
              <TextField
                fullWidth
                name="purpose"
                label="Purpose"
                id="purpose"
                autoComplete="purpose"
                color="primary"
                onChange={onChange}
                value={values.purpose}
              />
            </Grid>
            
            <Grid item xs={2}></Grid>

            <Grid item xs={2}>
              <TextField
                  fullWidth
                  name="material"
                  label="Material"
                  id="material"
                  autoComplete="material"
                  color="primary"
                  onChange={onChange}
                  value={values.material}
                />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                name="color"
                label="Color"
                id="color"
                autoComplete="color"
                color="primary"
                onChange={onChange}
                value={values.color}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                name="finish"
                label="Finish"
                id="finish"
                autoComplete="finish"
                color="primary"
                onChange={onChange}
                value={values.finish}
              />
            </Grid>
            
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                inputProps={{ textarea: {
                  resize: "both"
                } }}
                name="description"
                label="Description"
                id="description"
                autoComplete="description"
                color="primary"
                onChange={onChange}
                value={values.description}
              />
            </Grid>
            

          </Grid>
          {/* {!isAddMode ? <ImageUpload id={id}/> : <></>} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isAddMode ? 'Add Product' : 'Edit Product'}
          </Button>
          <Button fullWidth variant="outlined" type='button' onClick={() => navigate(-1)} >Back</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ProductForm
