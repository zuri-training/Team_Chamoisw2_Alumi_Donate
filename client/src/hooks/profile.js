import useAxiosPrivate from "../api/axios"
import { Toast } from "../pages/components/ToastAlert"
import { SET_DONATION_LINK } from "../redux/actions"
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

            if(result.status === 200){
                Toast.fire({
                    icon: "success",
                    title: "Update successful"
                })

                // If the user changed their institution, their donation link is also updated
                dispatch({
                    type: SET_DONATION_LINK,
                    payload: result.data.data.collegeId.donationLink
                })

                return result.data
            }else{
                throw new Error(result.data)
            }
        }catch(err){
            let errMessage = ''
            
            // Server side validation error from express-validator
            if(err.response){
                errMessage = err.response.data.message
            }else{
                errMessage = err.message
            }
            
            Toast.fire({
                icon: "error",
                html: errMessage
            });
        }
        // 
    }

    return {
        getUserData,
        updateUserData
    }
}

export default useUserProfile