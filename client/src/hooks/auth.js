import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from '../api/axios';
import { Toast } from './../pages/components/ToastAlert';
import { useDispatch, useSelector } from 'react-redux'
import { SET_DONATION_LINK, SET_LOADER_VISIBLE, SIGN_IN } from './../redux/actions'
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

        // Show loader
        dispatch({ type: SET_LOADER_VISIBLE, payload: true })

        axiosPublic
        .post("/auth/signup", formValues)
        .then(async (response) => {
                
            // This implies the signup was successful
            if(response.data.data.statusCode === 201){

                //Login user once signup is complete
                await loginUser({ email: formValues.email, password: formValues.password })

                // Hide loader
                dispatch({ type: SET_LOADER_VISIBLE, payload: false })
                
                // If signup was done through donation link, take the user to the donate page
                if(getDonationReduxData().donationLink !== ''){
                    navigate('/dashboard/donate')
                    return
                } 
                
                return
            }else{
                // Hide loader
                dispatch({ type: SET_LOADER_VISIBLE, payload: false })

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

        // Show loader
        dispatch({ type: SET_LOADER_VISIBLE, payload: true })

        try{
            const response = await axiosPublic.post("/auth/login", formValues);
            const message = {title: response.data.data.message};
            
            // This implies the login was successful
            if(!response.data.data.error && response.data.data.statusCode === 200){
                Toast.fire({
                    icon: "success",
                    ...message
                });
                
                //Save authenticated user's data
                dispatch({ type: SIGN_IN, payload: response.data.data })

                // Hide loader
                dispatch({ type: SET_LOADER_VISIBLE, payload: false })

                // This donation link is being set by an authenticated user
                dispatch({ type: SET_DONATION_LINK, payload: response.data.data.donationLink})

                if(getDonationReduxData().donationLink === ''){
                    navigate('/dashboard')
                    return
                } 
            
            }else{
                // Hide loader
                dispatch({ type: SET_LOADER_VISIBLE, payload: false })
                
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