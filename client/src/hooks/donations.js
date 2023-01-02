import useAxios from './../api/axios'
import { useSelector } from 'react-redux'

const useDonations = () => {
    const { axiosPublic } = useAxios()
    const donationReduxData = useSelector(state => (state.donations))

    const getDonationReduxData = () => {
        return donationReduxData
    }

    const getDonations = async () => {
        try{
            const response = await axiosPublic.get('/donations')
            if(response.status !== 200){
                throw new Error(response.data.message)
            }

            return response.data.message
        }catch(err){
            console.log(err.message)
            return []
        }
    }

    return {
        getDonations,
        getDonationReduxData
    }
}

export default useDonations