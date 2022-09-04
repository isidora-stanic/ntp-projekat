import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import ReviewService from '../../services/ReviewService';

const DeleteReviewFormDialog = ({selected, open, setOpen}) => {
    const [why, setWhy] = useState('')

    const handleDelete = () => {
      ReviewService.delete(selected.id, why)
      setOpen(false)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    return (
      <div>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To delete this review, please enter why.
            </DialogContentText>
            <Box
            component="form"
            noValidate
            onSubmit={e => e.preventDefault()}
            autoComplete="off"
            sx={{mt: 2}}
          >
            <TextField
              autoComplete="ban-end"
              required
              multiline
              autoFocus
              id="why"
              label="Why"
              type="text"
              fullWidth
              color="primary"
              variant="outlined"
              value={why || ''}
              onChange={e => setWhy(e.target.value)}
            />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' color='primary'>Cancel</Button>
            <Button onClick={handleDelete} variant='contained' color='warning'>Ban</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default DeleteReviewFormDialog
