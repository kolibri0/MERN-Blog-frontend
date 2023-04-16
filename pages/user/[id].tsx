import axios from '../../components/axios'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/profile.module.css'

import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'

import BlogItem from '../../components/BlogItem'
import { useAppSelector } from '../../redux/hook'
import { userAuthSelector } from '../../redux/auth'
import { IUser } from '../../Interface/IUser'
import { IPost } from '../../Interface/IPost'
import { GetServerSideProps } from 'next/types'

interface IProps {
  userInfo: IUser,
  posts: IPost[]
}

const User: React.FC<IProps> = ({ userInfo, posts }) => {
  const router = useRouter()
  const { id } = router.query
  const me = useAppSelector(state => state.userSlice.user)
  const auth = useAppSelector(userAuthSelector)
  const [user, setUser] = React.useState<null | IUser>(null)
  const [color, setColor] = React.useState('')
  const [name, setName] = React.useState('')
  const [change, setChange] = React.useState(false)
  const colorOption = ["blue", "green", "red", "orange", "violet", "indigo", "yellow", "gray"]

  React.useEffect(() => {
    if (!auth && !localStorage.getItem('token')) router.push('/login')
    setUser(userInfo)
    setName(userInfo.name)
  }, [id])
  console.log(user)
  const changeColor = (e: any) => setColor(e.target.value)

  const getByTag = (tag: string) => router.push(`/?tag=${tag}`)

  const changeMe = async () => {
    const data = {
      name,
      color
    }
    const userRes = await axios.patch(`user/${id}`, data)
    if (userRes.data.success) {
      router.push(`/user/${id}`)
      if (user) user.color = color
    }
    setName('')
    setChange(false)
  }

  return (<>
    <div className={styles.contain}>
      {user
        ?
        <>
          <div className={styles.left}>
            <div className={styles.containProfile}>
              <CgProfile className={styles.profile} />
              <div className={styles.name}>{user.name}</div>
              <div className={styles.containBtn}>
                <button className={styles.follow}>Follow</button>
                <button className={styles.message}>Message</button>
              </div>
            </div>
            <div className={styles.followers}>
              <div>followers</div>
              <div className={styles.follower}>
                <CgProfile fontSize={25} />
                <div>Follower Name</div>
              </div>
              <div className={styles.hr} />
              <div className={styles.follower}>
                <CgProfile fontSize={25} />
                <div>Follower Name1</div>
              </div>
              <div className={styles.hr} />
              <div className={styles.follower}>
                <CgProfile fontSize={25} />
                <div>Follower Name2</div>
              </div>
            </div>

            {user._id == me?._id
              ? <div className={styles.followers}>
                <div>Follow on you</div>
                <div className={styles.follower}>
                  <CgProfile fontSize={25} />
                  <div>Follow on U Name2</div>
                </div>
                <div className={styles.hr} />
                <div className={styles.follower}>
                  <CgProfile fontSize={25} />
                  <div>Follow on U Name2</div>
                </div>
                <div className={styles.hr} />
                <div className={styles.follower}>
                  <CgProfile fontSize={25} />
                  <div>Follow on U Name2</div>
                </div>
              </div>
              : null
            }
          </div>
          <div className={styles.right}>
            <div className={styles.userInfo}>
              <div className={styles.infoItem}>User Name: {user.name}</div>
              <div className={styles.hr} />
              <div className={styles.infoItem}>Count user posts: {posts.length}</div>
              <div className={styles.hr} />
              <div className={styles.infoItem}>User Followers: ?</div>
              <div className={styles.hr} />
              <div className={styles.infoItem}>About me: {user.aboutMe ?? 'No info'}</div>
            </div>
            <div className={styles.hr} />
            <div className={styles.posts}>
              <div>User posts:</div>
              {user && posts
                ? posts.map((post, i) => (
                  <>
                    <div className={styles.post}>
                      <div className={styles.fromLeftPost}>
                        <img className={styles.img} src={post.imgUrl ? process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl : ''} alt="" />
                      </div>
                      <div className={styles.fromRightPost}>
                        <div className={styles.title}>{post.title?.slice(0, 50)}</div>
                        <div className={styles.tags}>{post.tags?.map((res) => <div className={styles.tag}>#{res}</div>)}</div>

                        <div style={{ "display": 'flex' }}>
                          <div className={styles.watch}><AiOutlineEye />{post.views}</div>
                          <div className={styles.comment}><BiComment />{post.comments.length}</div>
                        </div>

                      </div>
                    </div>
                    {i < posts.length - 1
                      ? <div className={styles.hr} />
                      : null
                    }
                  </>
                ))
                : <>1</>
              }
            </div>
          </div>

        </>
        : null}
    </div>
  </>)
}

export default User;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await axios.get(`/user/${query.id}`)
  const posts = await axios.get(`/user/posts/${query.id}`)
  return {
    props: {
      userInfo: user.data,
      posts: posts.data.posts
    }
  }
}