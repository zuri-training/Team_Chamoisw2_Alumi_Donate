import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { SET_LOADER_VISIBLE } from "../redux/actions"

const useLoading = () => {
    const { loading } = useSelector(state => state.ui)
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(loading)
    
    useEffect(() => {
        setVisible(loading)
    }, [loading])

    const setLoaderVisible = (visibleState) => {
        dispatch({
            type: SET_LOADER_VISIBLE,
            payload: visibleState
        })
    }

    const loaderVisible = () => {
        return visible
    }

    return {
        setLoaderVisible,
        loaderVisible
    }
}

export default useLoading