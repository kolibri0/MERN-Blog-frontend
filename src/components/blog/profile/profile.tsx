import React from 'react'
import axios from '../../../../components/axios'
import {Link, useParams} from "react-router-dom"
import { CgProfile } from 'react-icons/cg'
import {RiEdit2Line } from 'react-icons/ri'

import styles from './profile.module.css'
import BlogListItem from '../blog-list-item'
import { getUserPosts } from '../../../redux/postSlice'

import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { IUser } from '../../../../Interface/IUser'
import Spiner from '../../../utils/Loader'

const Profile: React.FC = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const me = useAppSelector(state => state.userSlice.user)
    const {posts, error, loading} = useAppSelector(state => state.postSlice)
    const [user, setUser] = React.useState<IUser | null>(null)
    const [color, setColor] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [change, setChange] = React.useState<boolean>(false)
    const colorOption: string[] = ["blue", "green", "red", "orange", "violet", "indigo", "yellow", "gray"]

    const fetchUser = async () => {
        const user = await axios.get(`user/${id}`)
        setUser(user.data) 
        setName(user.data.name)
    }

    React.useEffect(() => {
        fetchUser()
        dispatch(getUserPosts(String(id)))
    }, [id])

    const changeColor = (e: any) => {
        setColor(e.target.value)
    }

    const changeMe = async () => {
        const data = {
            name,
            color
        }
        const userRes = await axios.patch(`user/${id}`, data)
        if(userRes.data.success){
            fetchUser()
        }
        setName('')
    }

    if (error) {
        return (
          <Alert variant="danger" style={{width: '500px', margin: '10px auto'}}>
            <Alert.Heading>Oh snap! Somthing wrong!</Alert.Heading>
            <p>
            Reload the page or go to <Link to={'/'} className={styles.home}>homepage.</Link> 
            
            </p>
          </Alert>
        );
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
    
    {user && posts && !loading
    ?<div className={styles.posts}>
        <div className={styles.h2}>User posts</div>
        {posts.map((post) => <BlogListItem key={post._id}
            title={post.title} 
            name={post.user.name} 
            id={post._id} 
            userId={post.user._id}
            views={post.views}
            comments={post.comments}
            img={post.imgUrl ? process.env.REACT_APP_URL_REQUEST_IMG + post.imgUrl : null}
            tags={post.tags}
            colorUser={post.user.color}
        />)}
    </div>
    : <div className={styles.posts}>{[...new Array(4)].map(() => <Spiner />)}</div>
    }
    </>)

}

export default Profile
