import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import LandingPage from "../../LandingPage"

const Redirect = ({ to }) => {
    const navigate = useNavigate()

    useLayoutEffect(() => {
        navigate(to)
    },[])

    return <LandingPage />
}

export default Redirect