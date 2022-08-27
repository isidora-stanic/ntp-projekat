import { Avatar, Button, Grid, Rating, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ReviewService from '../../services/ReviewService'
import { useForm } from "../util/useForm";

const LeaveReview = ({product} ) => {

    const leaveReview = () => {
        ReviewService.create(values)
    }

    let user = useCurrentUser().getCurrentUser()

    const {values, setValues, onChange, onSubmit} = useForm(leaveReview, { 
        user_id: user.id, 
        product_id: product.id, 
        rate: 0, 
        comment: "",
        timestamp: new Date().toISOString(),
        user: user.name,
        product: "SKU: " + product.sku + " " + product.name
    })

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }} autoComplete="off">
        <p style={{ textAlign: "left" }}>Leave a review</p>
        <Grid container spacing={2}>
        <Grid item xs={1}>
            <Avatar alt={user.name?.toUpperCase()} src={"hello"} />
          </Grid>
          <Grid justifyContent="left" item xs={11} zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>
            {user.name}
            <br/>
            <Rating size="small" value={values.rate} onChange={(event, newValue) => {
                setValues({...values, rate: newValue});
            }}/>
          </h4>
              <TextField
                fullWidth
                sx={{ mt: 3 }}
                multiline
                name="comment"
                label="Comment"
                id="comment"
                autoComplete="comment"
                color="primary"
                onChange={onChange}
                value={values.comment}
              />
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 0, mb: 2 }}
                >
                    Submit
                </Button>
            </Grid>
            
        </Grid>
    </Box>
  )
}

export default LeaveReview
