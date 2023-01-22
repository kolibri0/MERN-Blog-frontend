import { useEffect, useState } from 'react'
import BlogListItem from './blog-list-item'
import {useDispatch, useSelector} from 'react-redux'
import { getNewPosts, getPopularPosts, getPostsByTags, getTags } from '../../redux/postSlice'

import styles from './blog.module.css'
import { getAllPosts } from '../../redux/postSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { userAuthSelector } from '../../redux/userSlice'

const BlogList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {tag} = useParams()
    const user = useSelector(userAuthSelector)
    const {posts, tags} = useSelector(state => state.postSlice)
    const [count, setCount] = useState(10)

    useEffect(() => {
        dispatch(getTags(count))
        if(!tag) dispatch(getAllPosts())
        if(tag) dispatch(getPostsByTags(tag))
    }, [tag, count])

    const getByTag = (tag) => {
        navigate(`/posts/tag/${tag}`)
    }

    const getNew = () => {
        dispatch(getNewPosts())
    }

    const getPopular = () => {
        dispatch(getPopularPosts())
    }

    return(
    <div className={styles.container}>
        <div className={styles.category}>
            <div className={styles.categoryItem} onClick={() => dispatch(getAllPosts())}>None</div>
            <div className={styles.categoryItem} onClick={() => getNew()}>New</div>
            <div className={styles.categoryItem} onClick={() => getPopular()}>Popular</div>
            
        </div>

        <div className={styles.content}>
            <div className={styles.posts}>{
                posts
                ? posts.map((post) => <BlogListItem key={post._id}
                    title={post.title} 
                    name={post.user.name} 
                    id={post._id} 
                    userId={post.user._id}
                    views={post.views}
                    createdAt={post.createdAt}
                    comments={post.comments}
                    img={post.imgUrl ? `http://localhost:5000` + post.imgUrl : null}
                    tags={post.tags}
                    urlTag={tag}
                    getByTag={getByTag}
                    colorUser={post.user.color}
                    />)
                : null
            }</div>
            <div className={styles.tags}>
            <div className={styles.tagH2}>Tags</div>
            {tags 
            ? tags.map((tagItem) => <div className={styles.tag} onClick={() => getByTag(tagItem)}>#{tagItem}</div>)
            : null}
            {tags.length > 9 && <button className={styles.more} onClick={() => setCount(count + 10)}>More</button>}
            </div>
        </div>
    </div>
    )

}


export default BlogList