import { useParams, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

const DonationLink = () => {
    const params = useParams()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        const donationLink = localStorage.getItem('donationLink');

        if(!donationLink){ 
            localStorage.setItem('donationLink', params.donationLink)
            const userAuthenticated = localStorage.getItem('auth')
            
            if(!userAuthenticated){
                navigate('/login')
                return
            }
    
            if(userAuthenticated){
                navigate('/dashboard')
            }
        }

        
    },[params.donationLink, navigate])

    return<></>
}

export default DonationLink;