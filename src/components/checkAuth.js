import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { userAuthSelector } from "../redux/userSlice"

export const CheckAuth = ({ children }) =>{
    const user = useSelector(userAuthSelector)
    if(user){
        return children
    }
    return <Navigate to='/login' replace={true} />
}