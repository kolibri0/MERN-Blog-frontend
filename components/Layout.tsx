import Menu from "./Menu";
import { useAppDispatch } from '../redux/hook'
import { checkMe } from "../redux/auth";
import * as React from 'react';

const Layout = ({children}) => {
    const dispatch = useAppDispatch()

    React.useEffect(() =>{
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