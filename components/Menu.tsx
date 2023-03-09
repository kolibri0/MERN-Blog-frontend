import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { logout } from '../redux/auth'
import styles from '../styles/App.module.css'
import '../types'
import { CgProfile } from 'react-icons/cg'
import * as React from 'react';

interface INav{
  href: string,
  text: string,
}

const nav: INav[] = [
    {href: '/', text: "Blog"},
    {href: '/note', text: "Note"},
  ]

const Menu = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userSlice)

    const logoutUser = () => dispatch(logout(null)) 

    return (
    <div className="App">
        <div className={styles.head}>
            <div className={styles.containNav}>
                <div>
                    {nav.map((res) =><Link className={styles.navItem} href={res.href}>{res.text}</Link>)}
                </div>
                <div>
                {user
                ?<>
                  <Link href='/add-post' className={styles.addPost}>Add post</Link>
                  <Link href={`/user/${user._id}`} className={styles.myProfile}>
                      <CgProfile className={styles.profileIcon} style={{color: `${user.color}`}}/>
                  </Link>
                  <a onClick={() => logoutUser()} className={styles.logout}>Logout</a> 
                </>
                :<Link className={styles.logout} href={"/login"}>Login</Link>
                }
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default Menu;