import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../api/axios'
import { Toast } from './../pages/components/ToastAlert'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DONATION_LINK, SET_LOADER_VISIBLE, SIGN_IN, SIGN_IN_ADMIN, LOGOUT } from './../redux/actions'
import useDonations from './donations'
import useLoading from './loading'

const useAuth = () => {
    const navigate = useNavigate()
    const { axiosPublic, axiosPrivate } = useAxios()
    const dispatch = useDispatch()
    const authRedux = useSelector(state => (state.auth))
    const user = useMemo(() => (authRedux.user), [authRedux.user])
    const { getDonationReduxData } = useDonations()
    const { setLoaderVisible } = useLoading()
    const profileReduxData = useSelector(state => (state.profile))
    const adminProfile = useMemo(() => (profileReduxData.admin), [profileReduxData.admin])

    const userIsAuth = () => {
        return user && (typeof user.token !== "undefined")
    }

    const getUserData = () => (user)

    const formValid = (formValues) => {
        return Object.keys(formValues).every(formVal => formValues[formVal] !== "")
    }

    const signupFormValid = (formValues) => {
        //password must match confirm password
        if(formValues.password !== formValues.confirmPassword) return false

        return formValid(formValues)
    }

    const tokenExpired = (statusCode) => {
        if(statusCode === 401){
            dispatch({
                type: LOGOUT
            })

            return true
        }

        return false
    }
 
    const displayErrorMessages = (error) => {
            Toast.fire({
                icon: "error",
                title: error.message
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
        setLoaderVisible(true)

        try{
            const response = await axiosPublic.post("/auth/login", formValues);
            
            setLoaderVisible(false)

            // This implies the login was successful
            if(!response.data.data.error && response.data.data.statusCode === 200){
                Toast.fire({
                    icon: "success",
                    title: response.data.data.message
                });
                
                //Save authenticated user's data
                dispatch({ type: SIGN_IN, payload: response.data.data })

                // This donation link is being set by an authenticated user
                dispatch({ type: SET_DONATION_LINK, payload: response.data.data.donationLink})

                if(getDonationReduxData().donationLink === ''){
                    navigate('/dashboard')
                    return
                } 
            
            }else{   
                throw new Error(response.data.data.message)             
            }
            return
        }catch(err){
            setLoaderVisible(false)

            displayErrorMessages(err)
            
            return
        }
    }

    const adminExists = () => {
        try{
            return (async() => {
                const response = await axiosPublic.post("/auth/admin/exists")

                return response.data.data.message === 'exists'
            })()
            
        }catch(err){
            return false
        }
    }

    const registerAdmin = async (formValues) => {
        // Show loader
        setLoaderVisible(true)

        try{
            let response = null

            if(await adminExists()){
                response = await axiosPrivate.post("auth/admin/register", formValues);
            }else{
                response = await axiosPublic.post("auth/admin/register", formValues);
            }
            
            setLoaderVisible(false)

            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            Toast.fire({
                icon: "success",
                title: "Admin Registered Successfully",
            })

            return true
        }catch(err){
            setLoaderVisible(false)

            displayErrorMessages(err)
            
            return false
        }
    }

    const loginAdmin = async (formValues) => {
        setLoaderVisible(true)

        try{
            const response = await axiosPublic.post("auth/admin/login", formValues);

            setLoaderVisible(false)

            if(true === response.data.data.error){
                throw new Error(response.data.data.message)
            }

            dispatch({
                type: SIGN_IN_ADMIN,
                payload: String(response.data.data.message)
            })

            return true
        }catch(err){
            setLoaderVisible(false)

            displayErrorMessages(err)
            
            return false
        }
    }

    const userIsAdmin = () => {
        if(!userIsAuth()) return false

        return user.isAdmin
    }

    const getAdminReduxData = () => {
        return adminProfile
    }

    return {
        signupUser,
        loginUser,
        userIsAuth,
        getUserData,
        loginAdmin,
        registerAdmin,
        userIsAdmin,
        adminExists,
        getAdminReduxData,
        tokenExpired
    }
}


export default useAuth;