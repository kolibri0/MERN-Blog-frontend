import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_REQUEST
  })

    if(typeof window !== 'undefined')  instance.interceptors.request.use((config) => { 
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
      return config
})

export default instance