import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import RoomCard from './RoomCard'
import { Typography } from '@mui/material'

const RoomSetups = () => {
    const [rooms, setRooms] = useState([])
    let user = useCurrentUser().getCurrentUser()
    useEffect(() => {
        axios.get("http://localhost:9099/api/v3d/rooms-by/"+user.id)
            .then(r => {
                console.log(r.data)
                setRooms(r.data)
            }).catch(e => console.log(e))
    }, [])
  return (
    <div>
      <Typography variant="h3" sx={{m: 3}}>Saved Room Setups</Typography>
      {rooms.length > 0 ? rooms.map(r => <RoomCard key={r.id} room={r} />) : <p>You have no room setups saved</p>}
    </div>
  )
}

export default RoomSetups
