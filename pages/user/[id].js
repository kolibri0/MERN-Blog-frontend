import axios from '../../components/axios'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/profile.module.css'

import { CgProfile } from 'react-icons/cg'
import { RiEdit2Line } from 'react-icons/ri'

import { useSelector } from 'react-redux'
import BlogItem from '../../components/BlogItem'


const User = ({userInfo, posts}) => {
    const router = useRouter()
    const {id} = router.query
    const me = useSelector(state => state.userSlice.user)
    const [user, setUser] = React.useState(null)
    const [color, setColor] = React.useState('')
    const [name, setName] = React.useState('')
    const [change, setChange] = React.useState(false)
    const colorOption = ["blue", "green", "red", "orange", "violet", "indigo", "yellow", "gray"]

    React.useEffect(() => {
        setUser(userInfo) 
        setName(userInfo.name)
    }, [id])

    const changeColor = (e) => setColor(e.target.value)

    const getByTag = (tag) =>  router.push(`/?tag=${tag}`)

    const changeMe = async () => {
        const data = {
            name,
            color
        }
        const userRes = await axios.patch(`user/${id}`, data)
        if(userRes.data.success){
            router.push(`/user/${id}`)
            user.color = color
        }
        setName('')
        setChange(false)
    }


    return(<>
        <div className={styles.contain}>
            {user
            ?<>
            <div className={styles.left}>
                {me?._id === user?._id  
                    ?<RiEdit2Line className={styles.edit} onClick={() => setChange(!change)}/>
                    :null
                }
                <CgProfile className={styles.profile} style={{color: `${user.color}`}} />
            </div>
            <div className={styles.right}>
                <div className={styles.name}>{user.name}</div> 
                
                {me?._id === user?._id && change
                ?<>
                    <input className={styles.input} type={'text'} value={name} onChange={(e) => setName(e.target.value)} placeholder='Name...'/>
    
                    <select className={styles.select} value={color} onChange={(e) => changeColor(e)}>
                        <option selected hidden>{user.color}</option>
                        { colorOption.map((colorItem) => user.color !== colorItem 
                        ? <option key={colorItem}>{colorItem}</option>
                        : null
                        )}
                    </select>
    
                    <button className={styles.change} onClick={() => changeMe()}>Change</button>
                </>
                :null}
            </div>
            </>
            :null}
        </div>
        
        {/* {user && posts && !loading */}
        {user && posts
        ?<div className={styles.posts}>
            <div className={styles.h2}>User posts</div>
            {posts.map((post) => <BlogItem key={post._id}
                title={post.title} 
                name={post.user.name} 
                id={post._id} 
                userId={post.user._id}
                views={post.views}
                comments={post.comments}
                img={post.imgUrl ? process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl : null}
                tags={post.tags}
                colorUser={post.user.color}
                getByTag={getByTag}
            />)}
        </div>
        // : <div className={styles.posts}>{[...new Array(4)].map(() => <Spiner />)}</div>
        : null
        }
        </>)
}
 
export default User;

export async function getServerSideProps({query}) {
    const user = await axios.get(`/user/${query.id}`)
    const posts = await axios.get(`/user/posts/${query.id}`)
    return {
      props: {
        userInfo: user.data,
        posts: posts.data.posts
      }
    }
}