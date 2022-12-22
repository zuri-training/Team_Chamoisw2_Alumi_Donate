import axios from "axios";

const baseURL = "http://localhost:5000/api";
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
