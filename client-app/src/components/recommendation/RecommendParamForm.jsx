import React from 'react'
import RecommendationService from '../../services/RecommendationService'
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
import { useEffect } from 'react';
import { MenuItem } from '@mui/material';
import ProductService from '../../services/ProductService';
import { useState } from 'react';
import ProductConnectionForm from './ProductConnectionForm';

const RecommendParamForm = () => {
    let navigate = useNavigate()
    let {id} = useParams()
    let isAddMode = !id

    const [products, setProducts] = useState([])

    useEffect(() => {
      ProductService.getAll(setProducts)
    }, [])


    const create = (e) => {
        if (isAddMode) {
          console.log('sending', {...values, price: parseFloat(values.price)})
          RecommendationService.create({...values})
        } else {
          console.log('sending', {...values, price: parseFloat(values.price)})
          RecommendationService.update(id, {...values})
        }
          // navigate({
          //   pathname: "/products",
          // });
          navigate(-1)
        };
      
      const { values, setValues, onChange, onSubmit } = useForm(create, {
        id: id,
        based_on: '',
        value1: '',
        value2: '',
      });
  
      useEffect(() => {
        if (!isAddMode) {
          RecommendationService.getOne(id, setValues)
        }
      },[])
  return (
    <Container component="main" >
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
          {isAddMode ? 'Add Recommendation Param' : 'Edit Recommendation Param'}
        </Typography>
        
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }} autoComplete="off">
          <Grid container spacing={2} sx={{widht: "500rem"}}>
            <Grid item xs={12}>
            <TextField
                required
                select
                fullWidth
                name="based_on"
                label="Based On"
                id="based_on"
                autoComplete="based_on"
                color="primary"
                onChange={onChange}
                value={values.based_on}
                disabled={!isAddMode}
              >
                <MenuItem value={'color'}>Color</MenuItem>
                <MenuItem value={'finish'}>Finish</MenuItem>
                <MenuItem value={'material'}>Material</MenuItem>
                <MenuItem value={'id'}>ID</MenuItem>
              </TextField>
            </Grid>
            {values.based_on === "id" ? 
            <ProductConnectionForm values={values} setValues={setValues} onChange={onChange} onSubmit={onSubmit} /> 
            : 
            <>
              <Grid item xs={6}>
                <TextField
                    required
                    fullWidth
                    id="value1"
                    label="Value 1"
                    name="value1"
                    autoComplete="value1"
                    color="primary"
                    onChange={onChange}
                    value={values.value1}
                  />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    required
                    fullWidth
                    id="value2"
                    label="Value 2"
                    name="value2"
                    autoComplete="value2"
                    color="primary"
                    onChange={onChange}
                    value={values.value2}
                  />
              </Grid>
            </>}
            {/*  */}
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isAddMode ? 'Add Param' : 'Edit Param'}
          </Button>
          <Button fullWidth variant="outlined" type='button' onClick={() => navigate(-1)} >Back</Button>
        </Box>
        

      </Box>
    </Container>
  )
}

export default RecommendParamForm
