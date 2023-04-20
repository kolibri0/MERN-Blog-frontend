import axios from '../../../components/axios'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/profile.module.css'

import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { RiEdit2Line } from 'react-icons/ri'

import BlogItem from '../../../components/BlogItem'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { followOnUser, userAuthSelector, deleteFollowOnUser } from '../../../redux/auth'
import { IUser } from '../../../Interface/IUser'
import { IPost } from '../../../Interface/IPost'
import { GetServerSideProps } from 'next/types'
import Link from 'next/link'

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

  const getByTag = (tag: string): Promise<boolean> => router.push(`/?tag=${tag}`)

  const follow = async () => {
    if (me && user) {
      const data = {
        myId: me?._id,
        userId: user?._id
      }
      dispatch(followOnUser(data))
    }
  }

  const deleteFollow = async () => {
    if (me) {
      const data = {
        myId: me?._id,
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

              <div className={styles.containBtn}>
                {
                  user._id !== me?._id
                    ? <>
                      {me?.youFollow.some(meSubscribeOnUser)
                        ? <button className={styles.unfollow} onClick={() => deleteFollow()}>Stop following</button>
                        : <button className={styles.follow} onClick={() => follow()}>Follow</button>
                      }
                      <button className={styles.message} onClick={() => createChatWithUser()} >Message</button>
                    </>
                    : null
                }
              </div>
            </div>
            <div className={styles.followers}>
              <div>Followers:</div>
              {
                user.followers.length
                  ? user.followers.map((followItem, i) => (
                    <Link className={styles.follower} href={followItem._id}>
                      <CgProfile fontSize={25} color={followItem.color} />
                      <div className={styles.followName}>{followItem.name}</div>
                    </Link>
                  ))
                  : <div>No have followers</div>
              }
            </div>

            {user._id == me?._id
              ? <div className={styles.followers}>
                <div>You follow on:</div>
                {user.youFollow.map((followItem, i) => (
                  <Link className={styles.follower} href={followItem._id}>
                    <CgProfile fontSize={25} color={followItem.color} />
                    <div className={styles.followName}>{followItem.name}</div>
                  </Link>
                ))}
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
              <div className={styles.infoItem}>User Followers: {user.followers.length}</div>
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
                        {post.imgUrl &&
                          <Link href={`/posts/${post._id}`}>
                            <img className={styles.img} src={process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl} alt="" />
                          </Link>
                        }
                      </div>
                      <div className={styles.fromRightPost}>
                        <Link href={`/posts/${post._id}`} className={styles.link}>
                          <div className={styles.title}>{post.title?.slice(0, 50)}</div>
                        </Link>
                        <div className={styles.tags}>{post.tags?.map((tag) => (
                          <div className={styles.tag} onClick={() => getByTag(tag)}>#{tag}</div>
                        ))}</div>

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
    </div >
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