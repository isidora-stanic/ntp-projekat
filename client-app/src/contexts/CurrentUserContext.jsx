import React from "react"
import jwt_decode from 'jwt-decode'

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {

  const getCurrentUser = () => {
    let token = localStorage.getItem('token')
    let decoded = jwt_decode(token)
    return decoded
  }

  return (
    <CurrentUserContext.Provider value={{ getCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)