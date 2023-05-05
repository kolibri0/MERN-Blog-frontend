import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { logout } from '../redux/auth'
import styles from '../styles/App.module.css'
import '../types'
import { CgProfile } from 'react-icons/cg'
import * as React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { BsArrowDownUp } from 'react-icons/bs'

interface INav {
  href: string,
  text: string,
}

const nav: INav[] = [
  { href: '/', text: "Blog" },
  { href: '/note', text: "Note" },
  { href: '/chat', text: 'Your chats' },
  { href: '/user', text: 'Find users' },
  { href: '/add-post', text: 'Add new post' },
]

const MyMenu = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userSlice)

  const logoutUser = () => dispatch(logout(null))
  const { collapseSidebar, collapsed } = useProSidebar()

  React.useEffect(() => {
    collapseSidebar(true)
  }, [])

  return (
    <div className="App">
      <div className={styles.nav} style={{ height: '100%', position: 'fixed', zIndex: 12000, backgroundColor: 'white' }}>
        <Sidebar>
          <button className={styles.menuBtn} onClick={() => collapseSidebar()}>
            {
              !collapsed
                ? <div>Close <BsArrowDownUp /></div>
                : <div>Open <BsArrowDownUp /></div>
            }
          </button>
          <Menu>
            {nav.map((res) => <MenuItem className={styles.navItem} component={<Link href={`${res.href}`} />}>{res.text}</MenuItem>)}
            {user
              ? <>
                <MenuItem className={styles.navItem} component={<Link href={`/user/${user?._id}`} />}>Profile</MenuItem>
                <MenuItem className={styles.navItem} onClick={() => logoutUser()}>Logout</MenuItem>
              </>
              : <MenuItem className={styles.navItem} component={<Link href={`/login`} />}>Login</MenuItem>
            }
          </Menu>
        </Sidebar>

      </div>
    </div >
  );
}

export default MyMenu;