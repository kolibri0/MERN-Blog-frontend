import * as React from 'react';
import { CgProfile } from 'react-icons/cg';
import styles from '../../styles/users.module.css'
import '../../types'
import axios from '../../components/axios';
import Link from 'next/link'
import { useRouter } from 'next/router'



const Users = ({ users }) => {

  const router = useRouter()
  const [userName, setUserName] = React.useState('')

  const searchUsersByName = () => {
    router.push(`/user?name=${userName}`)
    setUserName('')
  }

  return (<>
    <div className={styles.container}>
      <div className={styles.containBtn}>
        <input className={styles.input} type="text" placeholder='Entae user name...' value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button className={styles.search} onClick={() => searchUsersByName()}>Search</button>
      </div>
      {users.map((user) => (
        <Link className={styles.userItem} href={`/user/${user._id}`}>
          <div>
            <CgProfile className={styles.profileIcon} color={user.color} />
          </div>
          <div>
            <div>{user.name}</div>
          </div>
        </Link>
      ))}
    </div>
  </>)
}


export default Users;

export const getServerSideProps = async ({ query }) => {
  let users;
  if (query.name) {
    users = await axios.get(`/users/${query.name}`)
  } else {
    users = await axios.get(`/users`)
  }
  return {
    props: {
      users: users.data.users,
    }
  }
}