import React, { useState } from 'react'
import UserService from '../../services/UserService'

const UserForm = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        id: 0,
    })

    const register = (e) => {
        e.preventDefault()
        UserService.register(values)
    }
  return (
    <div style={{display: 'block', width: '50%'}}>
    <form style={{display: 'block', width: '50%'}} onSubmit={register}>
        <label htmlFor='fn'>First Name</label><br/>
        <input id='fn' placeholder='First Name' value={values.firstName} onChange={(e)=>setValues({...values, firstName: e.target.value})}/><br/><br/>
        <label htmlFor='ln'>Last Name</label><br/>
        <input id='ln' placeholder='Last Name' value={values.lastName} onChange={(e)=>setValues({...values, lastName: e.target.value})}/><br/><br/>
        <label htmlFor='e'>Email</label><br/>
        <input id='e' placeholder='Email' value={values.email} onChange={(e)=>setValues({...values, email: e.target.value})}/><br/><br/>
        <label htmlFor='p'>Password</label><br/>
        <input id='p' placeholder='Password' value={values.password} type='password' onChange={(e)=>setValues({...values, password: e.target.value})}/><br/><br/>
        {/* <label htmlFor='r'>remove based on context: Role</label>
        <label htmlFor='b'>remove based on context: Banned</label> */}
        <button type='submit'>Register</button>
    </form>
    </div>
  )
}

export default UserForm
