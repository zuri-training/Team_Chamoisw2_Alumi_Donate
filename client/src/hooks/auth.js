import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Toast } from './../pages/components/ToastAlert';

const useAuth = () => {
    const navigate = useNavigate()
    
    const formValid = (formValues) => {
        return Object.keys(formValues).every(formVal => formValues[formVal] !== "")
    }
 
    const displayErrorMessages = (error) => {
        const {response: {data, status}} = error
        const message = { title: data.message }

        if (status === 400) {
            Toast.fire({
                icon: "error",
                ...message
            });
        } else if (status === 500) {
            Toast.fire({
                icon: "error",
                ...message
            });
        } else {
            Toast.fire({
                icon: "error",
                title: "Something went wrong"
            });
        }
    }

    const signupUser = async (formValues) => {
        if(!formValid(formValues)) return

        try{
            const response = await axios.post("/auth/signup", formValues);
            const message = {title: response.data.message};

            // This implies the signup was successful
            if(response.status === 201){
                Toast.fire({
                icon: "success",
                ...message
                });
                navigate("/login")
                return
            }
        }catch(err){
            displayErrorMessages(err)
        }
    }

    const loginUser = async (formValues) => {
        if(!formValid(formValues)) return

        try{
            const response = await axios.post("/auth/login", formValues);
            const message = {title: response.data.message};

            // This implies the login was successful
            if(response.status === 200){
                Toast.fire({
                    icon: "success",
                    ...message
                });

                console.log(response.data)

                navigate("/dashboard")
                return
            }
        }catch(err){
            displayErrorMessages(err)
        }
    }

    return {
        signupUser,
        loginUser
    }
}


export default useAuth;