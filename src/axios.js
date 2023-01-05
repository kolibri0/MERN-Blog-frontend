import axios from "axios";

const instance = axios.create()

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default instance