import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../../api/axios';
import useAuth from '../../../hooks/auth';
import { LOGOUT } from '../../../redux/actions';
import { useDispatch } from 'react-redux'

const ProtectedAdminRoutes = ({children}) => {
  const { userIsAdmin, adminExists } = useAuth()
  const { axiosPrivate } = useAxios()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [renderChildren, setRenderChildren] = useState(false)
  
  useEffect(() => {
    if(userIsAdmin()){
      (async () => {
        try{
          const response = await axiosPrivate.get('/auth/token/verify')
          
          // Token invalid or expired
          if(true === response.data.data.error){
            dispatch({type: LOGOUT})
            navigate('/admin/login')
          }else{
            setRenderChildren(prev => (true))
          }
        }catch(err){
          navigate('/admin/login')
        }
      
      })()
    }else{
      (async () => {
        // This checks to see if no admin has been registered
        if(!await adminExists()){
          setRenderChildren(prev => { return true })
        }
      })()
    }
  },[])

  if(renderChildren){
    return children
  }else{
    return <></>
  }
};

export default ProtectedAdminRoutes