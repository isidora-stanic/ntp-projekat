import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from './CurrentUserContext'

const RequireAuth = ({children}) => {
    let user = useCurrentUser().getCurrentUser()

    if (!localStorage.getItem('token')) {
        return <Navigate to={'/signin'} />
    }

    if (user.role !== 'REGUSER' && user.role !== 'ADMIN') {
        return <Navigate to={'/signin'} />
    }
    
  return (
    <div>
      {children}
    </div>
  )
}

export default RequireAuth
