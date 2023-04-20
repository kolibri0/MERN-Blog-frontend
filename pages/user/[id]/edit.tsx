import { GetServerSideProps } from 'next/types';
import axios from '../../../components/axios'
import * as React from 'react';
import styles from '../../../styles/profile.module.css'
import '../../../types'
import { IUser } from '../../../Interface/IUser';
import { CgProfile } from 'react-icons/cg';
import { useAppSelector } from '../../../redux/hook';
import { userAuthSelector } from '../../../redux/auth';
import { useRouter } from 'next/router';


const UserEdit = ({ userInfo }) => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = React.useState<null | IUser>(null)
  const [userName, setUserName] = React.useState('')
  const [aboutMe, setAboutMe] = React.useState('')
  const [color, setColor] = React.useState('')
  const auth = useAppSelector(userAuthSelector)
  const colorOption = ["blue", "green", "red", "orange", "violet", "indigo", "yellow", "black", "gray"];

  React.useEffect(() => {
    if (!auth && !localStorage.getItem('token')) router.push('/login')
    setUser(userInfo)
    setUserName(userInfo.name)
    setAboutMe(userInfo.aboutMe)
    setColor(userInfo.color)
  }, [])

  const changeColor = (e: any) => setColor(e.target.value)

  const changeMyProfile = async () => {
    const checkSpaces = (str: string) => str.trim() !== ''
    const changeInfo = {
      name: userName.length > 0 && checkSpaces(userName) ? userName.trim() : 'No name',
      color,
      aboutMe,
    }
    const { data } = await axios.patch(`user/${id}`, changeInfo)
    if (data.success) router.push(`/user/${id}`)
  }

  return (<>
    <div className={styles.contain}>
      {user
        ?
        <>
          <div className={styles.left}>
            <div className={styles.containProfile}>
              <CgProfile className={styles.profile} color={color} />
              <div className={styles.name}>{userName}</div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.userInfo}>
              <div className={styles.editName} >
                <div>User name:</div>
                <input className={styles.nameInput} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter name...' />
              </div>
              <div className={styles.hr} />
              <div className={styles.editColor}>Color:
                <select onChange={(e) => changeColor(e)}>
                  <option selected hidden>{userInfo.color}</option>
                  {colorOption.map((colorItem) => color !== colorItem
                    ? <option key={colorItem}>{colorItem}</option>
                    : null
                  )}
                </select>
              </div>
              <div className={styles.hr} />
              <div className={styles.aboutMe}>
                <div>About me:</div>
                <textarea className={styles.aboutMeInput} value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
              </div>
            </div>
            <button className={styles.changeBtn} onClick={() => changeMyProfile()}>Change</button>
          </div>
        </>
        : null}
    </div >
  </>)
}

export default UserEdit;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await axios.get(`/user/${query.id}`)
  return {
    props: {
      userInfo: user.data,
    }
  }
}