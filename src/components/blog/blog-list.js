import { useEffect } from 'react'
import BlogListItem from './blog-list-item'
import {useDispatch, useSelector} from 'react-redux'

import styles from './blog.module.css'
import { getAllPosts } from '../../redux/postSlice'

const BlogList = () => {
    const dispatch = useDispatch()

    const {posts} = useSelector(state => state.postSlice)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    console.log(posts)

    return(
    <div className={styles.container}>
        <div className={styles.category}>
            <div className={styles.categoryItem}>New</div>
            <div className={styles.categoryItem}>Popular</div>
        </div>

        <div className={styles.content}>
        <div className={styles.posts}>{
            posts
            ? posts.map((post) => <BlogListItem 
                title={post.title} 
                name={post.user.name} 
                id={post._id} 
                userId={post.user._id}
                views={post.views}
                createdAt={post.createdAt}
                comments={post.comments}
                img={post.imgUrl ? `http://localhost:5000` + post.imgUrl : null}
                />)
            : null
        }</div>
            <div className={styles.tags}>tags</div>
        </div>
    </div>
    )

}


export default BlogList