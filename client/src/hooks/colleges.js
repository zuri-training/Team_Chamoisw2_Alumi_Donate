import useAxios from './../api/axios'
import { Toast } from '../pages/components/ToastAlert'
import { RESET_DONATION_LINK } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useColleges =  () => {
    const { axiosPublic } = useAxios()
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    return {
        getColleges,
        getCollege
    }
}

export default useColleges;