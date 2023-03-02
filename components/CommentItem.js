import { CgProfile } from 'react-icons/cg'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

import Link from 'next/link'
import styles from '../styles/post.module.css'

const CommentItem = ({comment, removeComment, middlewareChangeComment, user}) => {
    return ( 
    <div className={styles.commentItem} key={comment._id}>
        <div className={styles.commentPerson}>
            <Link href={`/user/${comment?.user._id}`}><CgProfile className={styles.personComment} style={{color: `${comment.user.color}`}}/></Link>  
            <Link className={styles.commentName} href={`/user/${comment?.user._id}`}>{comment?.user.name}</Link> 
        </div>

        <div className={styles.commentText}>{comment.text}</div> 

        {
        user && user._id === comment.user._id 
        ?<div>
            <RiDeleteBin6Line className={styles.delete} onClick={() => removeComment(comment._id)}/> 
            <RiEdit2Line className={styles.edit} onClick={() => {middlewareChangeComment(comment._id, comment.text)}}/> 
        </div>
        : null
        }

    </div>
     );
}
 
export default CommentItem;