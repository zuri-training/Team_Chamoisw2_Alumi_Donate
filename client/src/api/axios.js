import axios from "axios";
import { useSelector } from 'react-redux'
import { useMemo } from "react";

const useAxios = () => {
  const baseURL = process.env.REACT_APP_SERVER_URL
  const auth = useSelector(state => (state.auth))
  const user = useMemo(() => (auth.user),[auth.user])
  
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
