import useAxios from './../api/axios'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Toast } from './../pages/components/ToastAlert'

const useDonations = () => {
    const { axiosPublic } = useAxios()
    const donationData = useSelector(state => (state.donations))
    const [donationReduxData, setDonationReduxData] = useState(donationData)

    useEffect(() => {
        setDonationReduxData(donationData)
    }, [donationData])

    const getDonationReduxData = () => {
        return donationReduxData
    }

    const getDonations = async () => {
        try{
            const response = await axiosPublic.get('/donations')
            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            return response.data.data.message
        }catch(err){
            Toast.fire({
                icon: "error",
                title: err.message
            });

            return []
        }
    }

    return {
        getDonations,
        getDonationReduxData
    }
}

export default useDonations