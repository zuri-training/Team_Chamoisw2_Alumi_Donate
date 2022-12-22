import axios from './../api/axios'

const useColleges =  () => {

    const getColleges = () => {
        return axios.get("/colleges/all");
    }

    return {
        getColleges
    }
}

export default useColleges;