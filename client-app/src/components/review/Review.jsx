import { Avatar, Divider, Grid, Rating, ratingClasses, Typography } from '@mui/material'
import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const Review = ({review}) => {
  let user = useCurrentUser().getCurrentUser()
  return (
    <div>
      <Divider variant="fullWidth" style={{ margin: "20px 0" }} />
    <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt={review.user?.toUpperCase()} src={"hello"} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
          
            <h4 style={{ margin: 0, textAlign: "left" }}>{review.user} {user.id === review.user_id ? '(You)' : ''}<br/><Rating size="small" value={review.rate} readOnly /></h4>
            
            <p style={{ textAlign: "left" }}>
              {review.comment}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted on {review.timestamp}
            </p>
          </Grid>
        </Grid>
        </div>
  )
}

export default Review
