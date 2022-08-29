import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import UploadedImage from './UploadedImage'

const UploadedImages = ({uploaded, setUploaded}) => {
    
  return (
    <Container sx={{marginY: 5}}>
        <Paper sx={{border: "1px solid gray", backgroundColor: 'inherit'}}>
        <Typography sx={{marginTop: 5}} variant='h4'>Uploaded Images</Typography>
        {uploaded.length > 0 ? uploaded.map(u => (<UploadedImage key={u} uploaded={uploaded} setUploaded={setUploaded} src={u}/>)) : <p>There are no images uploaded for this product</p>}
        </Paper>
    </Container>
  )
}

export default UploadedImages
