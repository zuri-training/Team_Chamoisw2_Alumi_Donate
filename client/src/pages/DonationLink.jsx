import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { SET_DONATION_LINK } from "../redux/actions";
import useAuth from './../hooks/auth'

const DonationLink = () => {
    const params = useParams()
    const { userIsAuth } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        // if user is not logged in 
        if(!userIsAuth()){
            dispatch({
                type: SET_DONATION_LINK,
                payload: params.donationLink
            })
    
            navigate('/signup')
        }else{
            // if user is logged in
            navigate('/dashboard/donate')
        }
            
    },[params.donationLink, navigate])

    return <></>
}

export default DonationLink;