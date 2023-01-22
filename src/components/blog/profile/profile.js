import React from 'react'
import axios from '../../../axios'
import {useNavigate, useParams} from "react-router-dom"
import { CgProfile } from 'react-icons/cg'
import {RiEdit2Line } from 'react-icons/ri'
import {useSelector} from 'react-redux'

import styles from './profile.module.css'
import BlogListItem from '../blog-list-item'

const Profile = () => {
    const {id} = useParams()
    const me = useSelector(state => state.userSlice.user)
    const [user, setUser] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [color, setColor] = React.useState('')
    const [name, setName] = React.useState('')
    const [change, setChange] = React.useState(false)
    const colorOption = ["blue", "green", "red", "orange", "violet", "indigo", "yellow", "gray"]

    const fetchUser = async () => {
        const user = await axios.get(`http://localhost:5000/user/${id}`)
        setUser(user.data) 
        setName(user.data.name)
    }

    console.log(posts)
    const fetchUserPosts = async () => {
        const posts = await axios.get(`http://localhost:5000/user/posts/${id}`)
        setPosts(posts.data.posts) 
    }

    React.useEffect(() => {
        fetchUser()
        fetchUserPosts()
    }, [id])

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const changeMe = async () => {
        const data = {
            name,
            color
        }
        const userRes = await axios.patch(`http://localhost:5000/user/${id}`, data)
        if(userRes.data.success){
            fetchUser()
        }
        setName('')
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
    
    {user && posts 
    ?<div className={styles.posts}>
        <div className={styles.h2}>User posts</div>
        {posts.map((post) => <BlogListItem key={post._id}
            title={post.title} 
            name={post.user.name} 
            id={post._id} 
            userId={post.user._id}
            views={post.views}
            createdAt={post.createdAt}
            comments={post.comments}
            img={post.imgUrl ? `http://localhost:5000` + post.imgUrl : null}
            tags={post.tags}
            colorUser={post.user.color}
        />)}
    </div>
    :null} </>)

}

export default Profile
