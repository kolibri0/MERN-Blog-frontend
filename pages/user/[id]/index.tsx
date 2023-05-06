import axios from '../../../components/axios'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/profile.module.css'
import '../../../types'
import { CgProfile } from 'react-icons/cg'
import { RiEdit2Line } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { followOnUser, userAuthSelector, deleteFollowOnUser } from '../../../redux/auth'
import { IUser } from '../../../Interface/IUser'
import { IPost } from '../../../Interface/IPost'
import { GetServerSideProps } from 'next/types'
import Link from 'next/link'
import FollowItem from '../../../components/FollowItem'
import UserPostItem from '../../../components/UserPostItem'
import FollowBtn from '../../../components/FollowBtn'
import UserInfoBlock from '../../../components/UserInfoBlock'
import { IFollow } from '../../../Interface/IFollow'
import Layout from '../../../components/Layout'

interface IProps {
  userInfo: IUser,
  posts: IPost[]
}

const User: React.FC<IProps> = ({ userInfo, posts }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const me = useAppSelector(state => state.userSlice.user)
  const auth = useAppSelector(userAuthSelector)
  const [user, setUser] = React.useState<null | IUser>(null)

  React.useEffect(() => {
    if (!auth && !localStorage.getItem('token')) router.push('/login')
    setUser(userInfo)
  }, [id])
  // console.log(user?.followers)
  const getByTag = (tag: string): Promise<boolean> => router.push(`/?tag=${tag}`)

  const follow = async () => {
    if (me && user) {
      const data = {
        myId: me._id,
        userId: user._id
      }
      dispatch(followOnUser(data))
    }
  }

  const deleteFollow = async () => {
    if (me) {
      const data = {
        myId: me._id,
        userId: user?._id
      }
      dispatch(deleteFollowOnUser(data))
    }
  }

  const createChatWithUser = async () => {
    const dataUsers = {
      userOne: me?._id,
      userTwo: user?._id
    }
    const { data } = await axios.post(`/chats`, dataUsers)
    if (data.success) router.push('/chat')
  }

  const meSubscribeOnUser = (subscribeUserId) => subscribeUserId._id == id

  return (<>
    <Layout title={user?._id == me?._id ? 'Profile' : 'User profile'}>
      <div className={styles.contain}>
        {user
          ?
          <>
            <div className={styles.left}>
              <div className={styles.containProfile}>
                <CgProfile className={styles.profile} color={userInfo.color} />
                <div className={styles.name}>{user.name}</div>
                {
                  user._id == me?._id
                    ? <Link className={styles.editIcon} href={`${id}/edit`}><RiEdit2Line /></Link>
                    : null
                }

                <FollowBtn styles={styles} user={user} me={me} meSubscribeOnUser={meSubscribeOnUser} deleteFollow={deleteFollow} follow={follow} createChatWithUser={createChatWithUser} />

              </div>
              <div className={styles.followers}>
                <div >
                  <div>Followers:</div>
                  {
                    user.followers.length
                      ? user.followers.map((followItem: IFollow, i) => <FollowItem styles={styles} followItem={followItem} key={followItem._id} />)
                      : <div>No have followers</div>
                  }
                </div>

                {
                  user._id == me?._id
                    ?
                    <div >
                      <div>You follow on:</div>
                      {user.youFollow.map((followItem: IFollow, i) => <FollowItem styles={styles} followItem={followItem} key={followItem._id} />)}
                    </div>
                    : null
                }
              </div>
            </div>
            <div className={styles.right}>

              <UserInfoBlock styles={styles} user={user} posts={posts} />

              <div className={styles.hr} />
              <div className={styles.posts}>
                <div>User posts:</div>
                {user && posts
                  ? posts.map((post: IPost, i) => <UserPostItem styles={styles} post={post} getByTag={getByTag} />)
                  : null
                }
              </div>
            </div>

          </>
          : null}
      </div >
    </Layout>
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