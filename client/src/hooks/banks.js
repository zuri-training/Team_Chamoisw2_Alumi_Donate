import { Toast } from "../pages/components/ToastAlert"
import useAxios from "./../api/axios"
import useLoading from "./loading"

const useBanks = () => {
    const { axiosPrivate } = useAxios()
    const { setLoaderVisible } = useLoading()

    const displayErrMsg = (err) => {
        Toast.fire({
            icon: "error",
            html: err.message
        })
    }

    const registerBank = async (formValues) => {
        try{
            setLoaderVisible(true)
        
            const response = await axiosPrivate.post('/banks/register', formValues)

            setLoaderVisible(false)

            if(true === response.data.data.error){

                throw new Error("Registration failed")
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })
        }catch(err){
            setLoaderVisible(false)
            
            displayErrMsg(err)
        }
        
    }

    const getBanks = async () => {

        setLoaderVisible(true)

        const response = await axiosPrivate.get('banks/all')

        setLoaderVisible(false)

        if(true === response.data.data.error){
            return []
        }

        return response.data.data.message
    }
    
    return {
        registerBank,
        getBanks
    }
}

export default useBanks