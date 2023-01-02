import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../../api/axios';
import useAuth from '../../../hooks/auth';
import { LOGOUT } from '../../../redux/actions';
import { useDispatch } from 'react-redux'

const ProtectedRoutes = ({children}) => {
  const { userIsAuth } = useAuth()
  const { axiosPrivate } = useAxios()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get('/auth/token/verify')

      if(response.data.data.statusCode === 500 && response.data.data.error === true){
        dispatch({type: LOGOUT})
        navigate('/login')
      }
    
    })()
  }, [navigate])

  return (userIsAuth() && children)
};

export default ProtectedRoutes