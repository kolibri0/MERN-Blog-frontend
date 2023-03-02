import axios from '../../../components/axios'
import styles from '../../../styles/post.module.css'

import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { CgProfile } from 'react-icons/cg'

import { deletePost } from '../../../redux/posts'
import { createComment, deleteComment, editComment } from '../../../redux/comments'

import PostBtns from '../../../components/PostBtns'
import CommentItem from '../../../components/CommentItem'
import PostInfo from '../../../components/PostInfo'

const Post = ({post, comments}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const textInput = useRef(null)
    const {user} = useSelector(state => state.userSlice)
    const [postId, setPostId] = useState('')
    const [commentText, setCommentText] = useState('')
    const [change, setChange] = useState(false)
    const [idChange, setIdChange] = useState(null)
    
    useEffect(() => {
        setPostId(router.query.id)
    }, [])

    const removePost = async () => {
        const res = await dispatch(deletePost(postId))
        if(res.payload?.success)router.push(`/`)
    }

    const addComment = async () => {
        const res = await dispatch(createComment({postId, commentText}))
        if(res.payload?.success)router.push(`/posts/${postId}`)
        setCommentText('')
    }

    const middlewareChangeComment = (id, text) => {
        setChange(true)
        setIdChange(id)
        setCommentText(text)
        if(textInput.current){
            textInput?.current.focus()
            textInput?.current.scrollIntoView()
        }
    }

    const changeComment = async () => {
        //without await not work 'if'
        const res = await dispatch(editComment({idChange, commentText}))
        if(res.payload?.success)afterChange()
    }

    const afterChange = () => {
        setChange(false)
        setIdChange(null)
        setCommentText('')
        router.push(`/posts/${postId}`)
    }

    const removeComment = async (commentId) => {
        //without await not work 'if'
        const res = await dispatch(deleteComment({postId, commentId}))
        if(res.payload?.success)router.push(`/posts/${postId}`)
    }

    const cancel = () => {
        setChange(false)
        setIdChange(null)
        setCommentText('')
    }

    const getByTag = (tag) => router.push(`/?tag=${tag}`)
    const back = () => router.push(`/`)

    return(<>{post
        ?<><div className={styles.post}>
            {post.imgUrl
            ?<img className={styles.img}  src={process.env.NEXT_PUBLIC_URL_REQUEST + post.imgUrl} alt={'Post'}/> 
            :null
            }
            <div className={styles.info}>
                <PostInfo 
                user={user}
                removePost={removePost}
                getByTag={getByTag}
                post={post}
                back={back}
                />
            </div>
        </div>
        <div className={styles.comments}>
            <div className={styles.block}>Comments</div>
            <div className={styles.commentAdd}>
                <CgProfile className={styles.person}/>
                <input className={styles.Input}   ref={textInput} value={commentText} type={'text'} placeholder='Enter comment...' onChange={(e) => setCommentText(e.target.value)}/>
            </div> 
    
            <PostBtns commentText={commentText} change={change} addComment={addComment} cancel={cancel} changeComment={changeComment} />
    
            {post && comments.length 
            ? comments.map((comment) => 
            <CommentItem 
            comment={comment}
            removeComment={removeComment}
            middlewareChangeComment={middlewareChangeComment}
            user={user}
            />)
            :null
            }
        </div>
        </>
        :null
        }
        </>)
}
export default Post;

export async function getServerSideProps({query}) {
    const post = await axios.get(`/posts/${query.id}`)
    const comments = await axios.get(`/comments/${query.id}`)
    return {
      props: {
        post: post.data.post,
        comments: comments.data.list
      }
    }
  }