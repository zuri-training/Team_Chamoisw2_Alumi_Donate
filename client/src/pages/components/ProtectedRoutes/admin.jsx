import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../../../api/axios';
import useAuth from '../../../hooks/auth';
import { LOGOUT } from '../../../redux/actions';
import { useDispatch } from 'react-redux'

const ProtectedAdminRoutes = ({children}) => {
  const { userIsAdmin, adminExists } = useAuth()
  const isAuthAdmin = useMemo(() => (userIsAdmin()), [userIsAdmin])
  const { axiosPrivate } = useAxios()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get('/auth/token/verify')
    
      if(response.data.data.error === true){
        dispatch({type: LOGOUT})
        navigate('/admin/login')
      }
    
    })()
  }, [])

  return (isAuthAdmin && children)
};

export default ProtectedAdminRoutes