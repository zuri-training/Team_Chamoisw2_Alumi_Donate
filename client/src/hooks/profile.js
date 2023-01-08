import useAxiosPrivate from "../api/axios"
import { Toast } from "../pages/components/ToastAlert"
import { SET_DONATION_LINK, UPDATE_TOKEN } from "../redux/actions"
import { useDispatch } from 'react-redux'

const useUserProfile = () => {
    const { axiosPrivate }  = useAxiosPrivate()
    const dispatch = useDispatch()

    const getUserData = async () => {
        try{
            const result = await axiosPrivate.get('/profile')

            if(false === result.data.data.error){
                return result.data.data.message
            }else{
                throw new Error(result.data.data.message)
            }
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });
        }
    }

    const updateUserData = async (formValues) => {
       
        try{
            const result = await axiosPrivate.patch("/profile/update", JSON.stringify(formValues))
           
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
                if(result.data.data.message.updatedToken !== ''){
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
        const response = await axiosPrivate.patch('/profile/newsletter/subscription')

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
    }

    return {
        getUserData,
        updateUserData,
        subscribeToNewsletter
    }
}

export default useUserProfile