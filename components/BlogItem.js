import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import styles from '../styles/blog.module.css'


const BlogItem = ({id, name, title, userId, views, comments, img, tags, getByTag, colorUser}) => {
    return ( 
    <div className={styles.postItem}>
        {img
        ? <Link href={`/posts/${id}`}><img className={styles.img} src={img}/></Link> 
        :null
        }
        <div className={styles.info}>
            <div><CgProfile className={styles.person} style={{color: `${colorUser}`}}/></div>
            <div>
                <Link className={styles.name} href={`/user/${userId}`}>{name}</Link>
                <Link className={styles.title} href={`/posts/${id}`}>{title}</Link>
                {tags
                 ? tags.map((tag, i) => i<8 ? <p className={styles.tagItem} key={i} onClick={() => getByTag(tag)}>#{tag}</p> : null)
                 : null
                }
                <div className={styles.icons}>
                    <div className={styles.iconItem}><AiOutlineEye /> {views}</div> 
                    <div className={styles.iconItem}><BiComment /> {comments?.length}</div>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default BlogItem;