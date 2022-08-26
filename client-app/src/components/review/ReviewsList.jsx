import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import ReviewService from '../../services/ReviewService'
import LeaveReview from './LeaveReview'
import Review from './Review'

const ReviewsList = ({reviews, product}) => {
  let user = useCurrentUser().getCurrentUser()
  const [canLeaveComment, setCanLeaveComment] = useState(false)
  useEffect(() => {
    ReviewService.userCanLeaveComment(user.id, product.id, setCanLeaveComment)
  }, [])
  return (
    <Paper style={{ padding: "40px 20px" }}>
      {user ? canLeaveComment ? <LeaveReview product={product}/> : <p style={{ textAlign: "left", color: "gray" }}>
              You have already left a review for this product.
            </p> : <></>}
      {reviews.map(r => <Review key={r.id} review={r} />)}
    </Paper>
  )
}

export default ReviewsList
