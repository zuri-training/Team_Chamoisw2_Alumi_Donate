import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const isAuth = userIsAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export const userIsAuth = () => {
  const userIsAuthDetails = localStorage.getItem("auth")
  
  return userIsAuthDetails;
};

export default ProtectedRoutes