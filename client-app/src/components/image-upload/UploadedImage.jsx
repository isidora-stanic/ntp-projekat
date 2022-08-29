import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import ImageService from '../../services/ImageService'

const UploadedImage = ({src, uploaded, setUploaded}) => {
    let name = src.split("/")[5]

    const handleDelete = () => {
        ImageService.delete(src, uploaded, setUploaded)
    }
  return (
    <Card sx={{border: '1px solid gray', borderRadius: '5px', margin: 5, padding: 3, display: 'inline-block'}}>
        <CardMedia>
        <img src={src} alt={name} style={{maxHeight: 200, maxWidht: 200}} />
        </CardMedia>
      <CardContent sx={{marginBottom: 0}}>
        <Typography>{name}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="outlined" color="error" onClick={handleDelete} sx={{marginBottom: 0}}>Delete</Button>
      </CardActions>
    </Card>
  )
}

export default UploadedImage
