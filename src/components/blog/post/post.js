import axios from "../../../axios"
import React from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByTags} from '../../../redux/postSlice'

import { CgProfile } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import {RiEdit2Line, RiDeleteBin6Line} from 'react-icons/ri'

import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import styles from './post.module.css'


const Post = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const textInput = React.useRef(null)
    const {user} = useSelector(state => state.userSlice)

    const [post, setPost] = React.useState(null)
    const [comments, setComments] = React.useState([])
    const [commentText, setCommentText] = React.useState('')
    const [change, setChange] = React.useState(false)
    const [idChange, setIdChange] = React.useState(null)
    

    React.useEffect(() => {
        try {
            const fetchPost = async () => {
                const post = await axios.get(`http://localhost:5000/posts/${id}`)
                setPost(post.data.post)
            }
            fetchPost()
            getAllComments()
        } catch (err) {
           
        }
    }, [])

    const getAllComments = async () => {
        const comments = await axios.get(`http://localhost:5000/comments/${id}`)
        setComments(comments.data.list.reverse())
    }

    const createComment = async () => {
        const {data} = await axios.post(`http://localhost:5000/comments/${id}`, {text: commentText})
        if(data.success){
            getAllComments()
            setCommentText('')
        }
    }

    const removeComment = async (commentId) =>{
        const {data} = await axios.delete(`http://localhost:5000/posts/${id}/comments/${commentId}`)
        if(data.success){
            getAllComments()
        }
    }

    const changeComment = async () =>{
         const {data} = await axios.patch(`http://localhost:5000/comments/${idChange}`, {text: commentText})
         if(data.success){
            getAllComments()
            setChange(false)
            setIdChange(null)
            setCommentText('')
        }
    }

    const deletePost = async () => {
        const {data} = await axios.delete(`http://localhost:5000/posts/${id}`)
        if(data.success){
            navigate('/')
        }
    }

    const getByTag = (tag) => {
       navigate(`/posts/tag/${tag}`)

        dispatch(getPostsByTags(tag))
    }

    const ChangePost = async () => {
       navigate(`/posts/${id}/edit`)
    }

    const cancel = () => {
        setChange(false)
        setIdChange(null)
        setCommentText('')
    }

    return(
    <>{post
    ?<><div className={styles.post}>
            {post.imgUrl
            ?<img className={styles.img} width={900} height={400} src={`http://localhost:5000` + post.imgUrl} alt={'Post'}/> 
            :null
            }
            <div className={styles.info}>
                <div><CgProfile className={styles.person} style={{color: `${post.user.color}`}}/></div>
                <div>
                    <Link className={styles.name} to={`/user/${post.user._id}`}>{post?.user.name}</Link>
                    <div className={styles.title}>{post.title}</div>
                    {post.tags.length 
                    ? post.tags.map((tag) => <p className={styles.tagItem} onClick={() => getByTag(tag)}>#{tag}</p>)
                    : null}
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.text}</ReactMarkdown>
                    <div className={styles.icons}>
                        <div className={styles.iconItem}><AiOutlineEye /> {post.views}</div> 
                        <div className={styles.iconItem}><BiComment /> {post.comments.length}</div>
                    </div>
                    <button className={styles.back} onClick={() => navigate('/posts')}>Back</button>
                    {user._id === post.user._id
                    ?<>
                        <RiDeleteBin6Line  className={styles.deletePost} onClick={() => deletePost()}/>
                        <RiEdit2Line className={styles.changePost} onClick={() => ChangePost()}/>
                    </>
                    :null}
                </div>
            </div>
    </div>
    <div className={styles.comments}>
        <div className={styles.block}>Comments</div>
        <div className={styles.commentAdd}>
            <CgProfile className={styles.person}/>
            <input className={styles.input} ref={textInput} value={commentText} type={'text'} placeholder='Enter comment...' onChange={(e) => setCommentText(e.target.value)} />
        </div> 

        {commentText.length && !change
        ? <button className={styles.btn} onClick={() => createComment()}>Submit</button>
        : null}

        {commentText.length && change
        ? <div className={styles.changeBtns}>
            <button className={styles.cancel} onClick={() => cancel()}>Cancel</button>
            <button className={styles.btn} onClick={() => changeComment()}>Change</button>
          </div>
        : null}

        {post && comments.length 
        ? comments.map((comment) => (
            <div className={styles.commentItem} key={comment._id}>
                <div className={styles.commentPerson}>
                    <Link to={`/user/${comment?.user._id}`}><CgProfile className={styles.personComment}/></Link>  
                    <Link className={styles.commentName} to={`/user/${comment?.user._id}`}>{comment?.user.name}</Link> 
                </div>
                <div className={styles.commentText}>{comment.text}</div> 

            {user._id === comment.user._id 
            ?<div>
                <RiDeleteBin6Line className={styles.delete} onClick={() => removeComment(comment._id)}/> 
                <RiEdit2Line className={styles.edit} onClick={() => {
                    setChange(true)
                    setIdChange(comment._id)
                    setCommentText(comment.text)
                    textInput.current.focus()
                    textInput.current.scrollIntoView()
                    }}/> 
            </div>
            : null
            }

            </div>
        ))
        :null 
        }
    </div>
    </>
    :null
    }
    </>
    )
}

export default Post