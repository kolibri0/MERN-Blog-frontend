import styles from '../styles/post.module.css'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'bootstrap/dist/css/bootstrap.min.css';

import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

import Link from 'next/link'

const PostInfo = ({post, getByTag, back, removePost, user}) => {
    return ( 
    <>
    <div><CgProfile className={styles.person} style={{color: `${post.user.color}`}}/></div>
    <div>
        <Link className={styles.name} href={`/user/${post.user._id}`}>{post?.user.name}</Link>
        <div className={styles.title}>{post.title}</div>
        {
        post?.tags !== undefined && post.tags.length
          ? post.tags.map((tag) => <p className={styles.tagItem} onClick={() => getByTag(tag)}>#{tag}</p>)
          : null
        }
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.text}</ReactMarkdown>
        <div className={styles.icons}>
            <div className={styles.iconItem}><AiOutlineEye /> {post.views}</div> 
            <div className={styles.iconItem}><BiComment /> {post.comments.length}</div>
        </div>
        <button className={styles.back} onClick={() => back()}>Back</button>
        {
        user && user._id === post.user._id
        ?<>
            <RiDeleteBin6Line  className={styles.deletePost} onClick={() => removePost()}/>
            <RiEdit2Line className={styles.changePost} onClick={() => router.push(`/posts/${postId}/edit`)}/>
        </>
        :null}
    </div>
    </>
     );
}
 
export default PostInfo;