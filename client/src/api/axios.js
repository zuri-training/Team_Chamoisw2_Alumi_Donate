import axios from "axios";
import { useSelector } from 'react-redux'

const useAxios = () => {
  const baseURL = process.env.REACT_APP_SERVER_URL
  const { user } = useSelector(state => (state.auth))
  
  const axiosPublic = axios.create({
    baseURL
  });

  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    }
  });

  return {
    axiosPublic,
    axiosPrivate
  }
  
}

export default useAxios;
