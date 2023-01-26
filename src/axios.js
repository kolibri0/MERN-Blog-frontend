import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_REQUEST
  })

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default instance