import * as React from 'react';
import { CgProfile } from 'react-icons/cg';
import styles from '../../styles/users.module.css'
import '../../types'
import axios from '../../components/axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../redux/hook'
import { userAuthSelector } from '../../redux/auth';
import UserItem from '../../components/UserItem';
import { IFollow } from '../../Interface/IFollow'
import Layout from '../../components/Layout';

interface IProps {
  users: IFollow[]
}

const Users: React.FC<IProps> = ({ users }) => {

  const router = useRouter()
  const [userName, setUserName] = React.useState('')
  const user = useAppSelector(userAuthSelector)

  React.useEffect(() => {
    if (!user) router.push('/login')
  }, [])

  const searchUsersByName = () => {
    router.push(`/user?name=${userName}`)
    setUserName('')
  }

  return (<>
    <Layout title='Search users'>
      <div className={styles.container}>
        <div className={styles.containBtn}>
          <input className={styles.input} type="text" placeholder='Entae user name...' value={userName} onChange={(e) => setUserName(e.target.value)} />
          <button className={styles.search} onClick={() => searchUsersByName()}>Search</button>
        </div>
        {users.map((user: IFollow) => <UserItem styles={styles} user={user} />)}
      </div>
    </Layout>
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