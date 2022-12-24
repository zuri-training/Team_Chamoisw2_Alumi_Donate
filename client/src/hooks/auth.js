import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Toast } from './../pages/components/ToastAlert';

const useAuth = () => {
    const navigate = useNavigate()
    
    const formValid = (formValues) => {
        return Object.keys(formValues).every(formVal => formValues[formVal] !== "")
    }
 
    const displayErrorMessages = (error) => {
            Toast.fire({
                icon: "error",
                title: error.response ? error.response.data.message : error.message
            });
    }

    const signupUser = async (formValues) => {
        //if(!formValid(formValues)) return

        try{
            const response = await axios.post("/auth/signup", formValues);
            const message = {title: "Registration successful"};

            // This implies the signup was successful
            if(response.status === 201){
                Toast.fire({
                icon: "success",
                ...message
                });
                navigate("/login")
                return
            }else{
                Toast.fire({
                    icon: "error",
                    title: response.data.message
                });
            }
            return
        }catch(err){
            displayErrorMessages(err)
            return
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

                localStorage.setItem('auth', JSON.stringify(response.data))
                localStorage.setItem('donationLink', response.data.donationLink)

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
        loginUser
    }
}


export default useAuth;