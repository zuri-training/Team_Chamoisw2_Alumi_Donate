import useAxios from './../api/axios'
import { Toast } from '../pages/components/ToastAlert'
import { RESET_DONATION_LINK } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useLoading from './../hooks/loading'

const useColleges =  () => {
    const { axiosPublic, axiosPrivate } = useAxios()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setLoaderVisible } = useLoading()
    const college = useSelector(state => (state.college))

    const getColleges = async () => {
        try{
            const response = await axiosPublic.get("/colleges/all");

            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            return response.data.data.message
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });
        }
    }

    const getCollege = async (collegeDonationLink) => {
        try{
            const response = await axiosPublic.get(`/colleges/single/${collegeDonationLink}`);
            
            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            return response.data.data.message
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });

            // Remove the donation link from redux store if invalid
            dispatch({
                type: RESET_DONATION_LINK
            })
            
            navigate('/')
        }
    }

    const registerCollege = async (formValues) => {

        try{
            setLoaderVisible(true)

            const response = await axiosPrivate.post('/colleges/register', formValues)

            setLoaderVisible(false)
            
            Toast.fire({
                icon: true === response.data.data.error ? "error" : "success",
                title: response.data.data.message
            });
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });
        }

    }

    const getCollegesFullDetails = async () => {
        try{
            const response = await axiosPrivate.get('/colleges/all/complete')

            if(true === response.data.data.error){
                return []
            }

            return response.data.data.message
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });
        }
    }

    const deleteCollege = async collegeId => {
        try{
            const response = await axiosPrivate.delete('/colleges/delete', { data: { collegeId } })

            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })

            return true

        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });

            return false
        }
    }

    const getCollegeReduxData = () => {
        return college.collegeDetails
    }

    const updateCollege = async (formValues) => {
        try{
            setLoaderVisible(true)

            const response = await axiosPrivate.patch('/colleges/update', formValues)

            setLoaderVisible(false)

            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })

            return 
        }catch(err){
            setLoaderVisible(false)

            Toast.fire({
                icon: "error",
                title: err.message
            })
            
            return 
        }
    }

    const verifyAccountDetails = async (accountDetails) => {
        Toast.fire({
            icon: "info",
            title: "Verifying Account Details",
            timerProgressBar: false,
            timer: undefined    
        })

        try{
            const response = await axiosPrivate.post('/colleges/account/verify', accountDetails)

            if(true === response.data.data.error){
                throw new Error("Account Verification Failed")
            }

            Toast.fire({
                icon: "success",
                title: "Account verification successful",
            })

            return true
        }catch(err){
            Toast.fire({
                icon: "error",
                title: "Account verification failed"
            })

            return false
        }
    }

    return {
        getColleges,
        getCollege,
        registerCollege,
        getCollegesFullDetails,
        deleteCollege,
        getCollegeReduxData,
        updateCollege,
        verifyAccountDetails
    }
}

export default useColleges;