import useAxiosPrivate from "../api/axios"
import { Toast } from "../pages/components/ToastAlert"
import { SET_DONATION_LINK, UPDATE_TOKEN } from "../redux/actions"
import { useDispatch } from 'react-redux'
import useLoading from "./loading"
import { useNavigate } from "react-router-dom"
import useAuth from "./auth"

const useUserProfile = () => {
    const { axiosPrivate }  = useAxiosPrivate()
    const dispatch = useDispatch()
    const { setLoaderVisible } = useLoading()
    const navigate = useNavigate()
    const { tokenExpired } = useAuth()

    const displayErrorMessages = error => {
        Toast.fire({
            icon: "error",
            title: error.message
        });
    }

    const getUserData = async () => {
        try{
            setLoaderVisible(true)

            const result = await axiosPrivate.get('/profile')

            setLoaderVisible(false)

            if(false === result.data.data.error){
                return result.data.data.message
            }else{
                throw new Error(result.data.data.message)
            }
        }catch(err){
            setLoaderVisible(false)
            
            displayErrorMessages(err)

            return {}
        }
    }

    const updateUserData = async (formValues) => {
       
        try{
            setLoaderVisible(true)

            const result = await axiosPrivate.patch("/profile/update", JSON.stringify(formValues))
           
            setLoaderVisible(false)

            if(false === result.data.data.error){
                Toast.fire({
                    icon: "success",
                    title: "Update successful"
                })

                // If the user changed their institution, their donation link is also updated
                dispatch({
                    type: SET_DONATION_LINK,
                    payload: result.data.data.message.collegeId.donationLink
                })

                // The token also contains the collegeId, so a new token is generated on
                // college institution change
                if(result.data.data.message.token !== ''){
                    dispatch({
                        type: UPDATE_TOKEN,
                        payload: result.data.data.message.token
                    })
                }

                return result.data.data.message
            }else{
                throw new Error(result.data.data.message)
            }
        }catch(err){            
            Toast.fire({
                icon: "error",
                html: err.message
            });
        }
    
    }

    const subscribeToNewsletter = async () => {
        try{
            setLoaderVisible(true)

            const response = await axiosPrivate.patch('/profile/newsletter/subscription')

            setLoaderVisible(false)

            if(false === response.data.data.error){
                Toast.fire({
                    icon: "success",
                    title: "Successfully subscribed to our newsletter"
                })
            }else{
                Toast.fire({
                    icon: "error",
                    title: "Some errors were encountered, Please try to subscribe later"
                })
            }
        }catch(err){
            setLoaderVisible(false)

            displayErrorMessages(err)
            
            return
        }
    }

    const getAdmins = async () => {
        try{
            const response = await axiosPrivate.get('/profile/admins/all')

            if(true === response.data.data.error){
                // Unauthorized access, Admin is logged out automatically
                if(tokenExpired(response.data.data.statusCode)){                    
                    navigate('/admin/login')
                    return
                }

                throw new Error(response.data.data.message)
            }

            return response.data.data.message
        }catch(err){
            displayErrorMessages(err)
        }
    }

    const deleteAdmin = async (adminId) => {
        try{
            const response = await axiosPrivate.delete('/profile/admin/delete', {data: { adminId }})

            if(true === response.data.data.error){
                
                // Unauthorized access, Admin is logged out automatically
                if(tokenExpired(response.data.data.statusCode)){                    
                    navigate('/admin/login')
                    return
                }

                throw new Error('Failed to delete admin')
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })

            return true
        }catch(err){
            displayErrorMessages(err)

            return false
        }
    }

    const updateAdminDetails = async (formValues) => {
        try{
            setLoaderVisible(true)

            const response = await axiosPrivate.patch('/profile/admin/update', formValues)

            setLoaderVisible(false)

            if(true === response.data.data.error){
                
                // Unauthorized access, Admin is logged out automatically
                if(tokenExpired(response.data.data.statusCode)){                    
                    navigate('/admin/login')
                    return
                }

                throw new Error('Update admin details failed')
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })

        }catch(err){    
            displayErrorMessages(err) 
        }
    }

    return {
        getUserData,
        updateUserData,
        subscribeToNewsletter,
        getAdmins,
        deleteAdmin,
        updateAdminDetails
    }
}

export default useUserProfile