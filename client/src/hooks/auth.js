import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from '../api/axios';
import { Toast } from './../pages/components/ToastAlert';
import { useDispatch, useSelector } from 'react-redux'
import { SET_DONATION_LINK, SIGN_IN } from './../redux/actions'
import useDonations from './donations';

const useAuth = () => {
    const navigate = useNavigate()
    const { axiosPublic } = useAxios()
    const dispatch = useDispatch()
    const auth = useSelector(state => (state.auth))
    const [user] = useState(auth.user)
    const { getDonationReduxData } = useDonations()
  
    const userIsAuth  = () => (Object.keys(user).length > 0)

    const getUserData = () => (user)

    const formValid = (formValues) => {
        return Object.keys(formValues).every(formVal => formValues[formVal] !== "")
    }

    const signupFormValid = (formValues) => {
        //password must match confirm password
        if(formValues.password !== formValues.confirmPassword) return false

        return formValid(formValues)
    }
 
    const displayErrorMessages = (error) => {
            Toast.fire({
                icon: "error",
                title: error.data ? error.data.message : error.message
            });
    }

    const signupUser = async (formValues) => {
        if(!signupFormValid(formValues)) return

        axiosPublic
        .post("/auth/signup", formValues)
        .then((response) => {
            // This implies the signup was successful
            if(response.data.data.statusCode === 201){

                // If signup was done through donation link, take the user to the donate page
                if(getDonationReduxData().donationLink !== ''){
                    navigate('/dashboard/donate')
                    return
                } 

                //Login user once signup is complete
                loginUser({ email: formValues.email, password: formValues.password })
                
                return
            }else{
                Toast.fire({
                    icon: "error",
                    title: response.data.data.message
                });
            }
            return

        }).catch((err) => {
            displayErrorMessages(err)
            return
        })
    }

    const loginUser = async (formValues) => {
        if(!formValid(formValues)) return

        try{
            const response = await axiosPublic.post("/auth/login", formValues);
            const message = {title: response.data.data.message};
            
            // This implies the login was successful
            if(!response.data.data.error && response.data.data.statusCode === 200){
                Toast.fire({
                    icon: "success",
                    ...message
                });
                
                dispatch({
                    type: SIGN_IN,
                    payload: response.data.data
                })

                // This donation link is being retrieved when an authenticated user tries to copy the
                // donation link from their profile page
                dispatch({ type: SET_DONATION_LINK, payload: response.data.data.donationLink})

                navigate("/dashboard")
            }else{
                Toast.fire({
                    icon: "error",
                    title: "One or more login details is incorrect"
                });
            }
            return
        }catch(err){
            displayErrorMessages(err)
            return
        }
    }

    return {
        signupUser,
        loginUser,
        userIsAuth,
        getUserData
    }
}


export default useAuth;