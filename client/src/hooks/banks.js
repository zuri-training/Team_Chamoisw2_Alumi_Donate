import { Toast } from "../pages/components/ToastAlert"
import useAxios from "./../api/axios"
import useLoading from "./loading"
import { useSelector } from "react-redux"
import { useMemo } from "react"

const useBanks = () => {
    const { axiosPrivate } = useAxios()
    const { setLoaderVisible } = useLoading()
    const bankReduxData = useSelector((state) => (state.bank))
    const bankToEdit = useMemo(() => (bankReduxData), [bankReduxData])

    const displayErrMsg = (err) => {
        Toast.fire({
            icon: "error",
            html: err.message
        })
    }

    const registerBank = async (formValues) => {
        try{
            setLoaderVisible(true)
        
            const response = await axiosPrivate.post('/banks/register', formValues)

            setLoaderVisible(false)

            if(true === response.data.data.error){

                throw new Error("Registration failed")
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })
        }catch(err){
            setLoaderVisible(false)
            
            displayErrMsg(err)
        }
        
    }

    const getBanks = async () => {

        setLoaderVisible(true)

        const response = await axiosPrivate.get('banks/all')

        setLoaderVisible(false)

        if(true === response.data.data.error){
            return []
        }

        return response.data.data.message
    }

    const deleteBank = async (bankId) => {
        try{
            setLoaderVisible(true)
        
            const response = await axiosPrivate.delete(`/banks/delete`, { data: { bankId } })

            setLoaderVisible(false)

            if(true === response.data.data.error){

                throw new Error("Deletion failed")
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })

            return true
        }catch(err){
            setLoaderVisible(false)
            
            displayErrMsg(err)

            return false
        }
    }

    const getBankReduxData = () => {
        return bankToEdit
    }

    const updateBankDetails = async (formValues) => {
        try{
            setLoaderVisible(true)
        
            const response = await axiosPrivate.patch(`/banks/update`, formValues)

            setLoaderVisible(false)

            if(true === response.data.data.error){

                throw new Error("Update failed")
            }

            Toast.fire({
                icon: "success",
                title: response.data.data.message
            })

            return true
        }catch(err){
            setLoaderVisible(false)
            
            displayErrMsg(err)

            return false
        }
    }
    
    return {
        registerBank,
        getBanks,
        deleteBank,
        getBankReduxData,
        updateBankDetails
    }
}

export default useBanks