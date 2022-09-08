import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserService from '../../services/UserService';
import { Box } from '@mui/system';

export default function BanFormDialog({selected, open, setOpen}) {

  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [reason, setReason] = useState("")

  const handleBan = () => {
    UserService.ban(selected, endDate, reason)
    setOpen(false)
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ban User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To ban this user {selected}, please enter the reason and end date of ban.
          </DialogContentText>
          <Box
          component="form"
          noValidate
          onSubmit={e => e.preventDefault()}
          autoComplete="off"
          sx={{mt: 2}}
        >
          <TextField
            autoComplete="reason"
            required
            autoFocus
            id="reason"
            label="Ban Reason"
            type="text"
            fullWidth
            multiline
            color="primary"
            variant="outlined"
            value={reason || ''}
            onChange={e => setReason(e.target.value)}
          />
          <TextField
            sx={{mt: 2}}
            autoComplete="ban-end"
            required
            autoFocus
            id="ban"
            label="Ban Date"
            type="date"
            fullWidth
            color="primary"
            variant="outlined"
            value={endDate || ''}
            onChange={e => setEndDate(e.target.value)}
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color='primary'>Cancel</Button>
          <Button onClick={handleBan} variant='contained' color='warning'>Ban</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}