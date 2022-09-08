import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RoomCard = ({room}) => {

    let navigate = useNavigate()

    const handleSee = () => {
        navigate('/v3d/'+room.ID)
    }

    const handleDelete = () => {
        axios.delete("http://localhost:9091/api/v3d/rooms/" + room.ID)
            .then(r => {
                console.log(r.data)
            }).catch(e => console.log(e))
    }

  return (
    <Card sx={{ maxWidth: 300, display: 'inline-block', margin: 1, padding: 1}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {room.name}
        </Typography>
        <Typography variant="p" color="secondary">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions> 
          <Button fullWidth variant="contained" color='secondary' onClick={handleSee}>Look</Button>
          <Button fullWidth variant="outlined" color='error' onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  )
}

export default RoomCard
