import axios from '../../../components/axios'
import styles from '../../../styles/post.module.css'
import '../../../types'
import * as React from 'react';
import { IPost, IComment} from '../../../Interface/IPost'

import { useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hook'
import { NextRouter, useRouter } from 'next/router'

import { CgProfile } from 'react-icons/cg'

import { deletePost } from '../../../redux/posts'
import { createComment, deleteComment, editComment } from '../../../redux/comments'

import PostBtns from '../../../components/PostBtns'
import CommentItem from '../../../components/CommentItem'
import PostInfo from '../../../components/PostInfo'
import { GetServerSideProps } from 'next/types';

interface IComponent{
    post: IPost,
    comments: IComment[]
}

const Post: React.FC<IComponent> = ({post, comments}) => {
    const dispatch = useAppDispatch()
    const router: NextRouter = useRouter()
    const textInput = useRef<any>(null)
    const {user} = useAppSelector(state => state.userSlice)
    const [postId, setPostId] = useState<string>('')
    const [commentText, setCommentText] = useState<string>('')
    const [change, setChange] = useState<boolean>(false)
    const [idChange, setIdChange] = useState<string>('')
    
    useEffect(() => {
        setPostId(router.query.id as string)
    }, [])

    const removePost = async (): Promise<void> => {
        const res = await dispatch(deletePost(postId))
        if(res.payload?.success)router.push(`/`)
    }

    const addComment = async (): Promise<void> => {
        const res = await dispatch(createComment({postId, commentText}))
        if(res.payload?.success)router.push(`/posts/${postId}`)
        setCommentText('')
    }

    const middlewareChangeComment = (id: string, text: string): void => {
        setChange(true)
        setIdChange(id)
        setCommentText(text)
        if(textInput.current){
            textInput?.current.focus()
            textInput?.current.scrollIntoView()
        }
    }

    const changeComment = async (): Promise<void> => {
        //without await not work 'if'
        const res = await dispatch(editComment({idChange, commentText}))
        if(res.payload?.success)afterChange()
    }

    const afterChange = (): void => {
        setChange(false)
        setIdChange('')
        setCommentText('')
        router.push(`/posts/${postId}`)
    }

    const removeComment = async (commentId: string): Promise<void> => {
        //without await not work 'if'
        const res = await dispatch(deleteComment({postId, commentId}))
        if(res.payload?.success)router.push(`/posts/${postId}`)
    }

    const cancel = (): void => {
        setChange(false)
        setIdChange('')
        setCommentText('')
    }

    const getByTag = (tag: string): Promise<boolean> => router.push(`/?tag=${tag}`)
    const back = (): Promise<boolean> => router.push(`/`)
    const redirectToEdit = (): Promise<boolean> => router.push(`/posts/${postId}/edit`)

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
                redirectToEdit={redirectToEdit}
                />
            </div>
        </div>
        <div className={styles.comments}>
            <div className={styles.block}>Comments</div>
            <div className={styles.commentAdd}>
                <CgProfile className={styles.person}/>
                <input className={styles.Input}   ref={textInput} value={commentText} type={'text'} placeholder='Enter comment...' onChange={(e) => setCommentText(e.target.value)}/>
            </div> 
    
            <PostBtns 
            commentText={commentText} 
            change={change} 
            addComment={addComment} 
            cancel={cancel} 
            changeComment={changeComment} 
            />
    
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

export const getServerSideProps:GetServerSideProps = async ({query}) => {
    const post = await axios.get(`/posts/${query.id}`)
    const comments = await axios.get(`/comments/${query.id}`)
    return {
      props: {
        post: post.data.post,
        comments: comments.data.list
      }
    }
  }