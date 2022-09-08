import React from 'react'
import UserService from '../../services/UserService'

const UserShort = ({user}) => {
  const handleBan = () => {UserService.ban(user.id)}
  const handlePermit = () => {UserService.permit(user.id)}
  const handleEdit = () => {}
  const handleDelete = () => {if (window.confirm("Are you sure?")) {UserService.delete(user.id)}}
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.role}</td>
      <td>{user.email}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      {user.role==='REGUSER' ? 
          user.banned ? 
              <td><button onClick={handlePermit}>Permit</button></td> : 
              <td><button onClick={handleBan}>Ban</button></td> :  
          <td><button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button></td>}
    </tr>
  )
}

export default UserShort
