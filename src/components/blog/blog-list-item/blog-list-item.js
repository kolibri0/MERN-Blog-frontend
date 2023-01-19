import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import {Link, } from 'react-router-dom'

import styles from '../blog.module.css'
import { useDispatch } from 'react-redux'
import { getPostsByTags } from '../../../redux/postSlice'

const BlogListItem = ({id, name, createdAt, title, userId, views, comments, img, tags}) => {
    const dispatch = useDispatch()

    const getByTag = (tag) => {
        dispatch(getPostsByTags(tag))
    }

    return(<div className={styles.postItem}>
            {img
            ? <Link to={`${id}`}><img className={styles.img} width={750} height={300} src={img}/></Link> 
            :null
            }
            <div className={styles.info}>
                <div><CgProfile className={styles.person}/></div>
                <div>
                    <p className={styles.name}>{name}</p>
                    <Link className={styles.title} to={`${id}`}>{title}</Link>
                    {tags
                     ? tags.map((tag, i) => i<8 ? <p className={styles.tagItem} onClick={() => getByTag(tag)}>#{tag}</p> : null)
                     : null
                    }
                    {/* <p className={styles.tagItem}>#tag</p>
                    <p className={styles.tagItem}>#tag</p>
                    <p className={styles.tagItem}>#tag</p> */}
                    <div className={styles.icons}>
                        <div className={styles.iconItem}><AiOutlineEye /> {views}</div> 
                        <div className={styles.iconItem}><BiComment /> {comments?.length}</div>
                    </div>
                </div>
            </div>
    </div>)
}

export default BlogListItem