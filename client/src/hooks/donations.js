import axios from './../api/axios'

const useDonations = () => {

    const getDonations = async () => {
        try{
            const response = await axios.get('/donations')
            if(response.status !== 200){
                throw new Error(response.message)
            }

            return response.data.message
        }catch(err){
            console.log(err.message)
            return []
        }
    }

    return getDonations
}

export default useDonations