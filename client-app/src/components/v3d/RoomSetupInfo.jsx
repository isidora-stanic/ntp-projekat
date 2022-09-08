import { Badge, Button, Typography } from '@mui/material'
import React from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ProductService from '../../services/ProductService';
import { useEffect } from 'react';
import { useRef } from 'react';

const RoomSetupInfo = ({room}) => {
    let {id} = useParams();
    let navigate = useNavigate();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (room.walls.length > 0 && totalPrice === 0) {
            console.log("YAHOO!")
            for (let w of room.walls) {
                axios.get("http://localhost:9091/api/products/"+w.product_id).then(
                    r => {
                        console.log(r.data.box_size)
                        console.log(w.wallSize1, w.wallSize2)
                        console.log(r.data.price)
                        setTotalPrice(totalPrice + (w.wallSize1/100 * w.wallSize2/100)/r.data.box_size * r.data.price)
                    }
                ).catch(err => console.error(err))
            }
            
        }
    }, [room])

    const handleDelete = () => {
        axios.delete("http://localhost:9091/api/v3d/rooms/" + id)
            .then(r => {
                console.log(r.data)
                navigate("/")
            }).catch(e => console.log(e))
    }

  return (
    <div style={{margin: 25}}>
      {/* <p>{JSON.stringify(room)}</p> */}
      <Typography variant="h4" color="primary">{room.name}</Typography>
      <Typography variant="p" color="secondary">{room.description}</Typography>
      <hr/>
      {room.walls.filter((w, i) => i !== 2).map((w, i) => <div key={i} style={{margin:25}}>
        Wall {i+1}: <a href={"/product/"+w.product_id}><b>{w.product_name}</b></a> {w.wallSize1}x{w.wallSize2} cm2
         </div>)}
      <hr/>
      <Typography variant="h5" color="primary">Total: {totalPrice.toFixed(2)} RSD</Typography>
      <hr/>
      <Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>
    </div>
  )
}

export default RoomSetupInfo
