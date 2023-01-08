import useAxios from './../api/axios'
import { Toast } from '../pages/components/ToastAlert'

const useColleges =  () => {
    const { axiosPublic } = useAxios()

    const getColleges = async () => {
        try{
            return await axiosPublic.get("/colleges/all");
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.response? err.response.data.message : err.message
            });
        }
    }

    const getCollege = async (collegeDonationLink) => {
        try{
            return await axiosPublic.get(`/colleges/single/${collegeDonationLink}`);
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.response? err.response.data.message : err.message
            });
        }
    }

    return {
        getColleges,
        getCollege
    }
}

export default useColleges;