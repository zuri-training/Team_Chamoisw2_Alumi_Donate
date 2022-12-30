import { axiosPrivate } from "../api/axios"
import { Toast } from "../pages/components/ToastAlert"

const useUserProfile = () => {

    const getUserData = async () => {
        try{
            const result = await axiosPrivate().get('/profile')

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
            const result = await axiosPrivate().patch("/profile/update", JSON.stringify(formValues))
            
            if(result.status === 200){
                Toast.fire({
                    icon: "success",
                    title: "Update successful"
                })
                return result.data
            }else{
                throw new Error(result.data)
            }
        }catch(err){
            let errMessage = ''
            
            // Server side validation error from express-validator
            if(err.response.data.message){
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