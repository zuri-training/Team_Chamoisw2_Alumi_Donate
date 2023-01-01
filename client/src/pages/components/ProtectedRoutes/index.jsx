import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoutes = ({children}) => {
  const auth = useSelector(state => (state.auth))
  const [authUser] = useState(auth.user)

  return Object.keys(authUser) ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes