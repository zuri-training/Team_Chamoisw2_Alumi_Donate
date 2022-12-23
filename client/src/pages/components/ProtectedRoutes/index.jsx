import React from 'react'
import { Navigate } from 'react-router-dom'

const userAuth = () => {
  const userDetails = localStorage.getItem("auth")
  
  return userDetails;
};

const ProtectedRoutes = ({children}) => {
  const isAuth = userAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export const userIsAuth = () => {
  const userIsAuthDetails = localStorage.getItem("auth")
  
  return userIsAuthDetails;
};

export default ProtectedRoutes