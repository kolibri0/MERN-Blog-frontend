import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { userAuthSelector } from "../redux/userSlice"

export const CheckAuth = ({ children }) =>{
    const user = useSelector(userAuthSelector)
    if(!user && !window.localStorage.getItem('token')){
       return <Navigate to='/login' replace={true} /> 
    }
    return children
}