import Menu from "./Menu";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { checkMe } from "../redux/auth";


const Layout = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() =>{
        if(localStorage.getItem('token')){ 
            dispatch(checkMe())
        }
    },[])

    return (<>
    <Menu />
    {children}
    </>);
}
 
export default Layout;