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

            if(result.status === 200){
                return result.data
            }else{
                throw new Error(result.data)
            }
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.response ? err.response.data.message : err.message
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
                    payload: result.data.data.collegeId.donationLink
                })

                // The token also contains the collegeId, so a new token is generated on
                // college institution change
                if(result.data.data.updatedToken !== ''){
                    dispatch({
                        type: UPDATE_TOKEN,
                        payload: result.data.data.updatedToken
                    })
                }

                return result.data.data
            }else{
                throw new Error(result.data.data)
            }
        }catch(err){            
            Toast.fire({
                icon: "error",
                html: err.message
            });
        }
    
    }

    return {
        getUserData,
        updateUserData
    }
}

export default useUserProfile