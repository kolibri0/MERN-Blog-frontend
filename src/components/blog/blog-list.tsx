import { useEffect, useState } from 'react'
import BlogListItem from './blog-list-item'
import { getNewPosts, getPopularPosts, getPostsByTags, getTags } from '../../redux/postSlice'

import Alert from 'react-bootstrap/Alert';

import { getAllPosts } from '../../redux/postSlice'
import { useNavigate, useParams, Link} from 'react-router-dom'

import styles from './blog.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

const BlogList: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {tag} = useParams()
    const {posts, tags, error} = useAppSelector(state => state.postSlice)
    const [count, setCount] = useState<number>(10)

    useEffect(() => {
        dispatch(getTags(count))
        if(!tag) dispatch(getAllPosts())
        if(tag) dispatch(getPostsByTags(tag))
    }, [tag, count])

    const getByTag = (tag: string) => {
        navigate(`/posts/tag/${tag}`)
    }

    const getNew = () => {
        dispatch(getNewPosts())
    }

    const getPopular = () => {
        dispatch(getPopularPosts())
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
                    comments={post.comments}
                    img={post.imgUrl ? process.env.REACT_APP_URL_REQUEST_IMG + post.imgUrl : null}
                    tags={post.tags}
                    getByTag={getByTag}
                    colorUser={post.user.color}
                    />)
                : null
            }</div>
            <div className={styles.tags}>
            <div className={styles.tagH2}>Tags</div>
            {tags 
            ? tags.map((tagItem: string) => <div className={styles.tag} onClick={() => getByTag(tagItem)}>#{tagItem}</div>)
            : null}
            {tags.length > 9 && <button className={styles.more} onClick={() => setCount(count + 10)}>More</button>}
            </div>
        </div>
    </div>
    )


}


export default BlogList