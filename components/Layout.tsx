import Menu from "./Menu";
import { useAppDispatch } from '../redux/hook'
import { checkMe } from "../redux/auth";
import * as React from 'react';
import Head from 'next/head'

const Layout = ({ children, title = 'Some page' }) => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkMe())
    }
  }, [])

  return (<>
    <Head>
      <title>{title}</title>
    </Head>
    <Menu />
    {children}
  </>);
}

export default Layout;