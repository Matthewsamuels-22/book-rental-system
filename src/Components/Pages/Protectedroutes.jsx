import { Navigate } from "react-router-dom"

export const Protectedroutes = ({children, user}) => {
  return user ? children : <Navigate to= "/signin" /> 
}
