import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;
// const userData = JSON.parse(localStorage.getItem('token'));
const token = localStorage.getItem("token") || "";

export default axios.create({
  baseURL
});

const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});

export { axiosPrivate };
