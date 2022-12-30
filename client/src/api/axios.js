import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

export default axios.create({
  baseURL
});

const axiosPrivate = () => {
  const auth = localStorage.getItem("auth") || "";

  let token = ""

  if(auth){
    token  = JSON.parse(auth).token
    
    return axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  }
  
}

export { axiosPrivate };
