import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../../api/axios';
import useAuth from '../../../hooks/auth';
import { LOGOUT } from '../../../redux/actions';
import { useDispatch } from 'react-redux'

const ProtectedRoutes = ({children}) => {
  const { userIsAuth } = useAuth()
  const isAuth = useMemo(() => (userIsAuth()), [userIsAuth])
  const { axiosPrivate } = useAxios()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get('/auth/token/verify')
      
      if(response.data.data.error === true){
        dispatch({type: LOGOUT})
        navigate('/login')
      }
    
    })()
  }, [navigate, axiosPrivate, dispatch ])

  return (isAuth && children)
};

export default ProtectedRoutes