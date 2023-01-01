import useAxios from './../api/axios'
import { Toast } from '../pages/components/ToastAlert'

const useColleges =  () => {
    const { axiosPublic } = useAxios()

    const getColleges = () => {
        try{
            return axiosPublic.get("/colleges/all");
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.response? err.response.data.message : err.message
            });
        }
    }

    const getCollege = (collegeDonationLink) => {
        try{
            return axiosPublic.get(`/colleges/single/${collegeDonationLink}`);
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